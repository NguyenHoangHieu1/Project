import props from "../../Interfaces/Props";
import Popup from "./Popup";
import classes from "./Notification.module.css";
import { useEffect, useState } from "react";

const Notification: React.FC<props> = (props) => {
  let style;

  if (props.status === "success") {
    style = classes.success;
  } else if (props.status === "loading") {
    style = classes.loading;
  } else {
    style = classes.error;
  }

  return <Popup classAdd={`${style}`}>{props.children}</Popup>;
};

export default Notification;
