import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  correct: false,
  option: "",
  result: { wins: 0, loses: 0 },
  counter: 0,
  attempt: 0,
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    updateIsCorrect: (state, action) => {
      state.correct = action.payload;
    },
    updateSelectedOption: (state, action) => {
      state.option = action.payload;
    },
    updateCounter: (state) => {
      state.counter = state.counter - 1;
    },
    updateResult: (state, action) => {
      state.result = (state, action) => {};
    },
    updateAttempt: (state, action) => {
      state.attempt = action.payload;
    },
  },
});

export const { updateIsCorrect, updateSelectedOption, updateAttempt } =
  optionsSlice.actions;
export const selecIsCorrect = (state) => state.options.correct;
export const selectedOption = (state) => state.options.option;
export const selectedAttempt = (state) => state.options.attempt;

export default optionsSlice.reducer;
