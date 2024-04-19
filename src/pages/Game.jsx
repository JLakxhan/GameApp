import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import backgroundGif from '../assets/tomatoes.png'
import Timer from "../components/Timer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,useLocation } from 'react-router-dom';


function Game() {
    const [question, setQuestion] = useState("");
    const [solution, setSolution] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState(0); // Score state
    const navigate = useNavigate();
    const { state } = useLocation();
    const [level, setLevel] = useState(state.level || 'easy');

    const currentLevel = state.level || level; // Default level if none is passed
    const timerDuration = state.time || 120000; // Default to 2 minutes if none is passed

    const toastOptions = {
        position: "bottom-right",
        autoClose: 6000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    } 

    useEffect(() => {

        fetchData();
    }, [level]);

    const fetchData = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/api/game/tomata?level=${currentLevel}`);
          const { question, solution } = response.data;
          setQuestion(question);
          setSolution(solution);
          setUserAnswer("");
      } catch (error) {
          console.error("Error fetching question", error);
      }
  };
    
    const checkAnswer = async (e) => {
        e.preventDefault();
        const correct = parseInt(userAnswer) === parseInt(solution);
        const newScore = correct ? score + 100 : score - 25;
        const user = JSON.parse(localStorage.getItem('chat-app-user'))
        //updateScoreInDatabase(newScore); // Update score in the database
        try {
            const response = await axios.put(
              "http://localhost:5000/api/auth/updateScore",
              { score: newScore ,
                level: level
              },
              {
                headers: { Authorization: `Bearer ${user.token}` },
              }
            );
     
            if (response.status === 200) {
              // Update the local state based on the response
              setScore(newScore);
              if (correct) {
                  toast.success("Correct! Loading next question...", toastOptions);
                  fetchData();
              } else {
                  toast.warning("Incorrect. Try again!", toastOptions);
              }
              setUserAnswer("");  // Clear the user input
          }
          } catch (error) {
            toast.error("Incorrect. Try again!", toastOptions);
            console.error("Error updating score:", error.message);
          }
    };

    const handleTimeout = async () => {
        
        navigate(`/board/${currentLevel}`, { state: { score } });
    };
    

    return (
        <Container>
            <ParentContainer>
                <CenteredDiv>
                    <Timer duration={timerDuration} onTimeout={handleTimeout} />
                    <img src={question} alt="Game Question" />
                    <FormContainer>
                        <form onSubmit={checkAnswer}>
                            <Input
                                type="text"
                                name="solution"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                            />
                            <Button type="submit">Check Answer</Button>
                        </form>
                    </FormContainer>
                </CenteredDiv>
            </ParentContainer>
            <ToastContainer {...toastOptions} />
        </Container>
    );
}
// Styled components remain unchanged...
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  
`;

const Input = styled.input`
  padding: 10px 0px 0px 500px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

// Styled button
const Button = styled.button`
padding: 10px 290px;
font-size: 16px;
background-color: #007bff;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
`;

const Container = styled.div`
height: 100vh;
  width: 100vw;
  
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  align-items: center;
  background-color: #4e5551;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    form{
      button{
        background-color:#0C45C9;
        color:white;
        padding:1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition:0.5s ease-in-out;
        &:hover{
            background-color:#36077d;
        }
    }
   
  }
  }

`;

const ParentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url(${backgroundGif});
  background-size: contain;
`;

const CenteredDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 15px;
`;

export default Game;
