import React from 'react'
import styled from 'styled-components';
import backgroundGif from '../assets/tomatoes.png'
import { useNavigate } from 'react-router-dom';

function Path() {

    const navigate =useNavigate();

    const handleLevelSelect = (level, time) => {
        navigate('/game', { state: { level, time } }); // Pass level and time through state
    };

  return (
    <FormContiner>
        <div className='hero'>
            <div className="hero-text">
                <h1>Welcome to LuckSlappy Game !!! </h1>
                <p>Please  select a difficulty level:</p>
                <button className='btn' onClick={() => handleLevelSelect('easy', 70000)}>Easy</button>
                    <button className='btn' onClick={() => handleLevelSelect('medium', 60000)}>Medium</button>
                    <button className='btn' onClick={() => handleLevelSelect('hard', 30000)}>Hard</button>
                </div>
        </div>
    </FormContiner>
  )
}

const FormContiner = styled.div`
    .hero{
        width: 100%;
        min-height: 100vh;
        //background: linear-gradient(rgba(39, 39, 44, 0.7),rgba(8,0,58,0.7)), url(${backgroundGif});
        background: url(${backgroundGif});
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .hero-text{
        text-align: center;
        max-width: 800px;
        padding-top: 70px;
        padding-left: 30px;
        padding-right: 30px;
        height: 100%;
        padding-bottom: 70px;
        border-radius: 2rem;
        background: rgba(255, 255, 255, 0.16);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(6.8px);
        -webkit-backdrop-filter: blur(6.8px);
        border: 1px solid rgba(255, 255, 255, 0.47);
    }
    .hero-text h1{
        font-size:48px;
        font-weight: 500;
        color: black;
    }
    .hero-text p{
        max-width: 700px;
        font-size:40px;
        margin: 10px auto 20px;
        line-height: 1.4;
        color: black;
    }
    .btn{
        background: #730000;
        color: white;
        padding: 14px 25px;
        margin-right: 10px;
        font-size: 26px;
        border-radius: 30px;
        cursor: pointer;
        border: 0;
        outline: 0;
        
    }
    .btn:hover{
        background: #ac0000;
        font-weight: 500;
    }
`

export default Path