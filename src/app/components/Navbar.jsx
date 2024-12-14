// components/Navbar.js
import React from "react";
import Link from "next/link";

const Navbar = () => {

  return (
    <nav className="bg-[#CDC6AE] absolute w-full border-4 border-[#6E7B7D] shadow-[6px_6px_0px_#6E7B7D] p-4 mb-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-[#6E7B7D] text-3xl font-black tracking-tight 
          hover:bg-[#6E7B7D] hover:text-white transition-all 
          px-2 py-1 border-4 border-[#6E7B7D] shadow-[4px_4px_0px_#6E7B7D]
          active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#6E7B7D]"
        >
          ROS Log Analyzer
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
