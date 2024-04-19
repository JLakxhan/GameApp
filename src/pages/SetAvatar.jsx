import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Buffer } from 'buffer';
import { setAvatarRoute } from '../utils/APIRoute';
import backgroundGif from '../assets/1.jpeg'

export default function SetAvatar() {
  const api = 'https://api.multiavatar.com/45678945';

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [selectedAvatarURL, setSelectedAvatarURL] = useState('');

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      }
    };

    checkUser();
  }, []);

  /*const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem('chat-app-user'));
      try {
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.img;
          localStorage.setItem('chat-app-user', JSON.stringify(user));
          // Set selected avatar URL
          setSelectedAvatarURL(`data:image/svg+xml;base64, ${avatars[selectedAvatar]}`);
          navigate('/game');
        } else {
          toast.error('Error setting avatar, please try again', toastOptions);
        }
      } catch (error) {
        console.error('Error setting avatar:', error);
        toast.error('Error setting avatar, please try again', toastOptions);
      }
    }
  };*/
 
  const setProfilePicture = async (selectedAvatarIndex) => {
    // Check if avatar is selected based on the passed index
    if (selectedAvatarIndex === undefined) {
      toast.error('Please select an avatar', toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem('chat-app-user'));
      try {
        const imageBase64 = avatars[selectedAvatarIndex];
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: imageBase64,
        });
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image; // Make sure this matches the response attribute
          localStorage.setItem('chat-app-user', JSON.stringify(user));
          setSelectedAvatarURL(`data:image/svg+xml;base64, ${imageBase64}`);
          navigate('/path');
        } else {
          toast.error('Error setting avatar, please try again', toastOptions);
        }
      } catch (error) {
        console.error('Error setting avatar:', error);
        toast.error('Error setting avatar, please try again', toastOptions);
      }
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt='loader' className='loader' />
        </Container>
      ) : (
        <Container>
          <div className="my-container">
          <div className='title-container'>
            <h1>Pick an image as your avatar</h1>
          </div>
          <div className='avatars'>
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar(index)}
                >
                  <img
                    src={`data:image/svg+xml;base64, ${avatar}`}
                    alt={`Avatar ${index}`}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className='submit-btn' onClick={() => setProfilePicture(selectedAvatar)}>
            Set as Profile Picture
          </button>
          </div>
        </Container>
      )}

      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  
  background-image: url(${backgroundGif});
  background-size: cover;
  height: 100vh;
  width: 100vw;
  padding-top: 100px;
  

  .loader {
    max-inline-size: 100%;
  }
  .my-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    gap: 3rem;
    width: 700px;
    height: 500px;
    border-radius: 2.5rem;
    background: rgba(255, 255, 255, 0.16);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.8px);
    -webkit-backdrop-filter: blur(6.8px);
    border: 1px solid rgba(255, 255, 255, 0.47);
  }

  .title-container {
    
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;

      img {
        height: 6rem;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #661b55;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;

    &:hover {
      background-color: #38154b;
    }
  }
`;
