import props from "../../../Interfaces/Props";
import classes from "./Recommend.module.css";

import { useAppSelector } from "../../../store";
import ProductItem from "../../Products/ProductItem";
const Recommend: React.FC<props> = (props) => {
  const products = useAppSelector((state) => state.product).products;
  let currentItemIndex = 0;
  let productCount = 0;
  const loadedProducts = products.filter((item, index) => {
    if (item._id === props.product?._id) {
      currentItemIndex = index;
    }
    return item._id !== props.product?._id;
  });
  let recommendProducts = loadedProducts.map((item, index) => {
    if (productCount !== 3) {
      if (currentItemIndex - 2 == index) {
        productCount++;
        return item;
      } else if (currentItemIndex - 1 == index) {
        productCount++;
        return item;
      } else if (currentItemIndex + 1 == index) {
        productCount++;
        return item;
      } else if (currentItemIndex + 2 == index) {
        productCount++;
        return item;
      } else {
        productCount++;
        return item;
      }
    }
  });

  const displayProducts = recommendProducts.map((item) => {
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
