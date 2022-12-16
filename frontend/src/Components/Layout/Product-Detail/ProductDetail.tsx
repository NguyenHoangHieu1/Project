import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import classes from "./ProductDetail.module.css";
import { useParams } from "react-router";
import { useAppSelector } from "../../../store";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../store";
import { cartActions } from "../../../store/cart";
import Recommend from "./Recommend";
const ProductDetail: React.FC<props> = (props) => {
  const products = useAppSelector((state) => state.product).products;
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const { productId }: { productId: string } = useParams();
  const product = products.find((product) => {
    return product._id == productId;
  });
  function addToCartHandler() {
    dispatch(
      cartActions.addItemToCart({ product: { ...product, quantity: quantity } })
    );
  }
  let price = 0;
  if (product) {
    price = product?.price * quantity;
  }
  const changeQuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target as HTMLInputElement;
    if (+value.value <= -1) {
      return;
    }
    setQuantity(+value.value);
  };
  let productElement;
  if (product) {
    productElement = (
      <>
        <h1>{product?.title}</h1>
        <img src={product?.imageUrl} alt={product?.description} />
        <p>{product?.description}</p>
        <label htmlFor="quantity">Quantity:</label>
        <input min="1" onChange={changeQuantityHandler} type="number" />
        <i>{price.toFixed(2)}$</i>
        <Button onClick={addToCartHandler}>Add To Cart</Button>
      </>
    );
  } else {
    productElement = <p>Product not found!</p>;
  }
  return (
    <section className={classes.detail}>
      {productElement}
      <Recommend product={product} />
    </section>
  );
};
export default ProductDetail;
