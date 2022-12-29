import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useAppSelector, useAppDispatch } from "../../../store";
import { addOrderAndClearCart } from "../../../store/order";
import Card from "../../UI/Card";
import useApi from "../../../customHooks/useApi";
import { useEffect, useState } from "react";
import CartInterface from "../../../Interfaces/Cart";
import Product from "../../../Interfaces/Product";
const Cart: React.FC<props> = (props) => {
  const [reset, setReset] = useState([1]);
  const [cartUser, setCartUser] = useState<CartInterface>();
  const userId = useAppSelector((state) => state.auth).userId;
  const apiHook = useApi();
  useEffect(() => {
    apiHook("/cart/" + userId, {
      useData(data) {
        setCartUser(data.cart);
      },
    });
  }, [reset]);
  function removeCartItemHandler(cartItems: CartInterface) {
    if (reset[0] == 1) {
      setReset([0]);
    } else {
      setReset([1]);
    }
    setCartUser(cartItems);
  }
  if (cartUser) {
    const productList = cartUser.cartItems.map((item) => {
      return (
        <CartItem
          onRemoveItem={removeCartItemHandler}
          key={item._id}
          product={item}
        />
      );
    });
    console.log(productList);
    if (productList.length == 0) {
      return <section className={classes.cart}>No Item found!</section>;
    } else {
      return (
        <Card>
          <main className={classes.cart}>
            <div className={classes.filledUpSpace}>
              <div className={classes.titleCart}>Your Cart:</div>
              <div className={classes.listOfProducts}>
                <ul className={classes.holdProducts}>{productList}</ul>
              </div>
            </div>
            <div className={classes.total}>
              <div className="partOfTotal">
                <h1>Total Price:{cartUser.totalPrice.toFixed(2)}</h1>
              </div>
              <div className="partOfTotal">
                <Button>Order!</Button>
              </div>
            </div>
          </main>
        </Card>
      );
    }
  } else {
    return <section className={classes.cart}>No Item found!</section>;
  }
};
export default Cart;
