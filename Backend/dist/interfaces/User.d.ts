import mongoose from "mongoose";
export interface User {
  email: string;
  password: string;
  username: string;
  cart: {
    cartItems: {
      productId: mongoose.Types.ObjectId;
      quantity: number;
    }[];

    totalQuantity: number;
    totalPrice: number;
  };
  token: string | undefined;
  tokenExp: Date | undefined;
}
