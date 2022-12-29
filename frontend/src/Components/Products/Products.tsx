import { Link, Route, useLocation } from "react-router-dom";
import React, { FormEvent, useState } from "react";
import props from "../../Interfaces/Props";
import Button from "../UI/Button";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import Input from "../UI/Input";
import Container from "../UI/Container";
import Card from "../UI/Card";
import useApi from "../../customHooks/useApi";

const ITEMS_PER_PAGE = 3;

const Products: React.FC<props> = (props) => {
  const apiHook = useApi();
  function deleteProductHandler(productId: string) {
    if (props.deleteProduct) props.deleteProduct(productId);
  }

  const products = props.products!;
  const [searchFiltered, setSearchFiltered] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let pageCount = +queryParams.get("page")!;
  if (pageCount === null || location.search == "") {
    pageCount = 1;
  }
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
      return (
        <ProductItem
          deleteProduct={deleteProductHandler}
          key={product._id}
          editProduct={props.editProduct}
          product={product}
        />
      );
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
        return (
          <ProductItem
            deleteProduct={deleteProductHandler}
            key={product._id}
            editProduct={props.editProduct}
            product={product}
          />
        );
      }
    }
  });

  let pagination = (
    <>
      {pageCount !== 1 && prevPage !== 1 && (
        <Link className={classes.page} to={`/${props.linkPage}/?page=1`}>
          1
        </Link>
      )}
      {hasPrevPage && (
        <Link
          className={classes.page}
          to={`/${props.linkPage}/?page=${prevPage}`}
        >
          {prevPage}
        </Link>
      )}
      <Link
        className={classes.mainPage}
        to={`/${props.linkPage}/?page=${pageCount}`}
      >
        {pageCount}
      </Link>
      {hasNextPage && (
        <Link
          className={classes.page}
          to={`/${props.linkPage}/?page=${nextPage}`}
        >
          {nextPage}
        </Link>
      )}
      {nextPage !== totalPage && pageCount !== totalPage && (
        <Link
          className={classes.page}
          to={`/${props.linkPage}/?page=${totalPage}`}
        >
          {totalPage}
        </Link>
      )}
    </>
  );
  function filterChangeHandler(e: FormEvent<HTMLInputElement>) {
    const value = e.target as HTMLInputElement;
    setSearchFiltered(value.value);
  }
  return (
    <Card>
      <Container>
        <div className={classes.title}>
          <h3>Products:</h3>
          <p>Buy one of the finest Products in the world</p>
        </div>
        <div className={classes.filter}>
          <span>Find:</span>
          <Input onChange={filterChangeHandler} />
        </div>
        <div className={classes.sellProducts}>
          <ul className={classes.listOfProducts}>{loadedProducts}</ul>
          <div className={classes.fixedButton}></div>
        </div>
        {props.pagination && (
          <nav className={classes.pagination}>{pagination}</nav>
        )}
      </Container>
    </Card>
  );
};

export default Products;
