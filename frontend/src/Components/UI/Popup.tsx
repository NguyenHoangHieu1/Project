import React, { useEffect, useState } from "react";
import props from "../../Interfaces/Props";
import classes from "./Popup.module.css";
import { createPortal } from "react-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { uiActions } from "../../store/ui";
const Popup: React.FC<props> = (props) => {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((state) => state.ui);
  // const [style, setStyle] = useState(`${props.classAdd}  ${classes.modal}`);
  const style = `${props.classAdd}  ${classes.modal}`;

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
