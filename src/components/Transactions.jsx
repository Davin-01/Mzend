import React, { useState } from "react";
import { Search, Filter, RefreshCw } from "lucide-react";

export default function Transactions() {
  // Sample transaction data
  const sampleTxns = [
    {
      id: "1",
      type: "sent",
      counterparty: "James Mwangi",
      amount: 250,
      currency: "USD",
      date: "2025-06-02T10:15:00Z",
      method: "Mobile Money",
    },
    {
      id: "2",
      type: "received",
      counterparty: "Alice Smith",
      amount: 500,
      currency: "USD",
      date: "2025-06-01T14:30:00Z",
      method: "Bank Transfer",
    },
    {
      id: "3",
      type: "sent",
      counterparty: "Market Vendor",
      amount: 120,
      currency: "USD",
      date: "2025-05-31T09:00:00Z",
      method: "Lumens (XLM)",
    },
    {
      id: "4",
      type: "received",
      counterparty: "Bob Johnson",
      amount: 75,
      currency: "USD",
      date: "2025-05-29T16:20:00Z",
      method: "Mobile Money",
    },
    // Add more as needed
  ];

  const [transactions, setTransactions] = useState(sampleTxns);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter and search logic
  const filteredTxns = transactions
    .filter((txn) => {
      if (filterType === "all") return true;
      return txn.type === filterType;
    })
    .filter((txn) =>
      txn.counterparty.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Summary stats
  const totalSent = transactions
    .filter((t) => t.type === "sent")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalReceived = transactions
    .filter((t) => t.type === "received")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalTxns = transactions.length;

  return (
    <div className="min-h-screen bg-[#F3E8FF] p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#5B2C6F] rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Transaction History</h1>
          <button
            onClick={() => setTransactions(sampleTxns)}
            className="flex items-center gap-2 bg-[#FFD700] text-[#5B2C6F] px-4 py-2 rounded-lg hover:bg-[#e6c200] transition"
          >
            <RefreshCw className="w-5 h-5" /> Refresh
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
            <p className="text-sm text-gray-500">Total Transactions</p>
            <p className="text-3xl font-bold text-[#5B2C6F]">{totalTxns}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
            <p className="text-sm text-gray-500">Total Sent</p>
            <p className="text-3xl font-bold text-red-500">-${totalSent}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
            <p className="text-sm text-gray-500">Total Received</p>
            <p className="text-3xl font-bold text-green-600">+${totalReceived}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by counterparty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
            >
              <option value="all">All Transactions</option>
              <option value="sent">Sent</option>
              <option value="received">Received</option>
            </select>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-xl shadow p-5 overflow-x-auto">
          {filteredTxns.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No transactions found.
            </p>
          ) : (
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="px-4 py-2 text-sm text-gray-500">Date</th>
                  <th className="px-4 py-2 text-sm text-gray-500">Type</th>
                  <th className="px-4 py-2 text-sm text-gray-500">Counterparty</th>
                  <th className="px-4 py-2 text-sm text-gray-500">Method</th>
                  <th className="px-4 py-2 text-sm text-gray-500 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTxns.map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {new Date(txn.date).toLocaleDateString()}{" "}
                      <span className="text-gray-400 text-xs">
                        {new Date(txn.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          txn.type === "sent"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {txn.counterparty}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {txn.method}
                    </td>
                    <td
                      className={`px-4 py-3 text-sm font-medium text-right ${
                        txn.type === "sent" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {txn.type === "sent" ? "-" : "+"}${txn.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
