import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";


import { BrowserRouter,Router,Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
     <CartProvider>
    <App />
  </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
