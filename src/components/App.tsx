import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./About/About";
import Bucket from "./Bucket/Bucket";
import Dashboard from "./Dashboard/Dashboard";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Nav from "./Nav/Nav";
import PasswordReset from "./PasswordReset/PasswordReset";
import Register from "./Register/Register";
import Settings from "./Settings/Settings";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bucket" element={<Bucket />} />
          <Route path="/register" element={<Register />} />
          <Route path="/passwordReset" element={<PasswordReset />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
