import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import classes from "./ProductDetail.module.css";
import { useParams } from "react-router";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import Recommend from "./Recommend";
import { Params } from "../../../Interfaces/Params";
import useApi from "../../../customHooks/useApi";
import Product from "../../../Interfaces/Product";
const ProductDetail: React.FC<props> = (props) => {
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const apiHook = useApi();
  const productId = useParams<Params>().productId;
  const userId = useAppSelector((state) => state.auth).userId;
  useEffect(() => {
    apiHook("/product-detail/" + productId, {
      useData(data) {
        setProduct(data.product);
      },
    });
  }, []);
  function addToCartHandler(): void {
    apiHook("/add-to-cart", {
      method: "put",
      body: {
        productId: productId,
        quantity: quantity,
        userId: userId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  let price = 0;
  if (product) {
    price = product.price * quantity;
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
        <h1>{product.title}</h1>
        <img src={product.imageUrl} alt={product.description} />
        <p>{product.description}</p>
        <label htmlFor="quantity">Quantity:</label>
        <input
          value={quantity}
          min="1"
          onChange={changeQuantityHandler}
          type="number"
        />
        <i>{price.toFixed(2)}$</i>
        <Button onClick={addToCartHandler}>Add To Cart</Button>
      </>
    );
  } else {
    productElement = <p>Loading!</p>;
  }
  return (
    <section className={classes.detail}>
      {productElement}
      <Recommend product={product} />
    </section>
  );
};
export default ProductDetail;
