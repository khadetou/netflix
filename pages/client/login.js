import styles from "@/styles/style.module.scss";
import { useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Login() {
  const { login, login__container, login__logo, login__wrapper } = styles;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      router.push("/");
    }
  };
  return (
    <div className={login}>
      <div className="top">
        <div className={login__wrapper}>
          <img
            className={login__logo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className={login__container}>
        <form onSubmit={submitHandler}>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" type="submit">
            Sign In
          </button>
          <span>
            New to Netflix?{" "}
            <Link href="/client/register">
              <b style={{ cursor: "pointer" }}>Sign up now.</b>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
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
