import React, { useEffect, useRef, useState } from "react";

function Sparkline({ data, color = "#00FFA3" }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((point, idx) => {
      const x = (idx / (data.length - 1)) * 100;
      const y = 100 - ((point - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-20 h-8"
      preserveAspectRatio="none"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points={points} />
    </svg>
  );
}

export default function Dashboard() {
  const liveRates = [
    {
      pair: "XLM/USD",
      rate: "0.1234",
      change: "+1.24%",
      trend: [0.12, 0.122, 0.121, 0.123, 0.125, 0.124, 0.123],
    },
    {
      pair: "BTC/USD",
      rate: "28,342.56",
      change: "-0.56%",
      trend: [28350, 28300, 28200, 28350, 28400, 28350, 28342],
    },
    {
      pair: "ETH/USD",
      rate: "1,882.30",
      change: "+0.87%",
      trend: [1850, 1870, 1865, 1880, 1890, 1885, 1882],
    },
    {
      pair: "EUR/USD",
      rate: "1.1023",
      change: "-0.32%",
      trend: [1.10, 1.11, 1.10, 1.11, 1.10, 1.10, 1.10],
    },
  ];

  const transactions = [
    { id: 1, type: "Send", amount: "100 XLM", date: "2025-06-08", status: "Completed" },
    { id: 2, type: "Receive", amount: "50 USD", date: "2025-06-07", status: "Pending" },
    { id: 3, type: "Convert", amount: "200 EUR", date: "2025-06-06", status: "Completed" },
    { id: 4, type: "Send", amount: "0.05 BTC", date: "2025-06-05", status: "Failed" },
  ];

  // Duplicate liveRates to create infinite scroll effect
  const scrollRef = useRef(null);

  useEffect(() => {
    const slider = scrollRef.current;
    let start = 0;
    let reqId;

    function step() {
      start -= 0.5; // Speed of sliding; smaller = slower
      if (Math.abs(start) >= slider.scrollWidth / 2) {
        start = 0; // Reset for infinite loop
      }
      slider.style.transform = `translateX(${start}px)`;
      reqId = requestAnimationFrame(step);
    }

    reqId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(reqId);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-8 py-8 pt-24 sm:pt-24 font-sans select-none">
      {/* Sliding ticker with continuous infinite scroll */}
      <section className="relative overflow-hidden mb-10 pt-2">
        <div
          ref={scrollRef}
          className="flex gap-4 whitespace-nowrap will-change-transform"
          style={{ userSelect: "none" }}
          aria-label="Live currency exchange rates"
        >
          {[...liveRates, ...liveRates].map(({ pair, rate, change, trend }, i) => {
            const isPositive = change.startsWith("+");
            return (
              <div
                key={i}
                className={`inline-block min-w-[220px] bg-[#111111] rounded-lg p-4 shadow-lg
                  flex flex-col items-center text-center
                  hover:scale-105 hover:shadow-yellow-400 transition-transform duration-300 cursor-pointer`}
              >
                <h3 className="text-lg font-semibold mb-1 text-[#00FFA3]">{pair}</h3>
                <div className="text-2xl font-bold mb-1">{rate}</div>
                <span
                  className={`mb-2 font-semibold ${
                    isPositive ? "text-green-400" : "text-red-500"
                  }`}
                >
                  {change}
                </span>
                <Sparkline data={trend} color={isPositive ? "#22c55e" : "#ef4444"} />
              </div>
            );
          })}
        </div>

        {/* Gradient fade overlays on sides */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black"></div>
      </section>

      {/* Main cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div
          className="bg-[#1A1A1A] rounded-xl p-7 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-yellow-400"
          style={{ animation: "fadeInScale 0.9s ease forwards" }}
        >
          <h2 className="text-2xl font-semibold mb-5 text-[#00FFA3]">Currency Converter</h2>
          <p className="text-gray-400 mb-5">
            Convert between multiple fiat and cryptocurrencies instantly.
          </p>
          <div className="flex gap-3 items-center">
            <input
              type="number"
              className="w-full rounded-md bg-black p-3 text-white placeholder-gray-500 focus:outline-yellow-400"
              placeholder="Enter amount"
            />
            <select className="bg-black text-white rounded-md p-3 focus:outline-yellow-400">
              <option>XLM</option>
              <option>USD</option>
              <option>BTC</option>
              <option>ETH</option>
              <option>EUR</option>
            </select>
            <button className="bg-yellow-400 px-5 py-3 rounded font-semibold text-black hover:bg-yellow-300 transition">
              Convert
            </button>
          </div>
        </div>

        <div
          className="bg-[#1A1A1A] rounded-xl p-7 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-yellow-400"
          style={{ animation: "fadeInScale 1.1s ease forwards" }}
        >
          <h2 className="text-2xl font-semibold mb-5 text-[#00FFA3]">Stellar Wallet</h2>
          <p className="text-gray-400 mb-6">
            Access your Stellar account, view balance, send and receive funds globally.
          </p>
          <button className="bg-yellow-400 px-7 py-3 rounded font-semibold text-black hover:bg-yellow-300 transition">
            Connect Wallet
          </button>
        </div>
      </section>

      {/* Transaction Summary */}
      <section className="bg-[#1A1A1A] rounded-xl p-6 shadow-lg max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold text-[#00FFA3] mb-6">Transaction Summary</h3>
        <table className="w-full text-left text-gray-300">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(({ id, type, amount, date, status }) => (
              <tr
                key={id}
                className="border-b border-gray-800 hover:bg-yellow-400/10 transition-colors cursor-default"
              >
                <td className="py-3 px-4">{type}</td>
                <td className="py-3 px-4">{amount}</td>
                <td className="py-3 px-4">{date}</td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    status === "Completed"
                      ? "text-green-400"
                      : status === "Pending"
                      ? "text-yellow-400"
                      : "text-red-500"
                  }`}
                >
                  {status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}
