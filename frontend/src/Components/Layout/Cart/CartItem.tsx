import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import classes from "./CartItem.module.css";
import { useAppSelector } from "../../../store";
import useApi from "../../../customHooks/useApi";
import { useRef } from "react";
const CartItem: React.FC<props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const userId = useAppSelector((state) => state.auth).userId;
  const apiHook = useApi();
  function removeItemFromCartHandler() {
    if (props.product && props.onRemoveItem && inputRef && inputRef.current) {
      apiHook("/delete-cart-item", {
        method: "DELETE",
        body: {
          cartItemId: props.product.productId?._id,
          userId: userId,
          quantityToDelete: inputRef.current.value,
        },
        headers: {
          "Content-Type": "application/json",
        },
        useData(data) {
          if (data && data.cart && props && props.onRemoveItem) {
            props.onRemoveItem(data.cart);
          }
        },
      });
    }
  }
  let productItem;
  if (props.product?.productId) {
    productItem = (
      <li className={classes.product}>
        <div className={classes.productInfo}>
          <aside>
            <img src={props.product.productId.imageUrl} alt="" />
          </aside>
          <div>
            <h3>Name:{props.product.productId.title}</h3>
            <p>Price:{props.product.productId.price}</p>
          </div>
        </div>
        <div className={classes.productAction}>
          <h3>Quantity:{props.product.quantity}</h3>
          <input ref={inputRef} type="number" min="1" max="5" />
          <p>
            Total Price:
            {(props.product.quantity! * props.product.productId.price).toFixed(
              2
            )}
          </p>
          <Button onClick={removeItemFromCartHandler}>Delete</Button>
        </div>
      </li>
    );
  }
  return <>{productItem}</>;
};

export default CartItem;
