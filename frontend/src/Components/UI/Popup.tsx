import React, { useEffect, useState } from "react";
import props from "../../Interfaces/Props";
import classes from "./Popup.module.css";
import { createPortal } from "react-dom";

const Popup: React.FC<props> = (props) => {
  const [style, setStyle] = useState(
    `${props.classAdd} ${classes.appear} ${classes.modal}`
  );

  useEffect(() => {
    setTimeout(() => {
      setStyle(`${classes.disappear} ${classes.modal} ${props.classAdd}`);
    }, 4000);
  }, [style]);

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
