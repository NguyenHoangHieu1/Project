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

export const fetchProducts = (data: Product[]) => {
  return (dispatch: AppDispatch) => {
    dispatch(productActions.replaceProducts(data));
  };
};

export const addProduct = (data: Product) => {
  return (dispatch: AppDispatch) => {
    const fetchApi = useApi("/add-product", {
      method: "POST",
      body: {
        title: data.title,
        price: data.price,
        imageUrl: data.imageUrl,
        description: data.description,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(productActions.addProduct);
    fetchApi();
  };
};

export const productActions = productSlice.actions;

export default productSlice.reducer;
