import props from "../../../Interfaces/Props";
import classes from "./Recommend.module.css";

import { useAppSelector } from "../../../store";
import ProductItem from "../../Products/ProductItem";
import { useEffect, useState } from "react";
import Product from "../../../Interfaces/Product";
import useApi from "../../../customHooks/useApi";
const Recommend: React.FC<props> = (props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const apiHook = useApi();
  useEffect(() => {
    apiHook(`/product-recommend/${props.product?._id}`, {
      useData(data) {
        if (data && data.products) setProducts(data.products);
      },
    });
  }, []);

  const displayProducts = products.map((item) => {
    if (item) {
      return <ProductItem key={item._id} product={item} />;
    }
  });
  return (
    <section className={classes.recommend}>
      <header>
        <h1>Recommend:</h1>
      </header>
      <nav>
        <ul>{displayProducts}</ul>
      </nav>
    </section>
  );
};

export default Recommend;
