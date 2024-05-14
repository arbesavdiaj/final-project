import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/register";
import Login from "./components/login";
import reportWebVitals from "./reportWebVitals";
import LandingPage from "./LandingPage";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/Register" element={<RegisterForm />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  </Router>
);
reportWebVitals();
