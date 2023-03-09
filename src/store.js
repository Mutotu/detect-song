import { configureStore } from "@reduxjs/toolkit";
import userInputReducer from "./userInput/userInputSlice";
import optionReducer from "./options/optionsSlice";

export const store = configureStore({
  reducer: {
    userinput: userInputReducer,
    options: optionReducer,
  },
});
