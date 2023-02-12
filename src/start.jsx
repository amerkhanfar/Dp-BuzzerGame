import styled from "styled-components";
import { useState, useEffect } from "react";
import { buttons } from "./data";
import { Outlet, Link } from "react-router-dom";
import QRCode from "react-qr-code";

export const Logo = styled.div`
  background-image: url("/white.png");
  width: 300px;
  height: 200px;
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
  height: 40vh;
  align-self: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 70px;
margin-top: 150px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: none;
`;

export default function Start() {

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
    <div style={{ overflow: "hidden" }}>
      <Container>
        <LogoContainer>
          <Logo />
        </LogoContainer>

        <CongratsContainer>
            <h1 style={{fontSize:'50px'}}>Are You Fast Enough?</h1>

            <p>*Hit The Buttons As Soon As they Light Up</p>


            <Link style={{textDecoration:'none'}} to="/game">
            <PlayAgain
              onClick={() => {
                setTimer(15);

              }}>
<p style={{fontSize:'20px'}}>START</p>
            </PlayAgain>
            </Link>
          </CongratsContainer>



      </Container>
    </div>
  );
}
