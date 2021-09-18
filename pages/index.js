import Layout from "@/components/Layout";
import { getUser } from "@/redux/actions/users";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { CLEAR_ERROR } from "@/redux/types/type";
import { getSession } from "next-auth/client";

export default function Home() {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.Users);
  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [user]);
  return (
    <Layout>
      <div className="home">
        {/* <Featured type={type} setGenre={setGenre} /> */}
        {/* {lists.map((list) => (
          <List list={list} />
        ))} */}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/register/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
