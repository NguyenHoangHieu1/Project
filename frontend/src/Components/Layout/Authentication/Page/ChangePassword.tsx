import props from "../../../../Interfaces/Props";
import Card from "../../../UI/Card";
import InputContainer from "../../../UI/InputContainer";
import useUserInput from "../../../../customHooks/useUserInput";
import { FormEvent, useEffect } from "react";
import useApi from "../../../../customHooks/useApi";
import Button from "../../../UI/Button";
import { useParams, useHistory } from "react-router";
import { Params } from "../../../../Interfaces/Params";

const ChangePassword: React.FC<props> = (props) => {
  const token = useParams<Params>().token;
  const history = useHistory();
  const apiCheckAcccount = useApi();
  useEffect(() => {
    apiCheckAcccount("/check-account", {
      method: "POST",
      body: {
        token: token,
      },
      headers: {
        "Content-Type": "application/json",
      },
      useData(data) {
        return data;
      },
    }).then((data) => {
      if (!data || (data && !data.userId)) {
        history.replace("/");
      }
    });
  }, []);

  const {
    valueInput: passwordInput,
    inValid: passwordInvalid,
    isValid: passwordIsValid,
    onChange: passwordChange,
    onFocus: passwordFocus,
    reset: passwordReset,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      if (
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(value)
      ) {
        return true;
      }
      return false;
    } else {
      return value > 0;
    }
  });
  const apiHook = useApi();
  function submitHandler(e: FormEvent) {
    e.preventDefault();
    apiHook("/change-password", {
      method: "POST",
      body: {
        password: passwordInput,
        token: token,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    history.replace("/");
  }
  const passwordClassName = passwordInvalid ? true : false;
  return (
    <Card>
      <form onSubmit={submitHandler}>
        <InputContainer
          title="new Password"
          inputValues={{
            inputValue: passwordInput,
            inputChange: passwordChange,
            inputFocus: passwordFocus,
            inputOnClassName: passwordClassName,
            type: "submit",
          }}
        />
        <Button>Change password</Button>
      </form>
    </Card>
  );
};

export default ChangePassword;
