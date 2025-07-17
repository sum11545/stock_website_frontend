import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (!file1 || !date1)
      return alert("Please select file and date for BhavCopy");
    const formData = new FormData();
    formData.append("csvFile", file1);
    formData.append("date", date1);
    try {
      const res = await axios.post(
        "https://stocks-website-26e1.onrender.com/BhavCopyUpload",
        formData
      );
      console.log(res);

      if (res.status === 201) {
        toast.success("BhavCopy Uploaded");
      } else {
        toast.warning(res.data || "Upload issue");
      }
    } catch (err) {
      console.error(err);
      alert("Upload 1 failed!");
    }
  };

  const uploadFile2 = async () => {
    if (!file2 || !date2)
      return alert("Please select file and date for Upload 2");
    const formData = new FormData();
    formData.append("file", file2);
    formData.append("date", date2);
    try {
      await axios.post("https://stocks-website-26e1.onrender.com/Nifty500Upload", formData);
      setDate1("");
      setFile1(null);
      toast.success("Upload Sucess");
    } catch (err) {
      alert("Upload 2 failed!");
    }
  };

  const uploadFile3 = async () => {
    if (!file3 || !date3)
      return alert("Please select file and date for Upload 3");
    const formData = new FormData();
    formData.append("file", file3);
    formData.append("date", date3);
    try {
      await axios.post("https://stocks-website-26e1.onrender.com/AllIndicesUpload", formData);
      toast.success("File uploaded!");
    } catch (err) {
      alert("Upload 3 failed!");
    }
  };

  const uploadFile4 = async () => {
    return toast.warn("This upload will available Soon ");
    if (!file4 || !date4)
      return alert("Please select file and date for Upload 4");
    const formData = new FormData();
    formData.append("file", file4);
    formData.append("date", date4);
    try {
      await axios.post("https://stocks-website-26e1.onrender.com/bseSensexUpload", formData);
      toast.success("File 4 uploaded!");
    } catch (err) {
      alert("Upload 4 failed!");
    }
  };

  // Reset functions
  const reset1 = () => {
    setFile1(null);
    setDate1("");
  };
  const reset2 = () => {
    setFile2(null);
    setDate2("");
  };
  const reset3 = () => {
    setFile3(null);
    setDate3("");
  };
  const reset4 = () => {
    setFile4(null);
    setDate4("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <ToastContainer autoClose="2000" position="top-right" />
      <h1 className="text-2xl font-bold text-center">Equity Upload</h1>

      {/* File 1 */}
      <div className="border p-4 rounded bg-white shadow space-y-2">
        <h2 className="font-semibold">Bhav Copy </h2>
        <input type="file" onChange={(e) => setFile1(e.target.files[0])} />
        <input
          type="date"
          value={date1}
          onChange={(e) => setDate1(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            onClick={uploadFile1}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
          <button
            onClick={reset1}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* File 2 */}
      <div className="border p-4 rounded bg-white shadow space-y-2">
        <h2 className="font-semibold">Nifty 500</h2>
        <input type="file" onChange={(e) => setFile2(e.target.files[0])} />
        <input
          type="date"
          value={date2}
          onChange={(e) => setDate2(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            onClick={uploadFile2}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
          <button
            onClick={reset2}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* File 3 */}
      <div className="border p-4 rounded bg-white shadow space-y-2">
        <h2 className="font-semibold">All Indices</h2>
        <input type="file" onChange={(e) => setFile3(e.target.files[0])} />
        <input
          type="date"
          value={date3}
          onChange={(e) => setDate3(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            onClick={uploadFile3}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
          <button
            onClick={reset3}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* File 4 */}
      <div className="border p-4 rounded bg-white shadow space-y-2">
        <h2 className="font-semibold">Bse Sensex</h2>
        <input type="file" onChange={(e) => setFile4(e.target.files[0])} />
        <input
          type="date"
          value={date4}
          onChange={(e) => setDate4(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            onClick={uploadFile4}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
          <button
            onClick={reset4}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white px-6 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EquityUpload;
