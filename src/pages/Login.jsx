// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin toggle
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // New state for name input
  const [password, setPassword] = useState("");

  const { currentUser , login, signup } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect logged-in users to the appropriate page
  useEffect(() => {
    if (currentUser ) {
      navigate(isAdmin ? "/manage-users" : "/cart");
    }
  }, [currentUser , navigate, isAdmin]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Login/Signup form submitted");

  try {
    if (isLogin) {
      await login(email, password);
    } else {
      // Ensure name is provided when signing up
      const name = "User Name"; // Replace with the actual name input from your form
      await signup(email, password, name, isAdmin);
    }
    navigate(isAdmin ? "/manage-users" : "/dashboard");
  } catch (error) {
    alert(`${isLogin ? "Login" : "Signup"} failed: ` + error.message);
  }
};


  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 hidden md:block">
        <img
          src="https://c8.alamy.com/comp/2H6PKHN/jaggery-powder-and-sugarcane-isolated-on-white-background-jaggery-is-used-as-an-ingredient-in-sweet-and-savoury-dishes-in-the-cuisines-of-india-2H6PKHN.jpg"
          alt="Visual"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-yellow-50">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-yellow-800">
            {isLogin ? (isAdmin ? "Admin Login" : "Welcome Back") : "Create Account"}
          </h2>
          <input
  type="text"
  placeholder="Name"
  className="w-full p-3 border rounded-xl outline-none"
  value={name} // Ensure you have a state for name
  onChange={(e) => setName(e.target.value)} // Update state on change
  required
/>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold p-3 rounded-xl"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <div className="flex justify-between">
            <label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              Admin
            </label>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-700 underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </div>

          <p className="text-sm text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-700 underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
