import props from "../../Interfaces/Props";
import classes from "./Backdrop.module.css";
const Backdrop: React.FC<props> = (props) => {
  return <div onClick={props.onClick} className={classes.backdrop}></div>;
};

export default Backdrop;
