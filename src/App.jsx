import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DataUpload from "./components/DataUpload";
import Reports from "./components/Reports";
import EquityUpload from "./components/EquityUpload";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploads" element={<DataUpload />} />
          <Route path="/equityuploads" element={<EquityUpload />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
