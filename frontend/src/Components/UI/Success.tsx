import props from "../../Interfaces/Props";
import Popup from "./Popup";
import classes from "./Success.module.css";

const Success: React.FC<props> = (props) => {
  return <Popup classAdd={`${classes.success}`}>{props.children}</Popup>;
};

export default Success;
