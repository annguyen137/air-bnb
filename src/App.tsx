import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import "./App.css";
import Home from "pages/Home/Home";
import RoomDetail from "pages/RoomDetail/RoomDetail";
import Login from "pages/Login/Login";
import SignUp from "pages/SignUp/SignUp";
import DetailTemplate from "templates/DetailTemplate/DetailTemplate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeTemplate />}>
        <Route index element={<Home />} />

        <Route path="login" element={<Login />} />

        <Route path="signup" element={<SignUp />} />
      </Route>

      <Route path="rooms/:roomId" element={<DetailTemplate />} />
    </Routes>
  );
}

export default App;
