import express from "express";
import { postAddProduct } from "../controllers/admin";
import { getIndex } from "../controllers/main";
import { body } from "express-validator";

const adminRoute = express.Router();

adminRoute.post(
  "/add-product",
  [
    body("title").trim().isLength({ min: 5 }),
    body("price").isNumeric(),
    body("imageUrl").isURL(),
    body("description").trim().isLength({ min: 10 }),
  ],
  postAddProduct
);

export default adminRoute;
