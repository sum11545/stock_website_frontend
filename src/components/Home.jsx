import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, UploadCloud } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center border border-white/20"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 leading-tight">
          📊 Stock Insights Dashboard
        </h1>

        <p className="text-gray-200 text-md mb-10">
          Analyze trends, view reports, and upload market data with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/reports")}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            <BarChart3 className="w-5 h-5" />
            View Reports
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/uploads")}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition duration-300 shadow-lg"
          >
            <UploadCloud className="w-5 h-5" />
            Upload Data
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
