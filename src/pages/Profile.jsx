import React, { useState } from "react";
import { User, Mail, Phone, Calendar, Edit3 } from "lucide-react";

export default function Profile() {
  // Dummy user data
  const initialData = {
    fullName: "David Moenga",
    email: "david.moenga@example.com",
    phone: "+1 (555) 123-4567",
    birthDate: "1990-08-15",
  };

  const [form, setForm] = useState(initialData);
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditToggle = () => {
    setEditing((prev) => !prev);
    setSuccess("");
    if (editing) {
      // If toggling off, reset to initial data (discard changes)
      setForm(initialData);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // For now, just show success message
    setSuccess("✅ Profile updated successfully!");
    setEditing(false);
    // In future, send `form` to backend to save changes
  };

  return (
    <div className="min-h-screen bg-[#F3E8FF] p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#5B2C6F] px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-[#FFD700]" /> Profile
          </h1>
          <button
            onClick={handleEditToggle}
            className="bg-[#FFD700] text-[#5B2C6F] px-4 py-2 rounded-lg hover:bg-[#e6c200] transition flex items-center gap-1"
          >
            <Edit3 className="w-4 h-4" />
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${initialData.fullName}`}
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-[#FFD700]"
            />
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                <User className="w-5 h-5 text-[#5B2C6F]" /> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full border ${
                  editing ? "border-[#FFD700]" : "border-gray-300"
                } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] ${
                  editing ? "" : "bg-gray-50"
                } transition`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#5B2C6F]" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full border ${
                  editing ? "border-[#FFD700]" : "border-gray-300"
                } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] ${
                  editing ? "" : "bg-gray-50"
                } transition`}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#5B2C6F]" /> Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full border ${
                  editing ? "border-[#FFD700]" : "border-gray-300"
                } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] ${
                  editing ? "" : "bg-gray-50"
                } transition`}
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#5B2C6F]" /> Birth Date
              </label>
              <input
                type="date"
                name="birthDate"
                value={form.birthDate || initialData.birthDate}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full border ${
                  editing ? "border-[#FFD700]" : "border-gray-300"
                } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] ${
                  editing ? "" : "bg-gray-50"
                } transition`}
              />
            </div>

            {/* Save Button */}
            {editing && (
              <button
                type="submit"
                className="w-full bg-[#5B2C6F] text-white py-3 rounded-lg font-semibold hover:bg-[#43215A] transition"
              >
                Save Changes
              </button>
            )}
          </form>

          {/* Success Message */}
          {success && (
            <p className="text-center text-green-600 font-medium">{success}</p>
          )}
        </div>
      </div>
    </div>
  );
}
