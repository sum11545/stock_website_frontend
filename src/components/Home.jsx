import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#101a23] text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        📈 Welcome to Stock Insights Dashboard
      </h1>

      <div className="flex gap-6 flex-wrap justify-center">
        <button
          onClick={() => navigate("/reports")}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-md"
        >
          View Reports
        </button>

        <button
          onClick={() => navigate("/uploads")}
          className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition duration-300 shadow-md"
        >
          Upload Data
        </button>
      </div>
    </div>
  );
};

export default Home;
