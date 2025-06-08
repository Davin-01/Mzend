import React, { useState, useEffect, useRef } from "react";
import Flag from "react-world-flags";
import qrPlaystore from "../assets/qr-playstore.png";

const COLORS = {
  gold: "#FFD966",
  goldDark: "#D4AF37",
  purple900: "#1A0A3D",
  purple700: "#2A0B5B",
  purple500: "#31106B",
  textMain: "#FFDD88",
};

const SUPPORTED = [
  { code: "KES", cc: "KE" },
  { code: "NGN", cc: "NG" },
  { code: "UGX", cc: "UG" },
  { code: "TZS", cc: "TZ" },
];

const CARDS = [
  { from: "KES", to: "NGN", rate: 5.12, amt: 100 },
  { from: "NGN", to: "UGX", rate: 7.5, amt: 50 },
  { from: "TZS", to: "KES", rate: 0.05, amt: 200 },
  { from: "UGX", to: "TZS", rate: 0.026, amt: 300 },
];

const FEATURES = [
  { t: "Real‑Time FX", d: "Live market‑linked rates on Stellar." },
  { t: "Security", d: "AES‑256 + on‑chain transparency." },
  { t: "Multi‑Currency", d: "KES, NGN, UGX, TZS & stablecoins." },
  { t: "Fast Delivery", d: "<30 Sec settlement anywhere." },
];

function AuthModal({ open, onClose }) {
  const [login, setLogin] = useState(true);
  const modalRef = useRef();

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      document.addEventListener("keydown", handleKey);
    } else {
      document.removeEventListener("keydown", handleKey);
    }

    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) modalRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-[#2A0B5B] rounded-xl w-96 p-8 text-[#FFDD88] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl focus:outline-none"
        >
          ×
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">{login ? "Login" : "Create Account"}</h2>
        <form className="space-y-5">
          {!login && (
            <input
              placeholder="Full name"
              className="w-full p-4 rounded bg-[#1A0A3D] border border-[#D4AF37]"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded bg-[#1A0A3D] border border-[#D4AF37]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded bg-[#1A0A3D] border border-[#D4AF37]"
          />
          <button
            className="w-full bg-[#FFD966] text-[#1A0A3D] font-semibold py-3 rounded hover:bg-[#FFE88D] transition"
            type="submit"
          >
            {login ? "Login" : "Sign Up"}
          </button>
        </form>
        <p
          onClick={() => setLogin(!login)}
          className="mt-5 text-center underline cursor-pointer text-lg"
        >
          {login ? "Need an account? Sign up" : "Have one? Login"}
        </p>
      </div>
    </div>
  );
}

function FlagsCarousel() {
  const row = [...SUPPORTED, ...SUPPORTED];
  return (
    <div className="overflow-hidden py-6 select-none w-full">
      <div
        className="flex gap-14 animate-scroll px-8 hover:pause"
        style={{ minWidth: "max-content" }}
      >
        {row.map(({ code, cc }, i) => (
          <div
            key={`${code}-${i}`}
            className="flex flex-col items-center w-28 text-[#FFD966]"
          >
            <Flag code={cc} className="w-14 h-10 rounded border border-[#6A0DAD]" />
            <span className="mt-2 font-semibold">{code}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default function LandingPage() {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [modal]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1A0A3D] via-[#2E0F63] to-[#4E1B9D] px-4 py-16 text-[#FFDD88] font-sans scroll-smooth">
      <FlagsCarousel />

      <section className="text-center max-w-3xl mx-auto mt-14 mb-20 animate-fade-in">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Borderless Payments
        </h1>
        <p className="text-xl text-[#FFE7A8] mb-8">
          Instant, secure exchange across East Africa & Nigeria — powered by Stellar.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button
            onClick={() => setModal(true)}
            className="bg-[#FFD966] text-[#1A0A3D] py-3 px-6 rounded-lg font-semibold text-lg shadow hover:scale-105 transition"
          >
            Get Started
          </button>
          <a
            href="#features"
            className="border-2 border-[#FFD966] text-[#FFD966] py-3 px-6 rounded-lg font-semibold text-lg hover:bg-white/10 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      <section className="flex flex-wrap justify-center gap-8 mb-20">
        {CARDS.map(({ from, to, rate, amt }, i) => {
          const converted = (amt * rate).toFixed(2);
          return (
            <div
              key={i}
              className="w-40 h-52 bg-[#FFD966] text-[#1A0A3D] rounded-xl p-6 flex flex-col justify-between shadow-lg hover:-translate-y-2 transform transition duration-200"
            >
              <div className="flex justify-between text-sm font-semibold">
                <div className="flex items-center gap-1">
                  <Flag code={SUPPORTED.find((c) => c.code === from).cc} className="w-6 h-4 border" />
                  <span>{from}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flag code={SUPPORTED.find((c) => c.code === to).cc} className="w-6 h-4 border" />
                  <span>{to}</span>
                </div>
              </div>
              <p className="text-center text-2xl font-bold">{amt} → {converted}</p>
              <span className="text-sm italic self-end">Rate: {rate}</span>
            </div>
          );
        })}
      </section>

      <section id="features" className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
        {FEATURES.map(({ t, d }, i) => (
          <div
            key={i}
            className="bg-[#31106B] p-6 rounded-xl shadow-xl transition hover:scale-105"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#FFD966]">{t}</h3>
            <p className="text-lg text-[#FFEFAF]">{d}</p>
          </div>
        ))}
      </section>

      <section className="text-center mb-16">
        <h3 className="text-xl font-bold text-[#FFD966] mb-4">Get the App</h3>
        <img
          src={qrPlaystore}
          alt="Download App QR"
          loading="lazy"
          className="w-32 h-32 mx-auto border-2 border-[#FFD966] rounded-lg hover:scale-105 transition"
        />
        <p className="text-lg mt-3 text-[#FFE7A8]">Scan to download on Play Store</p>
      </section>

      <AuthModal open={modal} onClose={() => setModal(false)} />
    </main>
  );
}
