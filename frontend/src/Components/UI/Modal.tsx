import props from "../../Interfaces/Props";
import classes from "./Modal.module.css";
const Modal: React.FC<props> = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

export default Modal;
