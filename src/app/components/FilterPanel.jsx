import React, { useState } from "react";

const FilterPanel = ({ onFilterChange }) => {
  const [severity, setSeverity] = useState([]);
  const [keyword, setKeyword] = useState("");

  // Update severity filter
  const handleSeverityChange = (e) => {
    const value = e.target.value;
    setSeverity((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Notify parent on any filter change
  const applyFilters = () => {
    onFilterChange({
      severity,
      keyword,
    });
  };

  return (
    <div className="bg-[#CDC6AE] p-6 rounded-lg shadow-lg w-full h-[34vh] max-w-md mx-auto">
      <h3 className="text-2xl font-semibold text-[#6E7B7D] mb-6">Filters</h3>

      {/* Severity Filter */}
      <div className="mb-6">
        <label className="block text-lg text-[#6E7B7D] font-medium mb-3">
          Severity
        </label>
        <div className="flex gap-4">
          {["INFO", "WARN", "ERROR"].map((level) => (
            <label key={level} className="flex items-center text-lg cursor-pointer">
              <input
                type="checkbox"
                value={level}
                checked={severity.includes(level)}
                onChange={handleSeverityChange}
                className="mr-2"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      {/* Keyword Search */}
      <div className="mb-6">
        <label className="block text-lg text-[#6E7B7D] font-medium mb-3">
          Keyword
        </label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full p-3 border-2 border-[#6E7B7D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6E7B7D] placeholder:text-[#6E7B7D]"
          placeholder="Search by keyword"
        />
      </div>

      {/* Apply Button */}
      <div className="text-center mt-6">
        <button
          onClick={applyFilters}
          className="px-6 py-2 bg-[#6E7B7D] text-white rounded-full hover:bg-[#A3B4A2] transition-all"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
