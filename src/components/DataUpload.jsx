import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart4,
  DollarSign,
  CandlestickChart,
  ArrowLeftCircle,
} from "lucide-react";

const DataUpload = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md border border-white/20 text-white text-center"
      >
        <h1 className="text-4xl font-extrabold mb-10">📤 Upload Market Data</h1>

        <div className="space-y-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/equityuploads")}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition shadow-lg"
          >
            <TrendingUp className="w-5 h-5" />
            Equity Upload
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate("derivatives")}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition shadow-lg"
          >
            <BarChart4 className="w-5 h-5" />
            Derivatives Upload
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate("currencies")}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition shadow-lg text-black"
          >
            <DollarSign className="w-5 h-5" />
            Currencies Upload
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate("commodities")}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition shadow-lg"
          >
            <CandlestickChart className="w-5 h-5" />
            Commodities Upload
          </motion.button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-300 hover:text-white transition"
        >
          <ArrowLeftCircle className="w-4 h-4" />
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default DataUpload;
