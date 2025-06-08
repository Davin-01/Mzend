import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ isLoggedIn }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1
          className="text-4xl font-extrabold tracking-wide drop-shadow-lg"
          onClick={() => window.scrollTo(0, 0)}
        >
         MZend
        </h1>

        {/* Right Side */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-[#5B2C6F] font-medium hover:text-[#FFD700] transition focus:outline-none focus:ring-2 focus:ring-[#FFD700] rounded"
          >
            Home
          </Link>

         {/* <Link
            to="/login"
            className="bg-[#5B2C6F] text-white px-4 py-2 rounded hover:bg-[#472c5f] transition"
         >
            Login
        </Link>
          <Link
              to="/register"
              className="bg-[#FFD700] text-[#5B2C6F] px-4 py-2 rounded hover:bg-[#e6c200] transition"
           >
             Create Account
          </Link> */}
                     

          {/* Profile Icon Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-1 rounded-full text-[#5B2C6F] hover:text-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="User menu"
            >
              <div className="w-10 h-10 rounded-full bg-[#5B2C6F]/20 flex items-center justify-center">
                <FaUserCircle className="w-8 h-8" />
              </div>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <ul
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                role="menu"
                aria-orientation="vertical"
              >
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-[#5B2C6F] hover:bg-[#FFD700] hover:text-white transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-[#5B2C6F] hover:bg-[#FFD700] hover:text-white transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          // handleLogout(); // Optional logout function
                        }}
                        className="w-full text-left px-4 py-2 text-[#5B2C6F] hover:bg-[#FFD700] hover:text-white transition"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-[#5B2C6F] hover:bg-[#FFD700] hover:text-white transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-[#5B2C6F] hover:bg-[#FFD700] hover:text-white transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Create Account
                      </Link>
                      <Link
                        to="/#"
                        className="block px-4 py-2 text-[#5B2C6F] hover:bg-[#FFD700] hover:text-white transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
