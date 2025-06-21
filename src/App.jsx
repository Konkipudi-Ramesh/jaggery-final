import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import ManageUsersPage from "./pages/ManageUsersPage";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/manage-users" element={<ManageUsersPage />} />
        {/* Add more routes as needed */}
        
      </Routes>
    </>
  );
}

export default App;
