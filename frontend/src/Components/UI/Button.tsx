import React, { ReactNode } from "react";
import classes from "./Button.module.css";
import props from "../../Interfaces/Props";
const Button: React.FC<props> = (props) => {
  const styles = {
    ...props.classAdd,
  };

  return (
    <button
      onClick={props.onClick ? props.onClick : () => {}}
      className={classes.button}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
