import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-50 bg-[#0B0F1A] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* <div className="text-2xl font-bold text-white">MZend</div> */}
        {/* <ul className="hidden md:flex gap-8 text-[#FFD966] font-medium"> */}
        <ul className="hidden md:flex gap-8 text-[#FFD966] font-medium">
          <li><a href="/" className="hover:text-white">Home</a></li>
        </ul>
          
          {/* <li><a href="#exchange" className="hover:text-white">Exchange</a></li>
          <li><a href="#how" className="hover:text-white">How It Works</a></li>
          <li><a href="#wallet" className="hover:text-white">Wallet</a></li>
          <li><a href="/login" className="hover:text-white">Login</a></li> */}
        {/* </ul> */}
        <a
          href="/app"
          className="bg-[#FFD966] text-[#1A0A3D] px-5 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
        >
          Launch App
        </a>
      </div>
    </nav>
  );
}
