import styles from "@/styles/style.module.scss";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "@/redux/actions/auth";
import { CLEAR_ERROR } from "@/redux/types/type";
import Link from "next/link";
import router from "next/router";
import { getSession } from "next-auth/client";

export default function Register() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const emailRef = useRef();
  const dispatch = useDispatch();
  const {
    error,
    loading,
    register: registerState,
  } = useSelector((state) => state.register);
  const {
    register,
    register__container,
    register__wrapper,
    register__logo,
    register__loginButton,
    register__input,
    register__registerButton,
    register__form,
    register__top,
  } = styles;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
    if (registerState) {
      router.push("/client/login");
    }
  }, [error, registerState]);
  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const emailSet = () => {
    setEmail(emailRef.current.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const registerData = {
      email,
      ...user,
    };
    console.log(registerData);
    dispatch(registration(registerData));
  };
  return (
    <div className={register}>
      <div className={register__top}>
        <div className={register__wrapper}>
          <img
            className={register__logo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link href="/client/login">
            <button className={register__loginButton}>Sign In</button>
          </Link>
        </div>
      </div>
      <div className={register__container}>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className={register__input}>
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className={register__registerButton} onClick={emailSet}>
              Get Started
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmitHandler} className={`${register__form}`}>
            <div className={register__input}>
              <input
                type="name"
                placeholder="name"
                name="name"
                value={user.name}
                onChange={onChangeHandler}
              />
            </div>

            <div className={register__input}>
              <input
                type="password"
                placeholder="password"
                name="password"
                value={user.password}
                onChange={onChangeHandler}
              />
            </div>
            <button className={register__registerButton} type="submit">
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
