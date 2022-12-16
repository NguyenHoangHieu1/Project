import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import classes from "./Order.module.css";
import { useAppSelector } from "../../../store";
import { Product } from "../../../Interfaces/Product";
const Order: React.FC<props> = (props) => {
  const order = useAppSelector((state) => state.order);
  console.log(order.orders);
  const loadedOrders = order.orders.map((orderItem) => {
    return (
      <li key={orderItem.orderId} className={classes.order}>
        <details>
          <summary>Id of the order:{orderItem.orderId}</summary>
          <ul className={classes.productList}>
            {orderItem.cartItems.map((item: Product) => {
              return (
                <li key={item._id} className={classes.product}>
                  <div className={classes.productInfo}>
                    <aside>
                      <img src={item.imageUrl} alt="" />
                    </aside>
                    <div>
                      <h3>Name:{item.title}</h3>
                    </div>
                  </div>
                  <div className={classes.productAction}>
                    <p>Price:{item.price}</p>
                    <h3>Quantity:{item.quantity}</h3>
                    <i>Total Price : {item.quantity! * item.price}</i>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className={classes.orderCost}>
            Total Quantity:{orderItem.totalQuantity}
          </p>
          <p className={classes.orderCost}>
            Total Price : {orderItem.totalPrice}
          </p>
        </details>
      </li>
    );
  });
  const displayContent =
    loadedOrders.length > 0 ? loadedOrders : <h1>No Order Found!</h1>;
  return (
    <section className={classes.orderContent}>
      <ul className={classes.orderList}>{displayContent}</ul>
    </section>
  );
};

export default Order;
