import styled from "styled-components";
import { useState, useEffect } from "react";
import { buttons } from "./data";
import QRCode from "react-qr-code";

export const Logo = styled.div`
  background-image: url("/white.png");
  width: 160px;
  height: 110px;
  background-size: cover;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #35224c;
`;

export const LogoContainer = styled.div`
  width: 100vw;
  height: fit-content;
  display: flex;
  justify-content: center;
  background-color: #35224c;
  margin-top: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 85vw;
  height: fit-content;
  align-self: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 100px;
  margin-top: 100px;
`;

const CongratsContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  align-items: center;
  width: 100vw;
  height: 85vh;
  align-self: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 70px;
  margin-top: 20px;
`;

const ScoreCounter = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 20px;
  top: 20px;
  color: white;
  font-size: 25px;
`;

const TimerCounter = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 20px;
  top: 20px;
  color: white;
  font-size: 25px;
`;

const GameButton = styled.button`
  padding: 15px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  text-align: center;
  transition: all 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25vw;
  height: 25vw;
  padding: 1rem;
  border-radius: 50%;
  border: none;
  background-color: red;
  color: #000;
  transition: all 0.1s ease 0s;
  box-shadow: 0 10px #000;

  &:disabled {
    background-color: grey;
    color: black;
    box-shadow: 0 10px grey;
  }
`;

export const PlayAgain = styled.button`
  background: red;
  color: white;
  width: 100px;
  height: 70px;
  border-radius: 3px;
  padding: 10px;
  border: none;
`;

export default function Home() {
  const [score, setScore] = useState(0);
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(15);
  const [currentButton, setCurrentButton] = useState(0);

  const TimerFunction = () => {
    setTimer(timer - 1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      TimerFunction();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  useEffect(() => {
    const intervalId = setInterval(
      // set number every 5s
      () => {
        setCurrentButton(Math.floor(Math.random() * 5 + 1));
        console.log(Math.floor(Math.random() * 200 + 400));
      },
      Math.floor(Math.random() * 200 + 300),
    );
    return () => {
      clearInterval(intervalId);
    };
  }, [currentButton]);

  return (
    <div style={{ overflow: "hidden", width: "100vw", height: "100vh" }}>
      <Container>
        <LogoContainer>
          <Logo />
        </LogoContainer>

        {timer > 0 ? (
          <ButtonContainer>
            {timer > 0 ? <ScoreCounter>Score: {score}</ScoreCounter> : null}
            {timer > 0 ? <TimerCounter>:{timer}</TimerCounter> : null}
            {buttons.map((but, i) => {
              return (
                <GameButton
                  disabled={currentButton !== but.id}
                  key={but.id}
                  style={{
                    background: `${
                      currentButton === but.id ? but.color : "grey"
                    }`,
                    width: `${but.width}`,
                    justifySelf: `${but.center}`,
                  }}
                  onClick={() => {
                    setScore(score + 1);
                  }}
                />
              );
            })}
          </ButtonContainer>
        ) : (
          <CongratsContainer>
            <h1>Congratulations</h1>
            <p style={{ fontSize: "25px" }}> You Got {score} points</p>
            <p>*Scan the Qr code below to record your points</p>

            <QRCode
              size={1000}
              style={{ height: "200px", width: "300px" }}
              value={`https://dpworld.vercel.app/direct/${score}/3`}
            />

            <PlayAgain
              onClick={() => {
                setTimer(15);
                setScore(0);
              }}>
              Play Again
            </PlayAgain>
          </CongratsContainer>
        )}
      </Container>
    </div>
  );
}
