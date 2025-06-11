/* src/pages/Dashboard.jsx */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  Send,
  ArrowDownCircle,
  Bell,
  Sun,
  Moon,
  Repeat,
  Download,
  CreditCard,
  Banknote,
} from "lucide-react";
import clsx from "clsx";

/* ───────────────── FAKE RATES ───────────────── */
const RATES = [
  { pair: "KES / USD", rate: 0.0072, change: +0.34 },
  { pair: "USD / KES", rate: 139.0, change: -0.28 },
  { pair: "KES / NGN", rate: 5.11, change: +0.12 },
  { pair: "NGN / KES", rate: 0.196, change: -0.08 },
  { pair: "KES / USDC", rate: 0.0071, change: 0.0 },
];

export default function Dashboard() {
  /* slider */
  const track = useRef(null);
  useEffect(() => {
    const el = track.current;
    let x = 0;
    let raf;
    const loop = () => {
      x -= 0.6;
      if (Math.abs(x) >= el.scrollWidth / 2) x = 0;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* theme + form state */
  const [dark, setDark]           = useState(true);
  const [amount, setAmount]       = useState(1000);
  const [fundMethod, setFundMethod] = useState("mpesa");
  const [swapFrom, setSwapFrom]   = useState("KES");
  const [swapTo, setSwapTo]       = useState("XLM");

  /* reusable card style */
  const cardBase =
    "group border rounded-xl backdrop-blur-md shadow transition-all duration-300";
  const cardGoldHover =
    "hover:-translate-y-1 hover:border-[#FFD700] hover:shadow-[0_0_15px_#FFD70055] hover:text-[#FFD700]";
  const cardStyle = clsx(
    cardBase,
    cardGoldHover,
    dark ? "bg-gray-800/80 border-gray-700" : "bg-gray-100 border-gray-300"
  );

  return (
    <div
      className={clsx(
        "min-h-screen flex",
        dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      )}
    >
      {/* ────────── Sidebar ────────── */}
      <aside
        className={clsx(
          "w-64 p-6 sticky top-0 h-screen flex flex-col gap-8",
          dark ? "bg-gray-800" : "bg-gray-100"
        )}
      >
        <h2 className="text-2xl font-bold">MZend</h2>

        <nav className="flex flex-col gap-5 text-lg">
          {[
            { Icon: Wallet, path: "/wallet", label: "Wallet" },
            { Icon: Send, path: "/send", label: "Send" },
            { Icon: Repeat, path: "/exchange", label: "Exchange" },
            { Icon: Download, path: "/fund", label: "Fund" },
          ].map(({ Icon, path, label }) => (
            <Link
              key={label}
              to={path}
              className="flex items-center gap-3 hover:text-[#FFD700] transition-colors"
            >
              <Icon size={20} /> {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setDark((p) => !p)}
          className="mt-auto px-4 py-2 rounded bg-[#FFD700] text-black flex items-center gap-2 hover:brightness-110"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />} Toggle theme
        </button>
      </aside>

      {/* ────────── Main Container ────────── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header
          className={clsx(
            "flex items-center justify-between px-6 py-3 shadow-sm",
            dark ? "bg-gray-800" : "bg-gray-100"
          )}
        >
          <h1 className="font-semibold text-lg">Dashboard</h1>

          <div className="flex items-center gap-4">
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="relative p-2 rounded-full hover:bg-gray-700/40 hover:text-[#FFD700] transition-colors"
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Link>

            <Link
              to="/profile"
              aria-label="Profile"
              className="w-9 h-9 rounded-full bg-[#FFD700] grid place-content-center font-bold text-black hover:brightness-110"
            >
              U
            </Link>
          </div>
        </header>

        {/* Ticker */}
        <section
          className={clsx(
            "py-3 overflow-x-hidden",
            dark ? "bg-gray-800" : "bg-gray-50"
          )}
        >
          <div
            ref={track}
            className="flex gap-6 px-6 whitespace-nowrap will-change-transform"
          >
            {RATES.concat(RATES).map((r, idx) => (
              <div
                key={idx}
                className={clsx(
                  "min-w-[200px] px-5 py-3 rounded-lg text-center border transition-colors",
                  dark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300",
                  "hover:border-[#FFD700] hover:shadow-[0_0_10px_#FFD70055]"
                )}
              >
                <p className="text-sm font-medium">{r.pair}</p>
                <p className="text-xl font-bold">{r.rate}</p>
                <p className={r.change >= 0 ? "text-green-400" : "text-red-500"}>
                  {r.change >= 0 ? "+" : ""}
                  {r.change}%
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-10">
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                label: "Wallet Balance",
                value: "0.00",
                Icon: Wallet,
                link: "/wallet",
              },
              {
                label: "Send Money",
                value: "Quick transfer",
                Icon: Send,
                link: "/send",
              },
              {
                label: "Receive Funds",
                value: "Share address",
                Icon: ArrowDownCircle,
                link: "/receive",
              },
            ].map(({ label, value, Icon, link }) => (
              <Link
                key={label}
                to={link}
                className={clsx(
                  cardStyle,
                  "p-6 flex justify-between items-start no-underline text-inherit"
                )}
              >
                <div>
                  <h3 className="text-lg font-semibold mb-1 transition-colors group-hover:text-[#FFD700]">
                    {label}
                  </h3>
                  <p className="text-sm opacity-75">{value}</p>
                </div>
                <Icon className="w-9 h-9 text-[#FFD700] opacity-80 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Fund & Exchange */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fund Wallet */}
            <div className={clsx(cardStyle, "p-6")}>
              <h3 className="text-lg font-semibold mb-4 group-hover:text-[#FFD700] transition-colors">
                Fund Wallet
              </h3>

              <div className="space-y-4">
                {/* Amount input */}
                <div>
                  <label className="text-xs opacity-70">Amount (KES)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(+e.target.value)}
                    className="w-full p-2 mt-1 rounded bg-gray-700/60 focus:outline-[#FFD700]"
                  />
                </div>

                {/* Method buttons */}
                <div>
                  <label className="text-xs opacity-70 block mb-1">
                    Funding Method
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: "mpesa", lbl: "M-PESA", Icon: PhoneIcon },
                      { id: "card", lbl: "Card", Icon: CreditCard },
                      { id: "bank", lbl: "Bank", Icon: Banknote },
                    ].map(({ id, lbl, Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setFundMethod(id)}
                        className={clsx(
                          "flex items-center gap-1 px-3 py-2 rounded text-sm transition-colors",
                          fundMethod === id
                            ? "bg-[#FFD700] text-black"
                            : "bg-gray-700/60 hover:bg-gray-700/80"
                        )}
                      >
                        <Icon size={14} /> {lbl}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full py-2 rounded bg-green-600 hover:bg-green-500 transition">
                  Deposit {amount.toLocaleString()} KES
                </button>
              </div>
            </div>

            {/* Exchange */}
            <div className={clsx(cardStyle, "p-6")}>
              <h3 className="text-lg font-semibold mb-4 group-hover:text-[#FFD700] transition-colors">
                Exchange
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs opacity-70">From</label>
                    <select
                      value={swapFrom}
                      onChange={(e) => setSwapFrom(e.target.value)}
                      className="w-full p-2 mt-1 rounded bg-gray-700/60 focus:outline-[#FFD700]"
                    >
                      {["KES", "USD", "XLM"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs opacity-70">To</label>
                    <select
                      value={swapTo}
                      onChange={(e) => setSwapTo(e.target.value)}
                      className="w-full p-2 mt-1 rounded bg-gray-700/60 focus:outline-[#FFD700]"
                    >
                      {["XLM", "USDC", "USDT"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs opacity-70">Amount</label>
                  <input
                    type="number"
                    defaultValue={500}
                    className="w-full p-2 mt-1 rounded bg-gray-700/60 focus:outline-[#FFD700]"
                  />
                </div>

                <button className="w-full py-2 rounded bg-purple-600 hover:bg-purple-500 flex items-center justify-center gap-2 transition">
                  <Repeat size={18} /> Swap
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* Dummy phone icon */
function PhoneIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92V23a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.16 8.18 2 2 0 0 1 5 6h6.09a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .56 2.57 2 2 0 0 1-.45 2l-2.27 2.27a16 16 0 0 0 6.72 6.72l2.27-2.27a2 2 0 0 1 2-.45 13.35 13.35 0 0 0 2.57.56A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
