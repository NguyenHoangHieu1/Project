import props from "../../../../Interfaces/Props";
import InputContainer from "../../../UI/InputContainer";
import useUserInput from "../../../../customHooks/useUserInput";
import Button from "../../../UI/Button";
import { FormEvent, useEffect } from "react";
import useApi from "../../../../customHooks/useApi";
import { Response } from "../../../../Interfaces/Response";
import { Redirect, useHistory, useParams } from "react-router";
import { useState } from "react";
import { Params } from "../../../../Interfaces/Params";
import Card from "../../../UI/Card";
const Activate: React.FC<props> = (props) => {
  const history = useHistory();
  const token = useParams<Params>().token;

  const apiCheckAcccount = useApi();
  useEffect(() => {
    apiCheckAcccount("/check-account", {
      method: "POST",
      body: { token: token },
      headers: {
        "Content-Type": "application/json",
      },
      useData(data) {
        return data;
      },
    })
      .then((data) => {
        if ((data && !data.userId) || !data) {
          history.replace("/");
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
    if (typeof data === "string" && data.length > 4) {
      return true;
    } else {
      return false;
    }
  });
  const apiHook = useApi();
  const passCodeClassName = passCodeInvalid ? true : false;
  const formIsValid = passCodeIsValid;
  function submitHandler(e: FormEvent) {
    e.preventDefault();
    apiHook("/activate", {
      method: "POST",
      body: { passCode: passCodeInput },
      headers: {
        "Content-Type": "application/json",
      },
      useData(data) {
        return data;
      },
    }).then((data: Response | void) => {
      if (!formIsValid || data === undefined) {
        return;
      }
    });
  }
  return (
    <Card>
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
    </Card>
  );
};

export default Activate;
