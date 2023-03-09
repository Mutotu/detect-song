import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: [],
  authLoading: false,
  configLoading: false,
  token: "",
  dataToLocalStorage: { numSongs: "", numArtist: "", genre: "" },
  error: false,
};

export const userInputSlice = createSlice({
  name: "userinput",
  initialState,
  reducers: {
    checkLocalStorage: (state) => {
      const retriveLocalStorage = JSON.parse(localStorage.getItem("userInput"));
      if (retriveLocalStorage) {
        state.dataToLocalStorage = {
          numSongs: retriveLocalStorage.numSongs,
          numArtist: retriveLocalStorage.numArtist,
          genre: retriveLocalStorage.genre,
        };
      }
    },
    updateDataToLocalStorage: (state, action) => {
      state.dataToLocalStorage = {
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
      console.log("slice", action);
      state.genres = action.payload;
    },
  },
});

export const {
  updateDataToLocalStorage,
  updateAuthLoading,
  checkLocalStorage,
  updateConfigLoading,
  updateError,
  getGenres,
} = userInputSlice.actions;

export const selectDataToLocalStorage = (state) =>
  state.userinput.dataToLocalStorage;

export const selectAuthLoading = (state) => state.userinput.authLoading;
export const selectConfigLoading = (state) => state.userinput.configLoading;
export const selectError = (state) => state.userinput.error;
export const selectGenres = (state) => state.userinput.genres;

export default userInputSlice.reducer;
