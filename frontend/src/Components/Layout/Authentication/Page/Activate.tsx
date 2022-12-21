import props from "../../../../Interfaces/Props";
import InputContainer from "../../../UI/InputContainer";
import classes from "./Activate.module.css";
import useUserInput from "../../../../customHooks/useUserInput";
import Button from "../../../UI/Button";
import { FormEvent, useEffect } from "react";
import useApi from "../../../../customHooks/useApi";
import { Response } from "../../../../Interfaces/Response";
import { Redirect, useHistory, useParams } from "react-router";
import { useState } from "react";
import { Params } from "../../../../Interfaces/Params";
const Activate: React.FC<props> = (props) => {
  const [RedirectLink, setRedirectLink] = useState(false);
  const userId = useParams<Params>().userId;
  const apiCheckAcccount = useApi("/check-account", {
    method: "POST",
    body: { userId: userId },
    headers: {
      "Content-Type": "application/json",
    },
    useData(data) {
      console.log(data);
      return data;
    },
  });
  useEffect(() => {
    apiCheckAcccount()
      .then((data) => {
        console.log(data);
        if ((data && !data.userId) || !data) {
          setRedirectLink(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const {
    valueInput: passCodeInput,
    inValid: passCodeInvalid,
    isValid: passCodeIsValid,
    onChange: passCodeChange,
    onFocus: passCodeFocus,
    reset: passCodeReset,
  } = useUserInput((data) => {
    if (typeof data === "string" && data.length === 4) {
      return true;
    } else {
      return false;
    }
  });
  const apiHook = useApi("/activate", {
    method: "POST",
    body: { passCode: passCodeInput },
    headers: {
      "Content-Type": "application/json",
    },
    useData(data) {
      return data;
    },
  });
  const passCodeClassName = passCodeInvalid ? true : false;
  const formIsValid = passCodeIsValid;
  function submitHandler(e: FormEvent) {
    e.preventDefault();
    apiHook().then((data: Response | void) => {
      if (!formIsValid || data === undefined) {
        return;
      } else {
        setRedirectLink(true);
      }
    });
  }
  return (
    <>
      {RedirectLink ? (
        <Redirect to="/" />
      ) : (
        <form onSubmit={submitHandler}>
          <InputContainer
            title="Pass Code"
            inputValues={{
              inputValue: passCodeInput,
              inputChange: passCodeChange,
              inputFocus: passCodeFocus,
              inputOnClassName: passCodeClassName,
              type: "submit",
            }}
          />
          <Button>Activate!</Button>
        </form>
      )}
    </>
  );
};

export default Activate;
