import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/register";
import { AuthProvider } from "./context/auth";
import { LakeProvider } from "./context/lakes";
import Login from "./components/login";
import Logout from "./components/logout";
import reportWebVitals from "./reportWebVitals";

import LandingPage from "./LandingPage";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthProvider>
      <LakeProvider>
        <Routes>
          <Route path="*" element={<LandingPage />} />
          <Route path="/Register" element={<RegisterForm />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </LakeProvider>
    </AuthProvider>
  </Router>
);
reportWebVitals();
