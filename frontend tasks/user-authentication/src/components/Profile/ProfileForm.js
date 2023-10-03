import classes from "./ProfileForm.module.css";
import { useHistory } from "react-router-dom";
import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef();

  const submitHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const enteredPassword = passwordInputRef.current.value;
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_API_KEY}`,
        {
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: true,
        }
      );
      console.log(response.data.idToken);
      history.replace("/");
    } catch (err) {
      let errorMessage = "Password Reset failed";
      if (err.response.data.error && err.response.data.error.message)
        errorMessage = err.response.data.error.message;
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        {!isLoading && <button>Change Password</button>}
        {isLoading && <p>Sending Request</p>}
      </div>
    </form>
  );
};

export default ProfileForm;
