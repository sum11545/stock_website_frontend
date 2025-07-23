import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Utils
const getTodayDate = () => new Date().toISOString().split("T")[0];
const categories = ["BhavCopy"];
const reportTypes = [
  "52WNewHigh",
  "52WNewLow",
  "1MHigh",
  "1MLow",
  "6DTrend",
  "13DTrend",
  "Predict Close Price",
];

const Reports = () => {
  const [category, setCategory] = useState("BhavCopy");
  const [reportType, setReportType] = useState("52WNewHigh");
  const [symbol, setSymbol] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [date, setDate] = useState(getTodayDate());
  const [reportData, setReportData] = useState([]);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (symbol.length > 1) {
      axios
        .get(`https://stocks-website-26e1.onrender.com/symbols?q=${symbol}`)
        .then((res) => setSuggestions(res.data))
        .catch((err) => console.error("Suggestions error:", err));
    } else {
      setSuggestions([]);
    }
  }, [symbol]);

  // Report handlers (same logic)
  const fetchers = {
    "52WNewHigh": async () => {
      const res = await axios.get(
        `https://stocks-website-26e1.onrender.com/bhavCopyReportNew52High/${date}`
      );
      setReportData(res.data.newHighs || []);
      setPredictions([]);
    },
    "52WNewLow": async () => {
      const res = await axios.get(
        `https://stocks-website-26e1.onrender.com/bhavCopyReportNew52Low/${date}`
      );
      setReportData(res.data.newHighs || []);
      setPredictions([]);
    },
    "1MHigh": async () => {
      const res = await axios.get(
        `https://stocks-website-26e1.onrender.com/oneMonthHigh/${date}?SYMBOL=${symbol}`
      );
      setReportData([res.data]);
      setPredictions([]);
    },
    "1MLow": async () => {
      const res = await axios.get(
        `https://stocks-website-26e1.onrender.com/oneMonthLow/${date}?SYMBOL=${symbol}`
      );
      setReportData([res.data]);
      setPredictions([]);
    },
    "6DTrend": async () => {
      const res = await axios.get(
        `https://stocks-website-26e1.onrender.com/6DaysTrend/${date}?SYMBOL=${symbol}`
      );
      setReportData([res.data]);
      setPredictions([]);
    },
    "13DTrend": async () => {
      const res = await axios.get(
        `https://stocks-website-26e1.onrender.com/13DaysTrend/${date}?SYMBOL=${symbol}`
      );
      setReportData([res.data]);
      setPredictions([]);
    },
    "Predict Close Price": async () => {
      const res = await axios.post(
        `https://stocks-website-26e1.onrender.com/predictClosePrice`,
        { symbol, date }
      );
      setPredictions(res.data.predictions || []);
      setReportData([]);
    },
  };

  const handleFetch = async () => {
    if (
      [
        "1MHigh",
        "1MLow",
        "6DTrend",
        "13DTrend",
        "Predict Close Price",
      ].includes(reportType) &&
      (!symbol || !date)
    ) {
      return alert("Enter symbol and date");
    }
    if (["52WNewHigh", "52WNewLow"].includes(reportType) && !date) {
      return alert("Select a date");
    }

    try {
      await fetchers[reportType]();
    } catch (err) {
      console.error(err);
      alert(`Failed to fetch ${reportType}`);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-extrabold mb-6 text-center"
      >
        📊 Stock Reports Dashboard
      </motion.h1>

      {/* Categories */}
      <div className="flex gap-4 flex-wrap justify-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full transition ${
              category === cat ? "bg-blue-600" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Report Types */}
      <div className="flex gap-3 flex-wrap justify-center mb-6">
        {reportTypes.map((type) => (
          <button
            key={type}
            onClick={() => setReportType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              reportType === type
                ? "bg-green-600"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Symbol + Date + Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-6">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="🔍 Search SYMBOL"
            className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-300 outline-none"
          />
          {symbol.length > 1 && suggestions.length > 0 && (
            <ul className="absolute z-20 mt-1 bg-[#223649] w-full border border-[#2e3d4d] rounded max-h-40 overflow-y-auto shadow-lg">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setSymbol(s);
                    setSuggestions([]);
                  }}
                  className="px-3 py-2 hover:bg-blue-600 cursor-pointer"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-3 rounded bg-white/10 text-white outline-none"
        />

        <button
          onClick={handleFetch}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-700 rounded transition"
        >
          {reportType === "Predict Close Price"
            ? "🔮 Predict"
            : "📥 Get Report"}
        </button>
      </div>

      {/* Report Data */}
      {reportData.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          {reportData.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 p-4 rounded-lg shadow hover:shadow-xl max-h-80 overflow-y-auto text-sm"
            >
              <h3 className="text-lg font-bold mb-2 text-center text-blue-400">
                📄 Record {index + 1}
              </h3>
              <div className="space-y-1">
                {Object.entries(item).map(([key, val]) => (
                  <div key={key} className="border-b border-white/10 pb-1">
                    <span className="font-semibold text-white/90">{key}:</span>{" "}
                    <span className="text-white/80">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Prediction Data */}
      {predictions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            🔮 Predicted Close Prices
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {predictions.map((pred, index) => (
              <div
                key={index}
                className="bg-white/10 p-4 rounded-lg shadow hover:shadow-lg"
              >
                <div>
                  <strong className="text-green-300">Label:</strong>{" "}
                  {pred.label}
                </div>
                <div>
                  <strong className="text-yellow-300">Value:</strong>{" "}
                  {pred.value}%
                </div>
                <div>
                  <strong className="text-pink-300">Predicted Price:</strong> ₹
                  {pred.predictedPrice}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Reports;
