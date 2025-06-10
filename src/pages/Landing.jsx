import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Wallet,
  Send,
  RefreshCcw,
  Globe,
} from "lucide-react";

const features = [
  {
    title: "Stellar Wallet Connection",
    desc: "Securely connect and manage your Stellar wallet.",
    icon: <Wallet className="w-8 h-8 text-[#00FFA3]" />,
  },
  {
    title: "Global Send & Receive",
    desc: "Transfer money across borders in seconds.",
    icon: <Send className="w-8 h-8 text-yellow-400" />,
  },
  {
    title: "Real-Time Exchange",
    desc: "Convert currencies at live market rates instantly.",
    icon: <RefreshCcw className="w-8 h-8 text-blue-400" />,
  },
  {
    title: "Multi-Currency Support",
    desc: "Hold, send, and receive multiple fiat & crypto assets.",
    icon: <Globe className="w-8 h-8 text-purple-400" />,
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
      <main className="min-h-screen bg-black text-white font-sans px-6 py-16 pt-27">
        {/* Hero Section */}
        <section
          className="max-w-5xl mx-auto text-center"
          style={{ animation: "fadeIn 1s ease forwards" }}
        >
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            <span className="text-yellow-400">M</span>Zend <br />
            The Fastest Way to Send and Receive <br />
            <span className="text-yellow-400">Crypto & Fiat</span>
          </h1>
          <p className="text-gray-300 mb-10 text-lg max-w-xl mx-auto">
            Experience seamless, secure, and instant cross-border payments
            powered by Stellar.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="Register"
              className="bg-yellow-400 text-black px-8 py-3 rounded font-semibold hover:bg-yellow-300 transition transform hover:scale-105"
            >
              Get Started
            </a>
            <a
              href="LearnMore"
              className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded font-semibold hover:bg-yellow-400 hover:text-black transition transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features */}
       <section
  id="learn-more"
  className="max-w-7xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
>
  {features.map(({ icon, title, desc }, i) => (
    <div
      key={i}
      className="flex flex-col items-center text-center bg-[#1A1A1A] rounded-xl p-6 shadow-lg
                 hover:shadow-yellow-400 hover:scale-105 transition-transform"
      style={{ animation: `fadeIn 0.8s ease forwards`, animationDelay: `${i * 0.25}s` }}
    >
      <div className="mb-5">{icon}</div>
      <h3 className="text-lg font-semibold text-[#00FFA3] mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
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
          <h2 className="text-3xl font-bold mb-4">Ready to start sending and receiving crypto and fiat?</h2>
          <p className="mb-8 max-w-xl mx-auto">
            Join thousands of users already enjoying fast and secure exchange rates.
          </p>
          <a
            href="/Register"
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
