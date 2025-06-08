import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // if using lucide-react or install one

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const validateEmail = (email) =>
    /\S+@\S+\.\S+/.test(email);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const dummyUser = { name: "Zend User", email: form.email };
      localStorage.setItem("user", JSON.stringify(dummyUser));
      setLoading(false);
      navigate("/dashboard");
    }, 1500); // simulate login delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6ecf8] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#5B2C6F] text-center">
          Login to MoneyX
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          value={form.email}
          onChange={handleChange}
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FFD700] text-white py-3 rounded font-semibold hover:bg-[#e6c200] transition duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <button
            className="text-[#5B2C6F] font-medium underline"
            onClick={() => navigate("/register")}
            type="button"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
}
