import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

// import { config } from 'dotenv';

// config();

// const script = document.createElement('script');
// script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
// script.setAttribute('async', true);
// script.setAttribute('defer', true);
// document.body.appendChild(script);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
