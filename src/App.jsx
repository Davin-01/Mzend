import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Send from "./pages/Send";
import Receive from "./pages/Receive";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Transactions from "./components/Transactions";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import Exchange from "./pages/Exchange";
import LaunchApp from "./pages/LaunchApp";
import LearnMore from "./pages/LearnMore";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/send" element={<Send />} />
        <Route path="/receive" element={<Receive />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/transactions" element={<Transactions/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/app" element={<LaunchApp />} />
        <Route path="/learnmore" element={<LearnMore />} />
      </Routes>
      <Footer />
    </>
  );
}
