import React from "react";
import { useNavigate } from "react-router-dom";

const DataUpload = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
        <h1 className="text-3xl font-bold mb-4">Upload Section</h1>

        <button
          onClick={() => navigate("/equityuploads")}
          className="bg-blue-500 text-white px-6 py-3 rounded w-60"
        >
          Equity
        </button>
        <button
          onClick={() => handleNavigate("derivatives")}
          className="bg-green-500 text-white px-6 py-3 rounded w-60"
        >
          Derivatives
        </button>
        <button
          onClick={() => handleNavigate("currencies")}
          className="bg-yellow-500 text-white px-6 py-3 rounded w-60"
        >
          Currencies
        </button>
        <button
          onClick={() => handleNavigate("commodities")}
          className="bg-purple-500 text-white px-6 py-3 rounded w-60"
        >
          Commodities
        </button>
      </div>
    </>
  );
};

export default DataUpload;
