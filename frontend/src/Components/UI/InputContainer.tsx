import props from "../../Interfaces/Props";
import classes from "./InputContainer.module.css";
import Input from "./Input";
const InputContainer: React.FC<props> = (props) => {
  return (
    <div className={classes.inputContainer}>
      <label htmlFor="">{props.title}: </label>
      <Input
        value={props.inputValues?.inputValue}
        onChange={props.inputValues?.inputChange}
        onFocus={props.inputValues?.inputFocus}
        onClassName={props.inputValues?.inputOnClassName}
        type="text"
      />
    </div>
  );
};

export default InputContainer;
