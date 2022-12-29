import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, useAppDispatch } from ".";
import Product from "../Interfaces/Product";
import useApi from "../customHooks/useApi";

const initialState: { products: Product[]; yourProducts: Product[] } = {
  products: [],
  yourProducts: [],
};
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    addProduct(state, action) {
      state.products.push(action.payload.product.product);
    },
    replaceProducts(state, action) {
      state.products = action.payload;
    },
    addYourProduct(state, action) {
      state.yourProducts.push(action.payload.product.product);
    },
    removeYourProduct(state, action) {
      state.yourProducts = state.yourProducts.filter((product) => {
        return product !== action.payload.id;
      });
    },
    replaceYourProducts(state, action) {},
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
