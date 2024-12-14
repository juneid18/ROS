// components/FileUpload.js
import React, { useState } from "react";

const FileUpload = ({ onUpload }) => {
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Allowed extensions
    const validExtensions = [".json", ".log", ".txt"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    // Check if the extension is valid
    if (!validExtensions.includes(`.${fileExtension}`)) {
      setError("Unsupported file type. Please upload .json, .log, or .txt files.");
      return;
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Maximum allowed size is 5MB.");
      return;
    }

    setError(null);
    setIsUploading(true);

    // Simulate file upload or process immediately
    setTimeout(() => {
      onUpload(file);
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="bg-[#CDC6AE] p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <label className="block text-[#6E7B7D] text-lg font-semibold mb-4">
        Upload Logs
      </label>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileUpload}
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer px-6 py-3 bg-[#6E7B7D] text-white rounded-lg hover:bg-[#A3B4A2] transition-all"
      >
        Choose File
      </label>
      {isUploading && <p className="mt-4 text-[#6E7B7D]">Uploading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default FileUpload;
