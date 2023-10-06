import { createSlice } from "@reduxjs/toolkit";

const counterInitialState = {
  counter: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: "Counter",
  initialState: counterInitialState,
  reducers: {
    increment(state, action) {
      state.counter++;
    },
    decrement(state, action) {
      state.counter--;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
