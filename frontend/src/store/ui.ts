import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  message: string;
  messageState: {
    status?: "success" | "loading";
    title?: string;
  };
} = { message: "", messageState: {} };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    openMessage(state, action) {
      state.message = action.payload.stateChange.message;
      state.messageState.status = action.payload.stateChange.status;
      state.messageState.title = action.payload.stateChange.title;
    },
    closeMessage(state, action) {
      state.message = "";
      state.messageState = {};
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
