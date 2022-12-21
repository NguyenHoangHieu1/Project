import { Link, Route, useLocation } from "react-router-dom";
import React, { FormEvent, useState } from "react";
import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import ProductItem from "../../Products/ProductItem";
import classes from "./ProductsPage.module.css";
import Input from "../../UI/Input";
import Products from "../../Products/Products";
import Container from "../../UI/Container";
import { useAppSelector } from "../../../store";

const ITEMS_PER_PAGE = 3;

const ProductsPage: React.FC<props> = (props) => {
  const products = useAppSelector((state) => state.product).products;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let pageCount = +queryParams.get("page")!;
  if (pageCount === null || location.search == "") {
    pageCount = 1;
  }
  const [searchFiltered, setSearchFiltered] = useState("");
  const loadedProductsLength = pageCount * ITEMS_PER_PAGE;
  const totalPage = Math.ceil(products.length / ITEMS_PER_PAGE);
  const hasNextPage = pageCount < totalPage;
  const hasPrevPage = pageCount > 1;
  let nextPage = 0;
  let prevPage = 0;
  if (hasNextPage) {
    nextPage = pageCount + 1;
  }
  if (hasPrevPage) {
    prevPage = pageCount - 1;
  }
  const loadedProducts = products.map((product, index) => {
    if (
      index >= loadedProductsLength ||
      index < loadedProductsLength - ITEMS_PER_PAGE
    ) {
      return;
    }
    if (searchFiltered === "") {
      return <ProductItem key={product._id} product={product} />;
    } else {
      let isMatch = false;
      for (let i = 0; i < searchFiltered.length; i++) {
        if (product.title[i]) {
          if (
            searchFiltered[i].toLowerCase() === product.title[i].toLowerCase()
          ) {
            isMatch = true;
          } else {
            isMatch = false;
          }
        }
      }
      if (isMatch) {
        return <ProductItem key={product._id} product={product} />;
      }
    }
  });
  function filterChangeHandler(e: FormEvent<HTMLInputElement>) {
    const value = e.target as HTMLInputElement;
    setSearchFiltered(value.value);
  }
  let pagination = (
    <>
      {pageCount !== 1 && prevPage !== 1 && (
        <Link className={classes.page} to="/products/?page=1">
          1
        </Link>
      )}
      {hasPrevPage && (
        <Link className={classes.page} to={`/products/?page=${prevPage}`}>
          {prevPage}
        </Link>
      )}
      <Link className={classes.mainPage} to={`/products/?page=${pageCount}`}>
        {pageCount}
      </Link>
      {hasNextPage && (
        <Link className={classes.page} to={`/products/?page=${nextPage}`}>
          {nextPage}
        </Link>
      )}
      {nextPage !== totalPage && pageCount !== totalPage && (
        <Link className={classes.page} to={`/products/?page=${totalPage}`}>
          {totalPage}
        </Link>
      )}
    </>
  );

  return (
    <section className={classes.products}>
      <Container>
        <div className={classes.title}>
          <h3>Products:</h3>
          <p>Buy one of the finest Products in the world</p>
        </div>
        <div className={classes.filter}>
          <span>Find:</span>
          <Input onChange={filterChangeHandler} />
        </div>
        <Products loadedProducts={loadedProducts}></Products>
        <nav className={classes.pagination}>{pagination}</nav>
      </Container>
    </section>
  );
};

export default ProductsPage;
