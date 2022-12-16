import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../Interfaces/Order";
import { cartActions } from "./cart";
import { AppDispatch } from "./index";
const initialState: { orders: Order[] } = { orders: [] };

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload.order);
    },
  },
});

export const addOrderAndClearCart = (order: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(cartActions.clearCart());
    dispatch(orderSlice.actions.addOrder(order));
  };
};

export const orderAction = orderSlice.actions;

export default orderSlice.reducer;
