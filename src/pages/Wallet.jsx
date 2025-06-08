import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { QRCodeSVG }from "qrcode.react";
import { saveAs } from "file-saver";
import Papa from "papaparse";

export default function Wallet() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: "tx1",
      hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
      created_at: "2025-06-01T12:00:00Z",
    },
    {
      id: "tx2",
      hash: "z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4",
      created_at: "2025-05-28T09:30:00Z",
    },
  ]);

  const dummyPublicKey =
    "GCFX7Q2VJ7O6KYVZL4BXXQG3Z6MKD3XEZQXYT5QX6J5J6YB4HZMYEXAMPLE";
  const dummyBalance = "1234.5678";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setTransactions((prev) => [
        {
          id: `tx${prev.length + 1}`,
          hash: Math.random().toString(36).substring(2, 18),
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setLoading(false);
    }, 1200);
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(transactions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "transactions.csv");
  };

  return (
    <div
      className={`p-6 min-h-screen transition duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-[#5B2C6F]"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lobstr Wallet (Demo)</h1>
        <button
          onClick={() => setDark(!dark)}
          className="bg-[#5B2C6F] text-white px-4 py-2 rounded hover:bg-[#4a235a]"
        >
          Toggle {dark ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <img
          src={`https://api.dicebear.com/7.x/identicon/svg?seed=${dummyPublicKey}`}
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">Welcome back!</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Wallet ending in ...{dummyPublicKey.slice(-6)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Wallet Address */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center">
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
            Wallet Address
          </p>
          <p
            className="font-mono break-words text-center mb-4 select-all"
            title="Wallet Address"
          >
            {dummyPublicKey}
          </p>
          <CopyToClipboard text={dummyPublicKey} onCopy={handleCopy}>
            <button className="bg-[#5B2C6F] hover:bg-[#4a235a] text-white px-4 py-2 rounded transition">
              {copied ? "Copied!" : "Copy Address"}
            </button>
          </CopyToClipboard>
          <div className="mt-6">
            <QRCodeSVG value={dummyPublicKey} size={120} fgColor="#5B2C6F" />
          </div>
        </div>

        {/* Balance */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col justify-center items-center">
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
            XLM Balance
          </p>
          <p
            className={`text-3xl font-bold transition duration-300 ${
              parseFloat(dummyBalance) > 1000
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {dummyBalance} XLM
          </p>
        </div>

        {/* Transactions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Recent Transactions
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className={`text-[#5B2C6F] hover:text-[#3c1e50] font-semibold transition ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
              <button
                onClick={handleExportCSV}
                className="text-blue-600 hover:underline text-sm"
              >
                Export CSV
              </button>
            </div>
          </div>

          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">No transactions.</p>
          ) : (
            <ul className="space-y-3 max-h-64 overflow-y-auto">
              {transactions.map((txn) => (
                <li
                  key={txn.id}
                  className="border-b pb-2 last:border-none break-words"
                >
                  <p className="text-sm font-medium truncate">
                    Hash: {txn.hash.slice(0, 16)}...
                    <CopyToClipboard text={txn.hash} onCopy={() => alert("Hash copied!")}>
                      <button className="text-xs text-blue-600 hover:underline ml-2">
                        Copy
                      </button>
                    </CopyToClipboard>
                  </p>
                  <p className="text-xs text-gray-500">
                    Time: {new Date(txn.created_at).toLocaleString()}
                  </p>
                  <span className="inline-block text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full my-1">
                    Payment
                  </span>
                  <a
                    href={`https://stellar.expert/explorer/public/tx/${txn.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-500 underline text-xs"
                  >
                    View on Stellar Expert
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
