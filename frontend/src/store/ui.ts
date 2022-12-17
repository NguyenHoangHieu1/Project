import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  messageState: {
    status?: "success" | "loading";
    title?: string;
  };
} = { messageState: {} };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    openMessage(state, action) {
      state.messageState.status = action.payload.stateChange.status;
      state.messageState.title = action.payload.stateChange.title;
    },
    closeMessage(state, action) {
      state.messageState = {};
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
