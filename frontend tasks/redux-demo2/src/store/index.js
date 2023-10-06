// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import authReduce from "./auth";
import counterReduce from "./counter";

const store = configureStore({
  reducer: {
    counter: counterReduce,
    auth: authReduce,
  },
});

export default store;

// const counterReducer = (state = initialState, action) => {
//   if (action.type === "increment") {
//     return {
//       counter: state.counter + 1,
//     };
//   } else if (action.type === "decrement") {
//     return {
//       counter: state.counter - 1,
//     };
//   }
//   return state;
// };

// const store = createStore(counterReducer);
