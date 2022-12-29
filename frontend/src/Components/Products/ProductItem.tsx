import props from "../../Interfaces/Props";
import classes from "./ProductItem.module.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import useApi from "../../customHooks/useApi";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const ProductItem: React.FC<props> = (props) => {
  const history = useHistory();
  const apiHook = useApi();
  if (props.product) {
    function onEditHandler() {
      if (props.product) {
        history.replace("/edit-product/" + props.product._id);
      }
    }
    function onDeleteHandler() {
      if (props.product && props.deleteProduct) {
        props.deleteProduct(props.product._id.toString());
      }
    }
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
          {props.editProduct ? (
            <>
              <Button onClick={onEditHandler}>Edit</Button>
              <Button onClick={onDeleteHandler}>Delete</Button>
            </>
          ) : (
            <Link
              className={classes.details}
              to={`/products/${props.product._id}`}
            >
              Details
            </Link>
          )}
        </div>
      </li>
    );
  } else {
    return <></>;
  }
};

export default ProductItem;
