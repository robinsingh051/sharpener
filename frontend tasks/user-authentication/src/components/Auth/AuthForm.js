import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";
import axios from "axios";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      //Login mode
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASAdMwMq2qQod7nc2Z4fjIpYQm1dAzq0g`,
          {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }
        );
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      //Signup mode
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASAdMwMq2qQod7nc2Z4fjIpYQm1dAzq0g`,
          {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }
        );
        setIsLoading(false);
      } catch (err) {
        // console.log(err.response.data.error.code);
        // console.log(err.response.data.error.message);
        let errorMessage = "Authentication failed";
        if (err.response.data.error && err.response.data.error.message)
          errorMessage = err.response.data.error.message;
        alert(errorMessage);
        setIsLoading(false);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button type="submit">
              {isLogin ? "Log In" : "Create Account"}
            </button>
          )}
          {isLoading && <p>Sending Request</p>}
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
