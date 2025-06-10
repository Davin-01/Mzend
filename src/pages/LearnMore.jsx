import React from "react";
import { CheckCircle, ArrowRightCircle } from "lucide-react";

export default function LearnMore() {
  return (
    <main className="bg-[#0B0F1A] text-white font-sans pt-36 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <section className="max-w-7xl mx-auto text-center">
        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-fadeInUp">
          Discover <span className="text-[#00FFA3]">MZend</span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg mb-14 max-w-2xl mx-auto animate-fadeInUp delay-100">
          Seamlessly bridge <span className="text-yellow-400">crypto</span> and{" "}
          <span className="text-yellow-400">fiat</span> — fast, secure, and borderless.
        </p>

        {/* Features */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-24 animate-fadeInUp delay-200">
          {[
            {
              title: "Create Wallet",
              icon: "👛",
              desc: "Sign up and create your secure Stellar-based wallet in seconds.",
            },
            {
              title: "Fund & Trade",
              icon: "💱",
              desc: "Deposit crypto or fiat and start swapping at real-time rates.",
            },
            {
              title: "Send & Receive",
              icon: "🌍",
              desc: "Transfer funds globally—fast, affordable, and secure.",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="bg-[#1C2230] p-6 rounded-xl hover:shadow-xl hover:scale-105 transition text-center"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h4 className="text-lg sm:text-xl font-semibold text-[#00FFA3] mb-2">
                {step.title}
              </h4>
              <p className="text-gray-400 text-sm sm:text-base">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#1C2230] mb-20"></div>

        {/* How It Works */}
        <div className="max-w-3xl mx-auto text-left animate-fadeInUp delay-300">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-yellow-400 text-center">
            How It Works
          </h2>
          <div className="space-y-6 px-2 sm:px-0">
            {[
              "Sign up and verify your account",
              "Link your wallet or deposit funds",
              "Use the Exchange to convert currencies",
              "Send or withdraw anytime, anywhere",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 sm:gap-4">
                <CheckCircle className="text-[#00FFA3] mt-1 flex-shrink-0" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col sm:flex-row justify-center gap-6 animate-fadeInUp delay-500">
          <a
            href="/Register"
            className="bg-[#00FFA3] text-black px-6 py-3 rounded font-semibold hover:scale-105 transition"
          >
            Get Started
          </a>
          <a
            href="/app"
            className="flex items-center gap-2 border border-[#00FFA3] text-[#00FFA3] px-6 py-3 rounded hover:bg-[#1C2230] transition"
          >
            Launch App <ArrowRightCircle size={20} />
          </a>
        </div>
      </section>
    </main>
  );
}
