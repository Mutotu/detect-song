import { configureStore } from "@reduxjs/toolkit";
import userInputReducer from "./userInput/userInputSlice";

export const store = configureStore({
  reducer: {
    userinput: userInputReducer,
  },
});
