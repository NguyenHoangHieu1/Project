import props from "../../../../Interfaces/Props";
import Button from "../../../UI/Button";
import Card from "../../../UI/Card";
import InputContainer from "../../../UI/InputContainer";
import classes from "./Auth.module.css";
import useUserInput from "../../../../customHooks/useUserInput";
import React, { useState, useEffect, ReactNode } from "react";
import ModalBackdrop from "../../../UI/ModalBackdrop";

import { useAppDispatch } from "../../../../store";
import { authActions } from "../../../../store/auth";
const Signup: React.FC<props> = (props) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<number[]>([]);
  const [success, setSuccess] = useState<number[]>([]);
  const {
    valueInput: emailInput,
    inValid: emailInvalid,
    isValid: emailIsValid,
    onChange: emailChange,
    onFocus: emailFocus,
    reset: emailReset,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      return value.includes("@");
    } else {
      return value > 0;
    }
  });
  const {
    valueInput: usernameInput,
    inValid: usernameInvalid,
    isValid: usernameIsValid,
    onChange: usernameChange,
    onFocus: usernameFocus,
    reset: usernameReset,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      return value.includes("@");
    } else {
      return value > 0;
    }
  });
  const {
    valueInput: passwordInput,
    inValid: passwordInvalid,
    isValid: passwordIsValid,
    onChange: passwordChange,
    onFocus: passwordFocus,
    reset: passwordReset,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      return value.includes("@");
    } else {
      return value > 0;
    }
  });

  useEffect(() => {
    let time: null | NodeJS.Timeout;
    if (error.length > 0 || success.length > 0) {
      time = setTimeout(() => {
        setError([]);
        setSuccess([]);
      }, 5000);
    }
    return () => {
      if (time != null) {
        clearTimeout(time);
      }
    };
  }, [error, success]);
  const formIsValid = usernameIsValid && passwordIsValid && emailIsValid;

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!formIsValid) {
      setError([1]);
      setSuccess([]);
      return;
    }
    setSuccess([1]);
    setError([]);
    dispatch(
      authActions.signup({
        account: { username: usernameInput, password: passwordInput },
      })
    );
    props.onHideAuth!(false);
  }

  function buttonHandler() {
    if (!formIsValid) {
      return;
    }
    // props.onHideAuth!(false);
  }
  const emailClassName = emailInvalid ? true : false;
  const usernameClassName = usernameInvalid ? true : false;
  const passwordClassName = passwordInvalid ? true : false;
  return (
    <section className={classes.login}>
      <ModalBackdrop onHideAuth={props.onHideAuth?.bind(null, false)}>
        <header className={classes.titleAuth}> Signup </header>
        <form onSubmit={submitHandler} className={classes.formAuth}>
          <InputContainer
            title="email"
            inputValues={{
              inputValue: emailInput,
              inputChange: emailChange,
              inputFocus: emailFocus,
              inputOnClassName: emailClassName,
              type: "submit",
            }}
          />
          <InputContainer
            title="username"
            inputValues={{
              inputValue: usernameInput,
              inputChange: usernameChange,
              inputFocus: usernameFocus,
              inputOnClassName: usernameClassName,
              type: "submit",
            }}
          />
          <InputContainer
            title="Password"
            inputValues={{
              inputValue: passwordInput,
              inputChange: passwordChange,
              inputFocus: passwordFocus,
              inputOnClassName: passwordClassName,
              type: "submit",
            }}
          />
          <Button onClick={buttonHandler}>Signup</Button>
        </form>
      </ModalBackdrop>
    </section>
  );
};
export default Signup;
