import props from "../../../../Interfaces/Props";
import Button from "../../../UI/Button";
import Card from "../../../UI/Card";
import InputContainer from "../../../UI/InputContainer";
import classes from "./Auth.module.css";
import useUserInput from "../../../../customHooks/useUserInput";
import React, { useState, useEffect, ReactNode } from "react";
import ModalBackdrop from "../../../UI/ModalBackdrop";
import useApi from "../../../../customHooks/useApi";
import { useAppDispatch } from "../../../../store";
import { authActions } from "../../../../store/auth";
const Signup: React.FC<props> = (props) => {
  const dispatch = useAppDispatch();
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
      return value.length > 5;
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
      return value.length > 5;
    } else {
      return value > 0;
    }
  });
  const apiHook = useApi("/signup", {
    method: "POST",
    body: {
      email: emailInput,
      username: usernameInput,
      password: passwordInput,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  const formIsValid = usernameIsValid && passwordIsValid && emailIsValid;

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    console.log(formIsValid);
    if (!formIsValid) {
      return;
    }
    console.log("TRUE");

    dispatch(
      authActions.signup({
        account: { username: usernameInput, password: passwordInput },
      })
    );
    apiHook();
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
