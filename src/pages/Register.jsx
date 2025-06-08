import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (form.name && form.email && form.password) {
      const newUser = { name: form.name, email: form.email };
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/dashboard");
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6ecf8]">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#5B2C6F] text-center">Create Your Account</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-[#FFD700] text-white py-3 rounded font-semibold hover:bg-[#e6c200]"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <button
            className="text-[#5B2C6F] font-medium underline"
            onClick={() => navigate("/login")}
            type="button"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}
