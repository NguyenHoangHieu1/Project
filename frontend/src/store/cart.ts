import { createSlice } from "@reduxjs/toolkit";
import Product from "../Interfaces/Product";

const initialState: {
  cartItems: Product[];
  totalPrice: number;
  totalQuantity: number;
} = {
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const cartItemIndex = state.cartItems.findIndex((item) => {
        return item._id.toString() === action.payload.product._id.toString();
      });
      if (cartItemIndex < 0) {
        state.cartItems.push(action.payload.product);
      } else {
        state.cartItems[cartItemIndex].quantity! +=
          action.payload.product.quantity;
      }
      state.totalQuantity += action.payload.product.quantity;
      state.totalPrice +=
        action.payload.product.price * action.payload.product.quantity;
      state.totalPrice = +state.totalPrice.toFixed(2);
    },
    removeItemFromCart: (state, action) => {
      const cartItemIndex = state.cartItems.findIndex((item) => {
        return item._id.toString() === action.payload._id.toString();
      });

      if (cartItemIndex < 0) {
        return;
      } else {
        state.totalPrice -= state.cartItems[cartItemIndex].price;
        state.totalPrice = +state.totalPrice.toFixed(2);
        if (state.cartItems[cartItemIndex].quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => {
            return item._id !== state.cartItems[cartItemIndex]._id;
          });
        } else {
          state.cartItems[cartItemIndex].quantity!--;
        }
        state.totalQuantity--;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
