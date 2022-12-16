import props from "../../Interfaces/Props";
import classes from "./Card.module.css";
const Card: React.FC<props> = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
