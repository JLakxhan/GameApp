import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Game from "./pages/Game";
import SetAvatar from "./pages/SetAvatar";
/*import Navigation from './components/Navigation'*/
import Socreboard from "./pages/Socreboard";
import First from "./pages/First";
import Board from "./pages/Board";
import { UserProvider } from "./components/UserContext";
import Path from "./pages/Path";

export default function App() {
  return(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/scoreBoard" element={<Socreboard />} />
        <Route path="/" element={<First />} />
        <Route path="/game" element={<Game />} />
        <Route path="/board/:level" element={<Board />} />

        {/* <Route path="/board/easy" render={(props) => <Board {...props} currentLevel="easy" />} />
        <Route path="/board/medium" render={(props) => <Board {...props} currentLevel="medium" />} />
        <Route path="/board/hard" render={(props) => <Board {...props} currentLevel="hard" />} /> */}

        <Route path="/path" element={<Path />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
  );
}
