import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Home as HomeIcon } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // ✅ Make sure this is imported

export default function Navbar() {
  const { cart } = useCart();
  const { currentUser, logout } = useAuth(); // ✅ Extract currentUser here

  return (
    <nav className="bg-yellow-100 shadow-md py-4 px-8 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold text-yellow-800 hover:text-yellow-600"
      >
        JaggeryStore
      </Link>

      <div className="flex gap-6 text-yellow-700 text-lg">
        <Link to="/" className="hover:text-yellow-900 flex items-center gap-1">
          <HomeIcon size={20} /> Home
        </Link>

        <Link
          to="/cart"
          className="relative flex items-center gap-1 hover:text-yellow-900"
        >
          <ShoppingCart size={20} />
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        <Link
          to="/dashboard"
          className="hover:text-yellow-900 flex items-center gap-1"
        >
          Dashboard
        </Link>

        {/* ✅ Show user info and logout if logged in */}
        {currentUser ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-yellow-900">{currentUser.email}</span>
            <button
              onClick={logout}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="hover:text-yellow-900 flex items-center gap-1"
          >
            <User size={20} /> Profile
          </Link>
        )}
      </div>
    </nav>
  );
}
