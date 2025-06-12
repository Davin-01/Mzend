import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdEdit, MdOutlinePassword } from "react-icons/md";
import { BiBell } from "react-icons/bi";

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    username: "johndoe",
    phone: "+1234567890",
    address: "123 Main Street, New York, NY",
    dob: "1990-01-01",
  });

  const handleToggleTheme = () => setDarkMode(!darkMode);
  const handleInputChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const inputStyle =
    "w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"} min-h-screen p-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Profile</h2>
          <button
            onClick={handleToggleTheme}
            className="text-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 p-2 rounded-full"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6"
        >
          <div className="flex items-center space-x-6">
            <img
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              src="https://i.pravatar.cc/100"
              alt="Profile"
            />
            <div>
              <h3 className="text-xl font-semibold">{userData.name}</h3>
              <p className="text-gray-500 dark:text-gray-300">{userData.email}</p>
              <p className="text-sm text-blue-600 mt-1">{userData.role}</p>
            </div>
            <div className="ml-auto space-x-2">
              <button
                onClick={() => setEditOpen(true)}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center space-x-1"
              >
                <MdEdit />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Transactions", value: "128" },
            { label: "Last Login", value: "2025-06-11" },
            { label: "Status", value: "Active" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center"
            >
              <p className="text-sm text-gray-500 dark:text-gray-300">{stat.label}</p>
              <p className="text-xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Personal Info */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {["username", "phone", "address", "dob"].map((key) => (
              <div key={key}>
                <label className="text-gray-600 dark:text-gray-400 capitalize">{key}</label>
                <p className="text-gray-900 dark:text-gray-200">{userData[key]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4">Account Settings</h4>
          <div className="space-y-4 text-sm">
            <button className="w-full bg-gray-100 dark:bg-gray-700 text-left px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2">
              <MdOutlinePassword />
              Change Password
            </button>
            <button className="w-full bg-gray-100 dark:bg-gray-700 text-left px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2">
              <BiBell />
              Notification Preferences
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4">Recent Activity</h4>
          <ul className="text-sm space-y-2">
            <li className="text-gray-700 dark:text-gray-300">🕒 Logged in from Chrome - 2 hours ago</li>
            <li className="text-gray-700 dark:text-gray-300">📥 Downloaded invoice - 1 day ago</li>
            <li className="text-gray-700 dark:text-gray-300">✏️ Updated profile info - 3 days ago</li>
          </ul>
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md z-50 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                className={inputStyle}
                value={userData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
              <input
                type="email"
                name="email"
                className={inputStyle}
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2 text-sm rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
