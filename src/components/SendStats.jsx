import React from "react";

export default function SendStats() {
  const transactions = [
    { id: 1, amount: "₦50,000", to: "John", status: "Success" },
    { id: 2, amount: "₦120,000", to: "Maria", status: "Pending" },
    { id: 3, amount: "₦33,000", to: "Ahmed", status: "Failed" },
    // Add more dummy data or pull from backend
  ];

  return (
    <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 h-[300px] overflow-y-auto">
      <h2 className="text-md font-bold mb-3 text-gray-700">Send Transactions</h2>
      <ul className="space-y-2">
        {transactions.map(tx => (
          <li key={tx.id} className="p-3 bg-white rounded shadow-sm flex justify-between items-center">
            <span className="text-sm">{tx.amount} → {tx.to}</span>
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
