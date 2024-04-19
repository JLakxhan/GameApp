import React from "react";
import styled from "styled-components";
import backgroundGif from "../assets/1.jpeg";
import { useNavigate } from "react-router-dom";

const First = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // This function hepls to naviagte pages.
    navigate("/login");
  };
  return (
    <FormContiner>
      <div className="hero">
        <div className="hero-text">
          <div className="mycard">
            <h1>Welcome to the LuckySlappy Game</h1>
            <p>Please click PLAY GAME button to start the game </p>
            <button className="btn" onClick={handleNavigate}>
              PLAY GAME
            </button>
          </div>
        </div>
      </div>
    </FormContiner>
  );
};


//using styled Components the Styling is Done.
const FormContiner = styled.div`
  .hero {
    width: 100%;
    min-height: 100vh;
    background: url(${backgroundGif});
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mycard {
    padding-top: 50px;
    height: 100%;
    padding-bottom: 20px;
    border-radius: 2.5rem;
    background: rgba(255, 255, 255, 0.16);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.8px);
    -webkit-backdrop-filter: blur(6.8px);
    border: 1px solid rgba(255, 255, 255, 0.47);
  }
  .hero-text {
    text-align: center;
    max-width: 650px;
    height: 380px;
    color: black;
  }
  .hero-text h1 {
    font-size: 60px;
    font-weight: 600;
  }
  .hero-text p {
    max-width: 700px;
    margin: 10px auto 20px;
    line-height: 1.4;
    font-size: 25px;
  }
  .btn {
    background: #8e5b7e;
    color: #fff;
    padding: 14px 25px;
    font-size: 26px;
    border-radius: 30px;
    cursor: pointer;
    border: 0;
    outline: 0;
  }
  .btn:hover {
    background: #5d1654;
  }
`;

export default First;
