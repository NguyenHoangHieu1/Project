import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState: {
  isLoggedIn: boolean;
  account: { username?: string; password?: string };
} = { isLoggedIn: false, account: {} };
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signup(state, action) {
      if (
        action.payload.account.username.length <= 5 ||
        action.payload.account.password.length <= 5
      ) {
        return;
      } else {
        state.account.username = action.payload.account.username;
        state.account.password = action.payload.account.password;
      }
    },
    login(state, action) {
      console.log("login");
      const accountInfo = action.payload.account;
      if (
        accountInfo.username === state.account.username &&
        accountInfo.password === state.account.password
      ) {
        state.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "" + state.isLoggedIn);
      }
    },
    setAuth(state) {
      state.isLoggedIn = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
