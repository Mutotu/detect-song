import styled from "styled-components";

export const StyledHome = styled.div`
  margin-top: 10rem;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  & h1 {
    color: #001427;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300;
  }
  & select {
    border: 2px solid #001427;
    border-radius: 0.8rem;
    background: #708d81;
    font-family: "Roboto";
    color: #fffbd0;
    font-family: "Roboto";
    width: 329px;
    height: 50px;
    font-size: 2rem;
    text-align: center;
  }
  & p {
    color: #bf0603;
    font-family: "Roboto";
  }
`;

export const StyledH1 = styled.h1`
  color: #001427;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
`;

export const StyledDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-around;
`;

export const StyledLabel = styled.label`
  padding: 10px;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: space-around;
`;
export const AnswerBox = styled.div`
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
`;
export const Button = styled.button`
  width: 10.5vw;
`;
