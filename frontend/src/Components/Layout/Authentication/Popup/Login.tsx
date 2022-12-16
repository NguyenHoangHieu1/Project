import props from "../../../../Interfaces/Props";
import Button from "../../../UI/Button";
import Card from "../../../UI/Card";
import InputContainer from "../../../UI/InputContainer";
import classes from "./Auth.module.css";
import useUserInput from "../../../../customHooks/useUserInput";
import React, { useState, useEffect, ReactNode } from "react";
import ModalBackdrop from "../../../UI/ModalBackdrop";
import Error from "../../../UI/Error";
import Success from "../../../UI/Success";
import { authActions } from "../../../../store/auth";
import { useAppDispatch, useAppSelector } from "../../../../store";
const Login: React.FC<props> = (props) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.auth).account;
  const [error, setError] = useState<number[]>([]);
  const [success, setSuccess] = useState<number[]>([]);
  const {
    valueInput: usernameInput,
    inValid: usernameInvalid,
    isValid: usernameIsValid,
    onChange: usernameChange,
    onFocus: usernameFocus,
    reset: usernameReset,
  } = useUserInput((value) => {
    return value === account.password;
  });
  const {
    valueInput: passwordInput,
    inValid: passwordInvalid,
    isValid: passwordIsValid,
    onChange: passwordChange,
    onFocus: passwordFocus,
    reset: passwordReset,
  } = useUserInput((value) => {
    return value === account.password;
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
  const formIsValid = usernameIsValid && passwordIsValid;
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!formIsValid) {
      setError([1]);
      setSuccess([]);
      return;
    }
    setSuccess([1]);
    setError([]);
    usernameReset();
    passwordReset();
    dispatch(
      authActions.login({
        account: { username: usernameInput, password: passwordInput },
      })
    );
    props.onHideAuth!(true);
  }

  // function buttonHandler() {
  //   if (!formIsValid) {
  //     return;
  //   }
  //   props.onHideAuth!(true);
  // }
  const usernameClassName = usernameInvalid ? true : false;
  const passwordClassName = passwordInvalid ? true : false;
  return (
    <section className={classes.login}>
      {error.length > 0 && (
        <Error>Please enter your information to login!</Error>
      )}
      {success.length > 0 && <Success>Login successfully!</Success>}
      <ModalBackdrop onHideAuth={props.onHideAuth?.bind(null, true)}>
        <header className={classes.titleAuth}> Login </header>
        <form onSubmit={submitHandler} className={classes.formAuth}>
          <InputContainer
            title="Username"
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
          <Button>Login</Button>
        </form>
      </ModalBackdrop>
    </section>
  );
};
export default Login;
