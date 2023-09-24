import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../store/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const collegeNameReducer = (state, action) => {
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const ctx = useContext(AuthContext);

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredCollegeName, setEnteredCollegeName] = useState("");
  // const [collegeIsValid, setCollegeIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [collegeNameState, dispatchCollegeName] = useReducer(
    collegeNameReducer,
    {
      value: "",
      isValid: null,
    }
  );

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("validating form");
      setFormIsValid(
        emailState.isValid &&
          collegeNameState.isValid &&
          passwordState.isValid > 0
      );
    }, 500);

    return () => {
      console.log("clean up");
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid, collegeNameState.isValid]);

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });

    // setFormIsValid(
    //   enteredEmail.includes("@") &&
    //     enteredPassword.trim().length > 6 &&
    //     enteredCollegeName.trim().length > 0
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });

    // setFormIsValid(
    //   enteredEmail.includes("@") &&
    //     enteredPassword.trim().length > 6 &&
    //     enteredCollegeName.trim().length > 0
    // );
  };

  const collegeNameChangeHandler = (event) => {
    // setEnteredCollegeName(event.target.value);
    dispatchCollegeName({ type: "USER_INPUT", value: event.target.value });

    // setFormIsValid(
    //   enteredEmail.includes("@") &&
    //     enteredPassword.trim().length > 6 &&
    //     enteredCollegeName.trim().length > 0
    // );
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const validateCollegeNameHandler = () => {
    dispatchCollegeName({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value, collegeNameState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-MAIL"
          type="email"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <Input
          id="college"
          label="College Name"
          type="text"
          isValid={collegeNameState.isValid}
          value={collegeNameState.value}
          onChange={collegeNameChangeHandler}
          onBlur={validateCollegeNameHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
