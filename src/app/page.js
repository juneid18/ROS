'use client'
import React, { useState } from "react";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import FileUpload from "../app/components/FileUpload";
import LogTable from "../app/components/LogTable";
import FilterPanel from "../app/components/FilterPanel";
import { parseLogs } from "../app/utils/logParser";

const Home = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  const handleFileUpload = (file) => {
    parseLogs(file, (parsedLogs) => {
      setLogs(parsedLogs);
      setFilteredLogs(parsedLogs);
    });
  };

  const handleFilterChange = (filters) => {
    const { severity, keyword } = filters;
    const filtered = logs.filter((log) => {
      const matchesSeverity =
        severity.length === 0 || severity.includes(log.severity);
  
      // Check if log.message exists before calling toLowerCase()
      const matchesKeyword =
        keyword === "" ||
        (log.message && log.message.toLowerCase().includes(keyword.toLowerCase()));

      return matchesSeverity && matchesKeyword;
    });
    if (filtered.length === 0 && keyword !== "") {
      alert('No logs match the keyword!');
    }  
    setFilteredLogs(filtered);
  };
  
   

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-background p-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary">ROS Log Analyzer</h1>
          <p className="text-secondary mt-2">Simplify Robot System Diagnostics</p>
        </header>
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          <FilterPanel onFilterChange={handleFilterChange} />
          <div className="lg:col-span-3 space-y-8">
            <FileUpload onUpload={handleFileUpload} />
            {filteredLogs.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Log Viewer</h2>
                <LogTable logs={filteredLogs} />
              </div>
            ) : (
              <p className="text-center text-secondary">No logs to display</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
