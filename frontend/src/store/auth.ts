import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState: { token: string; userId: string } = {
  token: "",
  userId: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    clearAuth(state, action) {
      localStorage.removeItem("token");
      state.token = "";
      state.userId = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
