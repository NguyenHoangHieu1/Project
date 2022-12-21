import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useAppSelector, useAppDispatch } from "../../../store";
import { addOrderAndClearCart } from "../../../store/order";
import Card from "../../UI/Card";
const Cart: React.FC<props> = (props) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  function addOrderHandler() {
    dispatch(
      addOrderAndClearCart({
        order: {
          cartItems: cart.cartItems,
          orderId: Math.random().toString(),
          totalQuantity: cart.totalQuantity,
          totalPrice: cart.totalPrice,
        },
      })
    );
  }
  const productList = cart.cartItems.map((item) => {
    return <CartItem key={item._id} product={item} />;
  });
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
              <h1>Total Price:{cart.totalPrice.toFixed(2)}</h1>
            </div>
            <div className="partOfTotal">
              <Button onClick={addOrderHandler}>Order!</Button>
            </div>
          </div>
        </main>
      </Card>
    );
  }
};
export default Cart;
