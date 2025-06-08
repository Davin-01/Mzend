import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    title: "Secure Trading",
    desc: "Advanced security measures to keep your assets safe.",
    icon: (
      <svg
        className="w-8 h-8 text-yellow-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c-2.21 0-4 1.79-4 4v3h8v-3c0-2.21-1.79-4-4-4zM6 7a6 6 0 1112 0 6 6 0 01-12 0z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Global Reach",
    desc: "Trade assets worldwide with low fees and fast transactions.",
    icon: (
      <svg
        className="w-8 h-8 text-yellow-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10 10 10 0 00-10-10zM12 6v6l4 2"
        ></path>
      </svg>
    ),
  },
  {
    title: "Fast & Reliable",
    desc: "Instant deposits and withdrawals with 24/7 support.",
    icon: (
      <svg
        className="w-8 h-8 text-yellow-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        ></path>
      </svg>
    ),
  },
];

// Dummy live exchange data for demo
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
];

// Simple sparkline graph using SVG polyline
function Sparkline({ data, color = "#F3BA2F" }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((point, idx) => {
      // Normalize Y coords (invert y axis)
      const x = (idx / (data.length - 1)) * 100;
      const y = 100 - ((point - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-20 h-10"
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

export default function Landing() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white font-sans px-6 py-16">
        {/* Hero Section */}
       <section
  className="max-w-5xl mx-auto text-center px-4 sm:px-0"
  style={{ animation: "fadeInUp 1s ease forwards" }}
>
  <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight relative inline-block">
    The Fastest Way to Trade <br />
    <span className="text-yellow-400 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent font-extrabold">
      Crypto & Fiat
    </span>
    <span className="absolute left-0 bottom-0 w-16 h-1 bg-yellow-400 rounded-full animate-pulse"></span>
  </h1>
  <p className="text-gray-300 mb-12 text-lg max-w-xl mx-auto sm:text-xl">
    Experience seamless, secure, and instant cross-border payments powered by Stellar.
  </p>
  <div className="flex justify-center gap-6 flex-wrap">
    <a
      href="#get-started"
      className="bg-yellow-400 text-black px-8 py-3 rounded font-semibold
                 hover:bg-yellow-300 hover:shadow-lg transition transform hover:scale-105"
    >
      Get Started
    </a>
    <a
      href="#learn-more"
      className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded font-semibold
                 hover:bg-yellow-400 hover:text-black hover:shadow-lg transition transform hover:scale-105"
    >
      Learn More
    </a>
  </div>

  <style jsx global>{`
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
</section>


        {/* Features */}
        <section
          id="learn-more"
          className="max-w-6xl mx-auto mt-20 flex flex-col sm:flex-row justify-between gap-10"
        >
          {features.map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center max-w-xs mx-auto bg-[#1A1A1A] rounded-lg p-6 shadow-lg hover:shadow-yellow-400 hover:scale-105 transition-transform"
              style={{ animation: `fadeIn 0.8s ease forwards`, animationDelay: `${i * 0.3}s` }}
            >
              <div className="mb-5">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </section>

        {/* Live Exchange Rates */}
        <section className="max-w-6xl mx-auto mt-24">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Live Exchange Rates & Trends
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {liveRates.map(({ pair, rate, change, trend }, i) => {
              const isPositive = change.startsWith("+");
              return (
                <div
                  key={i}
                  className="bg-[#1A1A1A] rounded-lg p-6 shadow-lg hover:shadow-yellow-400 hover:scale-105 transition-transform flex flex-col justify-between"
                  style={{ animation: `fadeIn 0.9s ease forwards`, animationDelay: `${i * 0.3}s` }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{pair}</h3>
                    <span
                      className={`font-semibold ${
                        isPositive ? "text-green-400" : "text-red-500"
                      }`}
                    >
                      {change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-4">{rate}</div>
                  <Sparkline data={trend} color={isPositive ? "#22c55e" : "#ef4444"} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Call To Action Section */}
        <section
          id="get-started"
          className="mt-24 bg-yellow-400 text-black rounded-lg max-w-4xl mx-auto py-12 px-10 text-center shadow-lg hover:shadow-yellow-500 transition"
          style={{ animation: "fadeIn 1s ease forwards", animationDelay: "1.2s" }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to start trading today?</h2>
          <p className="mb-8 max-w-xl mx-auto">
            Join thousands of users already enjoying fast and secure payments.
          </p>
          <a
            href="/signup"
            className="bg-black text-yellow-400 px-10 py-3 rounded font-semibold hover:bg-gray-900 transition transform hover:scale-105"
          >
            Create Account
          </a>
        </section>
      </main>
     

      <style jsx global>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
