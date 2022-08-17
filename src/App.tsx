import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import "./App.css";
import Home from "pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeTemplate />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
