import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import {
  StyledDiv,
  StyledLabel,
  FlexColumn,
  AnswerBox,
  Button,
  PTag,
} from "./styles/Styles";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsCorrect,
  selecIsCorrect,
  updateSelectedOption,
  selectedOption,
  selectedAttempt,
  updateAttempt,
} from "../options/optionsSlice";
import { selectdataFromUser } from "../userInput/userInputSlice";

const MusicFormCard = (props) => {
  const dispatch = useDispatch();
  const SelectCorrect = useSelector(selecIsCorrect);
  const SelectedOption = useSelector(selectedOption);
  const SelectedAttempt = useSelector(selectedAttempt);
  const SelectedDataFromUser = useSelector(selectdataFromUser);

  const { options, songs } = props;

  const [glow, setGlow] = useState(false);
  const [counter, setCounter] = useState({ wins: 0, loses: 0 });
  const [prize, setPrice] = useState(false);

  const handleOptionChange = (e) => {
    dispatch(updateSelectedOption(e.target.name));
  };

  const handleReplayClick = () => {
    location.reload();

    dispatch(updateIsCorrect(false));
    dispatch(updateSelectedOption(""));
  };

  const handleClick = () => {
    if (counter.wins > 3 && counter.loses < 2) {
      setPrice(true);
    }
    if (SelectedOption === "") return;
    if (
      SelectedOption === options.answers.filter((o) => o.correct)[0].artist.name
    ) {
      dispatch(updateIsCorrect(true));
      return;
    }
    dispatch(updateIsCorrect(false));
    dispatch(updateAttempt(SelectedAttempt - 1));
    setGlow(true);
  };
  useEffect(() => {
    dispatch(updateAttempt(SelectedDataFromUser.numArtist - 1));
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setGlow(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [glow]);
  useEffect(() => {
    if (SelectCorrect) setCounter((pre) => ({ ...pre, wins: pre.wins + 1 }));
    if (SelectedAttempt === 0)
      setCounter((pre) => ({ ...pre, loses: pre.loses + 1 }));
    window.localStorage.setItem("result", JSON.stringify(counter));
  }, [SelectCorrect, SelectedAttempt]);

  return (
    <StyledDiv>
      <div style={{ marginTop: "1rem" }}>
        <PTag g={glow && "glow"}>
          {SelectedAttempt + " "} Attempt{SelectedAttempt > 1 ? "s" : ""}{" "}
          remaining
        </PTag>
        <p style={{ fontSize: "25px", fontWeight: "bolder", color: "red" }}>
          Wins: {counter.wins} || Loses: {counter.loses}
        </p>
        <p>Get a prize for 4 wins and 1 lose</p>
        {SelectCorrect && <h1 style={{ color: "green" }}>You win</h1>}
        {!SelectCorrect && SelectedAttempt === 0 && <h1>You lose</h1>}

        {prize && (
          <Button onClick={() => history.push("/prize")}>
            Collect your price
          </Button>
        )}
      </div>
      <FlexColumn>
        {songs.map((s) => (
          <ReactAudioPlayer key={s.preview_url} src={s.preview_url} controls />
        ))}
        <AnswerBox>
          {options.answers.map((option) => {
            return (
              <StyledLabel key={option.artist.name}>
                <input
                  type='radio'
                  name={option.artist.name}
                  value={SelectedOption}
                  checked={SelectedOption === option.artist.name}
                  onChange={handleOptionChange}
                />
                <img src={option.artist.images[0].url} />
                <h5>{option.artist.name}</h5>
              </StyledLabel>
            );
          })}
        </AnswerBox>
        <Button
          onClick={handleClick}
          disabled={SelectedAttempt === 0 || SelectCorrect}
        >
          Submit
        </Button>
        {SelectedAttempt === 0 || SelectCorrect ? (
          <Button w='10.5vw' onClick={handleReplayClick}>
            Play again
          </Button>
        ) : (
          ""
        )}
      </FlexColumn>
    </StyledDiv>
  );
};

export default MusicFormCard;
