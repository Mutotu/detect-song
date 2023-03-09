import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import styled from 'styled-components'


const StyledDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-around;
`

const StyledLabel = styled.label`
  padding: 10px;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: space-around;
  
`
const AnswerBox = styled.div`
  gap: 10px;
  & img {
    display: inline;
    height: 100px;
    width: 100px;
  }
  & h5 {
    display: inline;
  }
  & label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`
const Button = styled.button`
  width: 10.5vw;
`

const MusicFormCard = (props) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const { options, songs } = props;

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.name);
  };

  const handleClick = () => {
    console.log(options.answers.filter((o) => o.correct)[0].artist.name);
    if (
      selectedOption === options.answers.filter((o) => o.correct)[0].artist.name
    ) {
      setIsCorrect(true);
      console.log(songs);
      return;
    }
    setIsCorrect(false);
    console.log("no correct");
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
                value={selectedOption}
                checked={selectedOption === option.artist.name}
                onChange={handleOptionChange}
              />
              <img src={option.artist.images[0].url} />
              <h5>{option.artist.name}</h5>
            </StyledLabel>
          ))}
        </AnswerBox>
        <Button onClick={handleClick}>Submit</Button>
      {isCorrect && <h3>correct</h3>}
      </FlexColumn>
      
    </StyledDiv >
  );
};

export default MusicFormCard;
