// components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-[#CDC6AE] text-center py-6 mt-8 border-t-4 border-[#6E7B7D] shadow-md">
      <p className="text-[#6E7B7D] text-lg">
        © {new Date().getFullYear()} ROS Log Analyzer. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
