import InputContainer from "../../../UI/InputContainer";
import useUserInput from "../../../../customHooks/useUserInput";
import props from "../../../../Interfaces/Props";
import useApi from "../../../../customHooks/useApi";
import Button from "../../../UI/Button";
import Card from "../../../UI/Card";
const ForgotPassword: React.FC<props> = (props) => {
  const {
    valueInput: emailInput,
    inValid: emailInvalid,
    isValid: emailIsValid,
    onChange: emailChange,
    onFocus: emailFocus,
    reset: emailReset,
  } = useUserInput((value) => {
    if (typeof value === "string") {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
      }
      return false;
    } else {
      return value > 0;
    }
  });

  const apiHook = useApi("/forgot-password", {
    method: "POST",
    body: {
      email: emailInput,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  const formIsValid = emailIsValid;
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    apiHook();
    if (!formIsValid) {
      return;
    }
  }

  const emailClasses = emailInvalid ? true : false;
  return (
    <Card>
      <h1>Write your email to send message!</h1>
      <form onSubmit={submitHandler}>
        <InputContainer
          title="Email"
          inputValues={{
            inputValue: emailInput,
            inputChange: emailChange,
            inputFocus: emailFocus,
            type: "submit",
            inputOnClassName: emailClasses,
          }}
        />
        <Button>Send now!</Button>
      </form>
    </Card>
  );
};

export default ForgotPassword;
