import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";
import axios from "axios";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);

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
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
          {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }
        );
        console.log(response.data.idToken);
        authCtx.login(response.data.idToken);
        history.replace("/");
      } catch (err) {
        let errorMessage = "Authentication failed";
        if (err.response.data.error && err.response.data.error.message)
          errorMessage = err.response.data.error.message;
        alert(errorMessage);
      } finally {
        setIsLoading(false);
      }
    } else {
      //Signup mode
      try {
        await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
          {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }
        );
      } catch (err) {
        // console.log(err.response.data.error.code);
        // console.log(err.response.data.error.message);
        let errorMessage = "Authentication failed";
        if (err.response.data.error && err.response.data.error.message)
          errorMessage = err.response.data.error.message;
        alert(errorMessage);
      } finally {
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
