import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./const";
import "./App.css";

function App() {
  const [extractedDetails, setExtractedDetails] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleUpload = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setExtractedDetails("");
  };

  // POST Request to upload the file
  const postData = async (formData) => {
    try {
      setLoading(true);
      setExtractedDetails("");
      const response = await axios.post(`${BASE_URL}upload`, formData);
      setExtractedDetails(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err.message);
      setError("An error occurred while processing the file.");
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!file) {
      alert("Please upload a file");
    } else {
      const formData = new FormData();
      formData.append("file", file);
      postData(formData);
    }
  };

  return (
    <div className="app-container">
      <div className="upload-section">
        <h2>Upload Your Driving License</h2>
        <input type="file" onChange={handleUpload} />
        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {extractedDetails && !loading && (
        <div className="results">
          <h3>Extracted Details:</h3>
          <pre>{extractedDetails}</pre>
        </div>
      )}

      {loading && <div className="loading-message">Loading...</div>}
    </div>
  );
}

export default App;
