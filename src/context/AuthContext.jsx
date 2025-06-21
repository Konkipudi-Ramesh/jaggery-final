// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, // Corrected function name
  signOut,
} from "firebase/auth";
import { app } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();
const db = getFirestore(app);

export function AuthProvider({ children }) {
  const auth = getAuth(app);
  const [currentUser , setUser ] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser );
    return () => unsubscribe();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signup = async (email, password, name, isAdmin = false) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Corrected function name
      const user = userCredential.user;

      // Check if name is defined
      if (!name) {
        throw new Error("Name is required.");
      }

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name, // Ensure name is defined
        role: isAdmin ? "admin" : "user", // Set role based on isAdmin flag
        createdAt: new Date(),
      });

      console.log("User  signed up and data saved:", user.uid);
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Signup failed: " + error.message);
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser , login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
