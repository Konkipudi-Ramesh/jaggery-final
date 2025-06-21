import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-5xl font-extrabold text-yellow-800 mb-4">
        Welcome to JaggeryStore
      </h1>
      <p className="text-yellow-700 text-lg mb-8 max-w-xl">
        Discover a range of authentic and healthy jaggery products directly from our farms. Taste the tradition, sweetness, and health benefits in every bite.
      </p>
      <Link
        to="/dashboard"
        className="bg-yellow-700 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-yellow-800 transition duration-300"
      >
        Explore Varieties
      </Link>
    </div>
  );
}