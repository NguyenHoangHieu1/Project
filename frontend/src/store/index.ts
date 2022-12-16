import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartSlice from "./cart";
import orderSlice from "./order";
import productSlice from "./product";
import authSlice from "./auth";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    order: orderSlice,
    product: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
