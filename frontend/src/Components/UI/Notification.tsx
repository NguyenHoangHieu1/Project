import props from "../../Interfaces/Props";
import Popup from "./Popup";
import classes from "./Notification.module.css";
import { useEffect, useState } from "react";

const Notification: React.FC<props> = (props) => {
  const [style, setStyle] = useState("");
  useEffect(() => {
    if (props.status === "success") {
      setStyle(classes.success);
    } else if (props.status === "loading") {
      setStyle(classes.loading);
    } else {
      setStyle(classes.error);
    }
  }, []);

  return <Popup classAdd={`${style}`}>{props.children}</Popup>;
};

export default Notification;
