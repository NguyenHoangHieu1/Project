import mongoose, { Schema, ObjectId } from "mongoose";
import Product from "./product";
import { User } from "../interfaces/User";

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Date,
  },
  cart: {
    cartItems: [
      {
        productId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
  },
});
const User = mongoose.model("User", userSchema);

export default User;
