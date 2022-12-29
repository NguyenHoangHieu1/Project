import React, { useEffect, useState } from "react";
import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import ProductItem from "../../Products/ProductItem";
import classes from "./ProductsHome.module.css";
import Products from "../../Products/Products";
import Card from "../../UI/Card";
import useApi from "../../../customHooks/useApi";
import Product from "../../../Interfaces/Product";
const ProductsLayout: React.FC<props> = (props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const apiHook = useApi();
  useEffect(() => {
    apiHook("/", {
      useData(data) {
        return data;
      },
    }).then((data) => {
      if (data && data.products) {
        setProducts(data.products);
      }
    });
  }, []);
  let isEnough: boolean = false;
  let numOfProducts = 2;

  const [numberOfProducts, setNumberOfProducts] = useState(numOfProducts);

  function increaseProducts() {
    setNumberOfProducts(numberOfProducts + 2);
  }
  let loadedProducts: Product[] = [];
  for (let i = 0; i <= numberOfProducts - 1; i++) {
    if (numberOfProducts >= 5 || numberOfProducts >= products.length) {
      isEnough = true;
    }
    if (products[i] != undefined) {
      loadedProducts.push(products[i]);
    }
  }
  // console.log(loadedProducts);
  // console.log(products);
  let moreButton = <Button onClick={increaseProducts}>More +</Button>;
  if (isEnough) {
    moreButton = <></>;
  }

  return (
    <Card>
      <Products products={loadedProducts} pagination={false} />
      <div style={{ textAlign: "center" }}>{moreButton}</div>
    </Card>
  );
};

export default ProductsLayout;
