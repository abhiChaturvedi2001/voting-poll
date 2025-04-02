import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
