import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import ProductItem from "../../Products/ProductItem";
import classes from "./ProductsHome.module.css";
import Input from "../../UI/Input";
import Products from "../../Products/Products";
import { useAppSelector } from "../../../store";
import Container from "../../UI/Container";
const ProductsLayout: React.FC<props> = (props) => {
  const products = useAppSelector((state) => state.product).products;
  console.log(products);
  const history = useHistory();

  let isEnough: boolean = false;
  let numOfProducts = 2;

  const [numberOfProducts, setNumberOfProducts] = useState(numOfProducts);
  function increaseProducts() {
    setNumberOfProducts(numberOfProducts + 2);
  }
  const loadedProducts = products.map((product, index) => {
    if (index >= numberOfProducts) {
      return;
    } else {
      if (numberOfProducts >= products.length) {
        isEnough = true;
      }
      if (products[0] != undefined) {
        return <ProductItem key={product._id} product={product} />;
      }
    }
  });
  let moreButton = <Button onClick={increaseProducts}>More +</Button>;
  if (isEnough) {
    moreButton = <></>;
  }

  return (
    <section className={classes.products}>
      <div className={classes.title}>
        <h3>Products:</h3>
        <p>Buy one of the finest Products in the world</p>
      </div>

      <Products loadedProducts={loadedProducts}></Products>

      <div style={{ textAlign: "center" }}>{moreButton}</div>
    </section>
  );
};

export default ProductsLayout;
