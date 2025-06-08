import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { FaMoneyBillWave, FaArrowDown, FaListUl, FaBars } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Dashboard() {
  
  const user = {
    name: "David Moenga",
  };

  const supportedCountries = [
    { name: "Kenya", flag: "🇰🇪", description: "M-Pesa transfers supported" },
    { name: "Nigeria", flag: "🇳🇬", description: "Instant Naira payouts" },
    { name: "Ghana", flag: "🇬🇭", description: "MTN Mobile Money enabled" },
    { name: "USA", flag: "🇺🇸", description: "Send to USD accounts" },
    { name: "UK", flag: "🇬🇧", description: "GBP bank transfer" },
  ];

  const recentTransactions = [
    { id: 1, name: "Transfer to James", amount: "-$250.00", date: "June 2" },
    { id: 2, name: "Received from Alice", amount: "+$500.00", date: "June 1" },
    { id: 3, name: "Transfer to Market", amount: "-$120.00", date: "May 31" },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const filteredTransactions = recentTransactions.filter(txn =>
    txn.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f6ecf8] text-[#5B2C6F]">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl font-bold">MZend</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`w-full md:w-64 bg-white shadow-md p-6 md:block ${sidebarOpen ? "block" : "hidden"}`}>
        <nav className="flex flex-col gap-4 text-lg">
          <Link to="/dashboard" className="hover:text-[#FFD700]">Dashboard</Link>
          <Link to="/wallet" className="hover:text-[#FFD700]">Wallet</Link>
          <Link to="/send" className="hover:text-[#FFD700]">Send Money</Link>
          <Link to="/receive" className="hover:text-[#FFD700]">Receive Money</Link>
          <Link to="/transactions" className="hover:text-[#FFD700]">Transactions</Link>
          <Link to="/profile" className="hover:text-[#FFD700]">Profile</Link>
          {/* <Link to="/settings" className="hover:text-[#FFD700]">Settings</Link> */}
          <Link to="/support" className="hover:text-[#FFD700]">Support</Link>
          <Link to="/logout" className="mt-6 text-red-500 hover:text-red-700">Logout</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">{getGreeting()}, {user.name} 👋</h2>
            <p className="text-[#2E0854] mt-1">Explore your remittance options.</p>
          </div>
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Sent</p>
            <p className="text-2xl font-bold text-red-500">-$370.00</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Received</p>
            <p className="text-2xl font-bold text-green-600">+$500.00</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-2xl font-bold text-[#5B2C6F]">$130.00</p>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/send" className="bg-[#FFD700] text-[#5B2C6F] px-6 py-3 rounded-xl font-semibold shadow hover:bg-[#e6c200] transition flex items-center gap-2">
              <FaMoneyBillWave /> Send Money
            </Link>
            <Link to="/receive" className="bg-[#5B2C6F] text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-[#3c1e50] transition flex items-center gap-2">
              <FaArrowDown /> Receive Money
            </Link>
            <Link to="/transactions" className="bg-white border border-[#5B2C6F] text-[#5B2C6F] px-6 py-3 rounded-xl font-semibold shadow hover:bg-[#f9f3fc] transition flex items-center gap-2">
              <FaListUl /> View Transactions
            </Link>
          </div>
        </section>

        {/* Country Carousel */}
        

        {/* Recent Transactions */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <input
            type="text"
            placeholder="Search transactions..."
            className="mb-4 p-2 border rounded w-full md:w-1/2"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="bg-white rounded-xl shadow p-5 space-y-4">
            {filteredTransactions.map(txn => (
              <div key={txn.id} className="flex justify-between items-center border-b pb-2 last:border-none">
                <div>
                  <p className="font-medium">{txn.name}</p>
                  <p className="text-sm text-gray-500">{txn.date}</p>
                </div>
                <p className={`font-semibold ${txn.amount.startsWith('-') ? 'text-red-500' : 'text-green-600'}`}>
                  {txn.amount}
                </p>
              </div>
            ))}
            {filteredTransactions.length === 0 && (
              <p className="text-center text-gray-500">No recent activity yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
