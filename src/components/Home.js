import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import fetchFromSpotify, { request } from "../services/api";
import Button from "./Button";
import Input from "./Input";
import styled from "styled-components";

import {
  selectDataToLocalStorage,
  checkLocalStorage,
  updateDataToLocalStorage,
  selectAuthLoading,
  updateAuthLoading,
  updateConfigLoading,
  selectConfigLoading,
  updateError,
  selectError,
  selectGenres,
  getGenres,
} from "../userInput/userInputSlice";
import { useSelector, useDispatch } from "react-redux";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

// const StyledHome = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
// `;

const StyledH1 = styled.h1`
  color: #001427;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
`;

const Home = () => {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [token, setToken] = useState("");
  const [dataToLocalStorage, setDataToLocalStorage] = useState({
    numSongs: "",
    numArtist: "",
    genre: "",
  });
  const history = useHistory();
  const SelectError = useSelector(selectError);
  const DataToLocalStorage = useSelector(selectDataToLocalStorage);
  const SelectAuthLoading = useSelector(selectAuthLoading);
  const SelectConfigLoading = useSelector(selectConfigLoading);
  const SelectGenres = useSelector(selectGenres);

  const updateNumSongs = (event) => {
    event.persist();

    setDataToLocalStorage((pre) => ({
      ...pre,
      [event.target.name]:
        Number(event.target.value) < 1
          ? 1
          : Number(event.target.value) > 3
          ? 3
          : Number(event.target.value),
    }));
    dispatch(updateDataToLocalStorage(dataToLocalStorage));
  };

  const updateNumArtists = (event) => {
    event.persist();
    setDataToLocalStorage((pre) => ({
      ...pre,
      [event.target.name]:
        Number(event.target.value) < 2
          ? 2
          : Number(event.target.value) > 4
          ? 4
          : Number(event.target.value),
    }));
    dispatch(updateDataToLocalStorage(dataToLocalStorage));
  };

  const handleClick = () => {
    if (
      !DataToLocalStorage.genre ||
      !DataToLocalStorage.numArtist ||
      !DataToLocalStorage.numSongs
    ) {
      updateError(true);
      return;
    }
    dispatch(updateDataToLocalStorage(DataToLocalStorage));

    updateError(false);
    localStorage.setItem("userInput", JSON.stringify(dataToLocalStorage));
    history.push("/game");
  };
  const loadGenres = async (t) => {
    dispatch(updateConfigLoading(true));
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "recommendations/available-genre-seeds",
    });
    console.log(response);
    dispatch(getGenres(response.genres));
    dispatch(updateConfigLoading(false));
  };

  useEffect(() => {
    dispatch(checkLocalStorage());
    dispatch(updateAuthLoading(true));

    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        dispatch(updateAuthLoading(false));
        setToken(storedToken.value);
        loadGenres(storedToken.value);

        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      dispatch(updateAuthLoading(false));
      setToken(newToken.value);
      loadGenres(newToken.value);
    });
  }, []);

  if (SelectAuthLoading || SelectConfigLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StyledH1>Genre:</StyledH1>
      <select
        value={DataToLocalStorage.genre}
        name='genre'
        onChange={(event) =>
          updateDataToLocalStorage({
            ...DataToLocalStorage,
            genre: event.target.value,
          })
        }
      >
        <option width='30px' value='' />
        {SelectGenres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <Input
        tp='number'
        placeholder='Number of songs'
        name='numSongs'
        value={dataToLocalStorage.numSongs}
        onChange={updateNumSongs}
      ></Input>
      <Input
        tp='number'
        placeholder='Number of artists'
        name='numArtist'
        value={dataToLocalStorage.numArtist}
        onChange={updateNumArtists}
      ></Input>
      <Button w='20%' h='4rem' mg='2rem' onClick={handleClick}>
        Play
      </Button>
      {SelectError && <p>Please enter all the values</p>}
    </div>
  );
};

export default Home;
