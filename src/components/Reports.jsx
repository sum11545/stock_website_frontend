import React, { useState, useEffect } from "react";
import axios from "axios";

// Utility function to get today's date
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

  // Fetch suggestions as user types
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

  // Report fetch handlers
  const fetch52WNewHigh = async () => {
    if (!date) return alert("Select a date");
    try {
      const res = await axios.get(
        `https://stocks-website-26e1.onrender.com/bhavCopyReportNew52High/${date}`
      );
      setReportData(res.data.newHighs || []);
      setPredictions([]);
    } catch (err) {
      alert("Failed to fetch 52W New High");
      console.error(err);
    }
  };

  const fetch52WNewLow = async () => {
    if (!date) return alert("Select a date");
    try {
      const res = await axios.get(
        `https://stocks-website-26e1.onrender.com/bhavCopyReportNew52Low/${date}`
      );
      setReportData(res.data.newHighs || []);
      setPredictions([]);
    } catch (err) {
      alert("Failed to fetch 52W New Low");
      console.error(err);
    }
  };

  const fetch1MHigh = async () => {
    if (!symbol || !date) return alert("Enter symbol and date");
    try {
      const res = await axios.get(
        `https://stocks-website-26e1.onrender.com/oneMonthHigh/${date}?SYMBOL=${symbol}`
      );
      setReportData([res.data]);
      setPredictions([]);
    } catch (err) {
      alert("Failed to fetch 1M High");
      console.error(err);
    }
  };

  const fetch1MLow = async () => {
    if (!symbol || !date) return alert("Enter symbol and date");
    try {
      const res = await axios.get(
        `https://stocks-website-26e1.onrender.com/oneMonthLow/${date}?SYMBOL=${symbol}`
      );
      setReportData([res.data]);
      setPredictions([]);
    } catch (err) {
      alert("Failed to fetch 1M Low");
      console.error(err);
    }
  };

  const fetch6DTrend = async () => {
    if (!symbol || !date) return alert("Enter symbol and date");
    try {
      const res = await axios.get(
        `https://stocks-website-26e1.onrender.com/6DaysTrend/${date}?SYMBOL=${symbol}`
      );
      setReportData([res.data]);
      setPredictions([]);
    } catch (err) {
      alert("Failed to fetch 6D Trend");
      console.error(err);
    }
  };

  const fetch13DTrend = async () => {
    if (!symbol || !date) return alert("Enter symbol and date");
    try {
      const res = await axios.get(
        `https://stocks-website-26e1.onrender.com/13DaysTrend/${date}?SYMBOL=${symbol}`
      );
      setReportData([res.data]);
      setPredictions([]);
    } catch (err) {
      alert("Failed to fetch 13D Trend");
      console.error(err);
    }
  };

  const predictClosePrice = async () => {
    if (!symbol || !date) return alert("Enter symbol and date");
    try {
      const res = await axios.post(
        "https://stocks-website-26e1.onrender.com/predictClosePrice",
        {
          symbol,
          date,
        }
      );
      setPredictions(res.data.predictions || []);
      setReportData([]);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    }
  };

  const reportHandlerMap = {
    "52WNewHigh": fetch52WNewHigh,
    "52WNewLow": fetch52WNewLow,
    "1MHigh": fetch1MHigh,
    "1MLow": fetch1MLow,
    "6DTrend": fetch6DTrend,
    "13DTrend": fetch13DTrend,
    "Predict Close Price": predictClosePrice,
  };

  return (
    <div className="p-4 bg-[#101a23] text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📊 Stock Reports Dashboard</h1>

      {/* Category Selection */}
      <div className="flex gap-4 flex-wrap mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 rounded ${
              category === cat ? "bg-blue-600" : "bg-[#223649]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Report Type Selection */}
      <div className="flex gap-3 flex-wrap mb-4">
        {reportTypes.map((type) => (
          <button
            key={type}
            onClick={() => setReportType(type)}
            className={`px-3 py-1 rounded ${
              reportType === type ? "bg-green-600" : "bg-[#223649]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Symbol Search + Date Input */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Search SYMBOL"
            className="p-2 w-full rounded bg-[#223649] text-white"
          />
          {symbol.length > 1 && suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 bg-[#223649] w-full border border-[#2e3d4d] rounded max-h-40 overflow-y-auto shadow-lg">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setSymbol(s);
                    setSuggestions([]);
                  }}
                  className="px-3 py-2 hover:bg-blue-600 cursor-pointer text-white"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-4 flex-wrap">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 rounded bg-[#223649] text-white"
          />
          <button
            onClick={reportHandlerMap[reportType]}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
          >
            {reportType === "Predict Close Price" ? "Predict" : "Get Report"}
          </button>
        </div>
      </div>

      {/* Report Data Results */}
      {reportData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reportData.map((item, index) => (
            <div
              key={index}
              className="bg-[#223649] p-4 rounded shadow hover:shadow-lg"
            >
              {Object.entries(item).map(([key, val]) => (
                <div key={key} className="text-sm">
                  <strong>{key}:</strong> {String(val)}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Prediction Results */}
      {predictions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">🔮 Predicted Stock Prices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {predictions.map((pred, index) => (
              <div
                key={index}
                className="bg-[#2e3d4d] p-4 rounded shadow hover:shadow-xl"
              >
                <div>
                  <strong>Label:</strong> {pred.label}
                </div>
                <div>
                  <strong>Value:</strong> {pred.value}%
                </div>
                <div>
                  <strong>Predicted Price:</strong> ₹{pred.predictedPrice}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
