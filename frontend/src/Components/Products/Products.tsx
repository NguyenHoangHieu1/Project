import props from "../../Interfaces/Props";
import classes from "./Products.module.css";
const Products: React.FC<props> = (props) => {
  return (
    <div className={classes.sellProducts}>
      <ul className={classes.listOfProducts}>{props.loadedProducts}</ul>
      <div className={classes.fixedButton}></div>
    </div>
  );
};

export default Products;
