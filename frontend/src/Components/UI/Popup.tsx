import React, { useEffect, useState } from "react";
import props from "../../Interfaces/Props";
import classes from "./Popup.module.css";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { uiActions } from "../../store/ui";
const Popup: React.FC<props> = (props) => {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((state) => state.ui);
  const [style, setStyle] = useState(
    `${props.classAdd} ${classes.appear} ${classes.modal}`
  );
  const [counter, setCounter] = useState(0);
  console.log(style);
  useEffect(() => {
    if (counter === 0) {
      setTimeout(() => {
        setStyle(`${classes.disappear} ${classes.modal} ${props.classAdd}`);
        setCounter(counter + 1);
      }, 4000);
    } else {
      setTimeout(() => {
        dispatch(uiActions.closeMessage({}));
      }, 1000);
    }
  }, [style, counter]);

  return (
    <>
      {createPortal(
        <div className={style}>{props.children}</div>,
        document.getElementById("message")!
      )}
    </>
  );
};

export default Popup;
