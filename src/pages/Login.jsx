import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logoo.png";
import backgroundGif from "../assets/1.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoute";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/path");
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Email and Password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Email and Password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContiner>
        <form onSubmit={(event) => handSubmit(event)}>
          <div className="brand">
            <img src={Logo} />
            <h1>LuckySlappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            min="3"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login User</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContiner>
      <ToastContainer />
    </>
  );
}

const FormContiner = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-image: url(${backgroundGif});
  background-size: cover;
  overflow-y: auto;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-radius: 2rem;
    padding: 3rem 3.5rem;
    background: rgba(255, 255, 255, 0.16);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.8px);
    -webkit-backdrop-filter: blur(7.8px);
    border: 1px solid rgba(255, 255, 255, 0.47);

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #14719f;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #8e5b7e;
        outline: none;
      }
    }
    input::placeholder {
      color: black;
    }

    button {
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
    span {
      color: black;
      text-transform: uppercase;
      a {
        color: #1a79a2;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
