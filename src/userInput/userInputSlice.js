import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: [],
  authLoading: false,
  configLoading: false,
  token: "",
  dataFromUser: { numSongs: "", numArtist: "", genre: "" },
  error: false,
};

export const userInputSlice = createSlice({
  name: "userinput",
  initialState,
  reducers: {
    updatedataFromUser: (state, action) => {
      state.dataFromUser = {
        numSongs: action.payload.numSongs,
        numArtist: action.payload.numArtist,
        genre: action.payload.genre,
      };
    },
    updateAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    updateConfigLoading: (state, action) => {
      state.configLoading = action.payload;
    },
    updateError: (state, action) => {
      state.error = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const {
  updatedataFromUser,
  updateAuthLoading,
  checkLocalStorage,
  updateConfigLoading,
  updateError,
  getGenres,
} = userInputSlice.actions;

export const selectdataFromUser = (state) => state.userinput.dataFromUser;
export const selectAuthLoading = (state) => state.userinput.authLoading;
export const selectConfigLoading = (state) => state.userinput.configLoading;
export const selectError = (state) => state.userinput.error;
export const selectGenres = (state) => state.userinput.genres;

export default userInputSlice.reducer;
