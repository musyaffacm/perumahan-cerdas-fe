import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Resident from "./pages/resident/Index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="resident">
            <Route path="" element={<Resident />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
