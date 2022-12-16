import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import classes from "./CartItem.module.css";
import { useAppDispatch } from "../../../store";
import { cartActions } from "../../../store/cart";

const CartItem: React.FC<props> = (props) => {
  const dispatch = useAppDispatch();
  function removeItemFromCartHandler() {
    dispatch(cartActions.removeItemFromCart({ _id: props.product?._id }));
  }
  let productItem;
  if (props.product) {
    productItem = (
      <li className={classes.product}>
        <div className={classes.productInfo}>
          <aside>
            <img src={props.product.imageUrl} alt="" />
          </aside>
          <div>
            <h3>Name:{props.product.title}</h3>
            <p>Price:{props.product.price}</p>
          </div>
        </div>
        <div className={classes.productAction}>
          <h3>Quantity:{props.product.quantity}</h3>
          <p>
            Total Price:
            {(props.product.quantity! * props.product.price).toFixed(2)}
          </p>
          <Button onClick={removeItemFromCartHandler}>Delete</Button>
        </div>
      </li>
    );
  }
  return <>{productItem}</>;
};

export default CartItem;
