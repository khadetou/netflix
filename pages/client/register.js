import styles from "@/styles/style.module.scss";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "@/redux/actions/auth";
import { CLEART_ERROR } from "@/redux/types/type";
import Link from "next/link";
import router from "next/router";

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
  } = styles;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEART_ERROR });
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
      <div className="top">
        <div className={register__wrapper}>
          <img
            className={register__logo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <button className={register__loginButton}>
            <Link href="/client/login">
              <a>Sign In</a>
            </Link>
          </button>
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
