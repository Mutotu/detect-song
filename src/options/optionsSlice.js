import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  correct: false,
  option: "",
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    updateIsCorrect: (state, action) => {
      state.correct = action.payload.isCorrect;
    },
    updateSelectedOption: (state, action) => {
      state.option = action.payload.option;
    },
  },
});

export const { updateIsCorrect, updateSelectedOption } = optionsSlice.actions;
export const selecIsCorrect = (state) => state.options.correct;
export const selectedOption = (state) => state.options.option;

export default optionsSlice.reducer;
