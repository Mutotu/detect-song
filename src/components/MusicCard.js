import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import {
  StyledDiv,
  StyledLabel,
  FlexColumn,
  AnswerBox,
  Button,
} from "./styles/Styles";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIsCorrect,
  selecIsCorrect,
  updateSelectedOption,
  selectedOption,
} from "../options/optionsSlice";

const MusicFormCard = (props) => {
  const dispatch = useDispatch();
  const SelectCorrect = useSelector(selecIsCorrect);
  const SelectedOption = useSelector(selectedOption);
  const { options, songs } = props;

  const handleOptionChange = (e) => {
    dispatch(updateSelectedOption(e.target.name));
  };

  const handleClick = () => {
    if (
      SelectedOption === options.answers.filter((o) => o.correct)[0].artist.name
    ) {
      dispatch(updateIsCorrect(true));
      return;
    }
    dispatch(updateIsCorrect(false));
  };

  return (
    <StyledDiv>
      <FlexColumn>
        {songs.map((s) => (
          <ReactAudioPlayer key={s.preview_url} src={s.preview_url} controls />
        ))}
        <AnswerBox>
          {options.answers.map((option) => (
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
          ))}
        </AnswerBox>
        <Button onClick={handleClick}>Submit</Button>
        {SelectCorrect && <h3>correct</h3>}
      </FlexColumn>
    </StyledDiv>
  );
};

export default MusicFormCard;
