import { RequestHandler } from "express";
import Product from "../models/product";
export const getIndex: RequestHandler = (req, res, next) => {
  Product.find()
    .then((products) => {
      if (products.length == 0) {
        res.status(200).json({ products: [], message: "No Product Found" });
      } else {
        res
          .status(200)
          .json({ products: products, message: "Fetch successfully" });
      }
    })
    .catch((err) => next(err));
};
