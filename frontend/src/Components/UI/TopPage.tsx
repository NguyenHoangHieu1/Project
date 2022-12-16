import props from "../../Interfaces/Props";
import classes from "./TopPage.module.css";

const TopPage: React.FC<props> = (props) => {
  const scrollUpHandler = () => {
    document.documentElement.scrollTop = 0;
  };
  return (
    <div onClick={scrollUpHandler} className={classes.goUp}>
      <i className="fa-solid fa-up-long"></i>
    </div>
  );
};

export default TopPage;
