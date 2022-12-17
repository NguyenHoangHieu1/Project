import { useState, useEffect } from "react";
import React from "react";
import Button from "../../UI/Button";
import classes from "./Form.module.css";
import useUserInput from "../../../customHooks/useUserInput";
import props from "../../../Interfaces/Props";

import InputContainer from "../../UI/InputContainer";

const Form: React.FC<props> = (props) => {
  const [error, setError] = useState<number[]>([]);
  const [success, setSuccess] = useState<number[]>([]);

  const {
    valueInput: nameInput,
    reset: nameReset,
    inValid: nameInvalid,
    onChange: nameChange,
    onFocus: nameFocus,
    isValid: nameIsValid,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      return value.length > 5;
    } else {
      return value > 0;
    }
  });
  const {
    valueInput: reasonInput,
    reset: reasonReset,
    inValid: reasonInvalid,
    onChange: reasonChange,
    onFocus: reasonFocus,
    isValid: reasonIsValid,
  } = useUserInput((value) => {
    return +value > 3;
  });
  const {
    valueInput: emailInput,
    reset: emailReset,
    inValid: emailInvalid,
    onChange: emailChange,
    onFocus: emailFocus,
    isValid: emailIsValid,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      return value.length > 5;
    } else {
      return value > 0;
    }
  });
  let formIsValid = nameIsValid && reasonIsValid && emailIsValid;
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
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!formIsValid) {
      console.log("Hello Error");
      setError([1]);
      setSuccess([]);
    } else {
      setError([]);
      setSuccess([1]);
      nameReset();
      reasonReset();
      emailReset();
    }
  }
  let nameClasses = nameInvalid ? true : false;
  let reasonClasses = reasonInvalid ? true : false;
  let emailClasses = emailInvalid ? true : false;

  return (
    <section className={classes.contact}>
      <div className={classes.title}>
        <h1>Contact Us!</h1>
      </div>
      <div className={classes.formInput}>
        <div>
          <h1>Three reasons why you should choose us:</h1>
          <ol type="1">
            <li>Because we are trustworthy</li>
            <li>We always sell food with low price</li>
            <li>All goods for low price</li>
          </ol>
        </div>
        <form onSubmit={submitHandler} className={classes.form}>
          <InputContainer
            title="Name :"
            inputValues={{
              inputValue: nameInput,
              inputChange: nameChange,
              inputFocus: nameFocus,
              inputOnClassName: nameClasses,
              type: "submit",
            }}
          ></InputContainer>

          <InputContainer
            title="Email :"
            inputValues={{
              inputValue: emailInput,
              inputChange: emailChange,
              inputFocus: emailFocus,
              type: "submit",
              inputOnClassName: emailClasses,
            }}
          ></InputContainer>
          <InputContainer
            title="Reasons :"
            inputValues={{
              inputValue: reasonInput,
              inputChange: reasonChange,
              inputFocus: reasonFocus,
              type: "submit",
              inputOnClassName: reasonClasses,
            }}
          ></InputContainer>
          <Button>Send!</Button>
        </form>
      </div>
    </section>
  );
};

export default Form;
