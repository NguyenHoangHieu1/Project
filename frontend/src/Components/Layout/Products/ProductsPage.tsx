import { Link, Route, useLocation } from "react-router-dom";
import React, { FormEvent, useEffect, useState } from "react";
import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import ProductItem from "../../Products/ProductItem";
import classes from "./ProductsPage.module.css";
import Input from "../../UI/Input";
import Products from "../../Products/Products";
import Container from "../../UI/Container";
import { useAppSelector } from "../../../store";
import Card from "../../UI/Card";
import Product from "../../../Interfaces/Product";
import useApi from "../../../customHooks/useApi";
import { useParams } from "react-router-dom";
import { Params } from "../../../Interfaces/Params";

const ProductsPage: React.FC<props> = (props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const apiHook = useApi();
  useEffect(() => {
    apiHook(`/products`, {
      useData(data) {
        return data;
      },
    }).then((data) => {
      if (data && data.products) {
        setProducts(data.products);
      }
    });
  }, []);
  return <Products linkPage="products" pagination={true} products={products} />;
};

export default ProductsPage;
