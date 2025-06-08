import React from "react";

export default function ReceiveStats() {
  const transactions = [
    { id: 1, amount: "₦70,000", from: "Ada", status: "Success" },
    { id: 2, amount: "₦22,000", from: "James", status: "Success" },
    { id: 3, amount: "₦9,000", from: "Nancy", status: "Pending" },
    // Add more dummy data or pull from backend
  ];

  return (
    <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 h-[300px] overflow-y-auto">
      <h2 className="text-md font-bold mb-3 text-gray-700">Receive Transactions</h2>
      <ul className="space-y-2">
        {transactions.map(tx => (
          <li key={tx.id} className="p-3 bg-white rounded shadow-sm flex justify-between items-center">
            <span className="text-sm">{tx.amount} ← {tx.from}</span>
            <span className={`text-xs px-2 py-1 rounded ${
              tx.status === 'Success' ? 'bg-green-100 text-green-700' :
              tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {tx.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
