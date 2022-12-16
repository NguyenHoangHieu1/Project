import props from "../../Interfaces/Props";
import classes from "./ProductItem.module.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const ProductItem: React.FC<props> = (props) => {
  if (props.product != undefined) {
    return (
      <li className={classes.productItem} key={props.product._id}>
        <div className={classes.productImage}>
          <img src={props.product.imageUrl} alt="" />
        </div>
        <div className={classes.productInfo}>
          <h5>{props.product.title}</h5>
          <p>{props.product.description}</p>
        </div>
        <div className={classes.action}>
          <code>{props.product.price}$</code>
          <Link
            className={classes.details}
            to={`/products/${props.product._id}`}
          >
            Details
          </Link>
        </div>
      </li>
    );
  } else {
    return <></>;
  }
};

export default ProductItem;
