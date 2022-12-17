import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, useAppDispatch } from ".";
import { Product } from "../Interfaces/Product";
import useApi from "../customHooks/useApi";

const initialState: { products: Product[] } = { products: [] };
const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    addProduct(state, action) {
      state.products.push(action.payload.product);
    },
    replaceProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
