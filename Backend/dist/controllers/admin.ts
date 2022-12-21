import { RequestHandler } from "express";
import Product from "../models/product";
import { validationResult } from "express-validator";

export const postAddProduct: RequestHandler = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const validationCheck = validationResult(req);
  if (!validationCheck.isEmpty()) {
    return res.status(406).json({ message: validationCheck.array()[0].msg });
  }
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((data) => {
      res.status(201).json({ message: "Created Successfully", product: data });
    })
    .catch((err) => next(err));
};
