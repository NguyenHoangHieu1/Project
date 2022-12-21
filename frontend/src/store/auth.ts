import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState: { token: string } = { token: "" };
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
    },
    clearToken(state, action) {
      localStorage.removeItem("token");
      state.token = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
