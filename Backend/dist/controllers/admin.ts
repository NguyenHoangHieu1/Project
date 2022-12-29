import { RequestHandler } from "express";
import Product from "../models/product";
import { validationResult } from "express-validator";
import User from "../models/user";
import UserInterface from "../interfaces/User";

export const getYourProducts: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const products = await Product.find({ userId: userId });
    return res.status(200).json({ message: "Products", products: products });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

export const postAddProduct: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const userId = req.body.userId;
  const validationCheck = validationResult(req);
  if (!validationCheck.isEmpty()) {
    return res.status(406).json({ message: validationCheck.array()[0].msg });
  }
  try {
    const product = await Product.create({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      userId: userId,
    });
    return res
      .status(201)
      .json({ message: "Created Successfully", product: product });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

export const DeleteProduct: RequestHandler = async (req, res, next) => {
  const productId = req.body.productId;
  try {
    await Product.findByIdAndDelete(productId);
    return res.status(201).json({ message: "Deleted successfully" });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

export const GetEditProduct: RequestHandler = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    return res
      .status(200)
      .json({ message: "Fetch product successfully", product: product });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};

export const putEditProduct: RequestHandler = async (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    product.title = title;
    product.price = price;
    product.description = description;
    product.imageUrl = imageUrl;
    await product.save();
    return res.status(200).json({ message: "Created successfully" });
  } catch (error: any) {
    if (!error.status) {
      error.status = 500;
    }
    next(error);
  }
};
