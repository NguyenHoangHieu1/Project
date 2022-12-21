import express from "express";
import { postAddProduct } from "../controllers/admin";
// import { getIndex } from "../controllers/main";
import { body } from "express-validator";
import isAuth from "../middleware/is-Auth";

const adminRoute = express.Router();

adminRoute.post(
  "/add-product",
  isAuth,
  [
    body("title", "The title has to be 5 characters long")
      .trim()
      .isLength({ min: 5 }),
    body("price", "It should be higher than 0").isNumeric().isFloat({ min: 1 }),
    body("imageUrl", "It should be an url of an image").isURL(),
    body("description", "The description should be 10 characters long")
      .trim()
      .isLength({ min: 10 }),
  ],
  postAddProduct
);

export default adminRoute;
