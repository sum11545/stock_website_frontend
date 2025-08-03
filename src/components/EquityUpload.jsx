import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FileUp,
  CalendarDays,
  Trash2,
  UploadCloud,
  FileCheck2,
  FileX2,
  ArrowLeftCircle,
} from "lucide-react";

const UploadCard = ({
  title,
  file,
  setFile,
  date,
  setDate,
  onUpload,
  onReset,
  disabled,
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
}) => (
  <div className="p-6 rounded-xl shadow-xl space-y-4 bg-gray-800 text-gray-100 hover:shadow-2xl transition-shadow duration-300">
    <div className="flex items-center gap-3">
      <Icon className="text-teal-400" />
      <h2 className="font-bold text-xl">{title}</h2>
    </div>

    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm text-gray-300">
        <FileUp size={16} className="text-blue-400" />
        Select CSV File:
      </label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="bg-gray-700 border border-gray-600 text-white p-2 rounded"
      />
      {file && (
        <p className="text-sm text-green-400 font-medium">
          <FileCheck2 size={16} className="inline-block mr-1" />
          {file.name}
        </p>
      )}

      <label className="flex items-center gap-2 text-sm text-gray-300 mt-2">
        <CalendarDays size={16} className="text-blue-400" />
        Select Date:
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-gray-700 border border-gray-600 text-white p-2 rounded"
      />
    </div>

    <div className="flex gap-4 pt-2">
      <button
        onClick={onUpload}
        className={`flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      >
        <UploadCloud size={18} />
        Upload
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
      >
        <Trash2 size={18} />
        Cancel
      </button>
    </div>
  </div>
);

const EquityUpload = () => {
  const navigate = useNavigate();

  const [file1, setFile1] = useState(null);
  const [date1, setDate1] = useState("");

  const [file2, setFile2] = useState(null);
  const [date2, setDate2] = useState("");

  const [file3, setFile3] = useState(null);
  const [date3, setDate3] = useState("");

  const [file4, setFile4] = useState(null);
  const [date4, setDate4] = useState("");

  const uploadFile1 = async () => {
    if (!file1 || !date1) return;
    const formData = new FormData();
    formData.append("csvFile", file1);
    formData.append("date", date1);
    try {
      const res = await axios.post(
        "https://stocks-website-26e1.onrender.com/BhavCopyUpload",
        formData
      );
      toast.success(
        res.status === 201 ? "BhavCopy Uploaded" : res.data || "Upload issue"
      );
    } catch (err) {
      toast.error("Upload 1 failed!", err);
    }
  };

  const uploadFile2 = async () => {
    if (!file2 || !date2) return;
    const formData = new FormData();
    formData.append("file", file2);
    formData.append("date", date2);
    try {
      await axios.post(
        "https://stocks-website-26e1.onrender.com/Nifty500Upload",
        formData
      );
      toast.success("Nifty 500 Uploaded");
    } catch (err) {
      toast.error("Upload 2 failed!", err);
    }
  };

  const uploadFile3 = async () => {
    if (!file3 || !date3) return;
    const formData = new FormData();
    formData.append("file", file3);
    formData.append("date", date3);
    try {
      await axios.post(
        "https://stocks-website-26e1.onrender.com/AllIndicesUpload",
        formData
      );
      toast.success("All Indices Uploaded");
    } catch (err) {
      toast.error("Upload 3 failed!", err);
    }
  };

  const uploadFile4 = async () => {
    toast.warn("BSE Sensex Upload Coming Soon");
    return;
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 p-8">
      <ToastContainer autoClose={2000} position="top-right" />
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        📊 Equity Upload Portal
      </h1>

      <div className="max-w-4xl mx-auto space-y-10">
        <UploadCard
          title="Bhav Copy Upload"
          file={file1}
          setFile={setFile1}
          date={date1}
          setDate={setDate1}
          onUpload={uploadFile1}
          onReset={() => {
            setFile1(null);
            setDate1("");
          }}
          disabled={!file1 || !date1}
          icon={FileUp}
        />

        <UploadCard
          title="Nifty 500 Upload"
          file={file2}
          setFile={setFile2}
          date={date2}
          setDate={setDate2}
          onUpload={uploadFile2}
          onReset={() => {
            setFile2(null);
            setDate2("");
          }}
          disabled={!file2 || !date2}
          icon={FileUp}
        />

        <UploadCard
          title="All Indices Upload"
          file={file3}
          setFile={setFile3}
          date={date3}
          setDate={setDate3}
          onUpload={uploadFile3}
          onReset={() => {
            setFile3(null);
            setDate3("");
          }}
          disabled={!file3 || !date3}
          icon={FileUp}
        />

        <UploadCard
          title="BSE Sensex Upload"
          file={file4}
          setFile={setFile4}
          date={date4}
          setDate={setDate4}
          onUpload={uploadFile4}
          onReset={() => {
            setFile4(null);
            setDate4("");
          }}
          disabled={!file4 || !date4}
          icon={FileX2}
        />

        <div className="text-center pt-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mx-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow"
          >
            <ArrowLeftCircle size={20} />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquityUpload;
