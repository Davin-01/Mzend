import React, { useState } from "react";
import {
  Globe,
  Banknote,
  Wallet as WalletIcon,
  User,
  Download,
  Info,
} from "lucide-react";

export default function Receive() {
  const [form, setForm] = useState({
    fromCountry: "",
    payoutMethod: "",
    recipientName: "",
    recipientAccount: "",
    amount: "",
  });
  const [confirmation, setConfirmation] = useState(null);
  const [summary, setSummary] = useState(null);
  const [processing, setProcessing] = useState(false);

  const countries = [
    { code: "KE", name: "Kenya" },
    { code: "NG", name: "Nigeria" },
    { code: "GH", name: "Ghana" },
    { code: "US", name: "USA" },
    { code: "UK", name: "UK" },
  ];

  const payoutOptions = [
    { value: "bank", label: "Bank Transfer", icon: <Banknote className="w-5 h-5 text-gray-500" /> },
    { value: "mobile", label: "Mobile Money", icon: <WalletIcon className="w-5 h-5 text-gray-500" /> },
    { value: "lumens", label: "Lumens (XLM)", icon: <Globe className="w-5 h-5 text-gray-500" /> },
  ];

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReceive = (e) => {
    e.preventDefault();
    if (
      !form.fromCountry ||
      !form.payoutMethod ||
      !form.recipientName ||
      !form.recipientAccount ||
      !form.amount
    ) {
      setConfirmation("❗ Please complete all fields.");
      return;
    }
    setProcessing(true);
    setConfirmation(null);

    setTimeout(() => {
      const timestamp = new Date();
      setProcessing(false);
      setConfirmation("✅ Receive request submitted!");
      setSummary({
        ...form,
        time: timestamp.toLocaleString(),
      });
      setForm({
        fromCountry: "",
        payoutMethod: "",
        recipientName: "",
        recipientAccount: "",
        amount: "",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F3E8FF] p-6">
      {/* Banner */}
      <div className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-[#5B2C6F] to-[#43215A] rounded-2xl shadow-md overflow-hidden">
        <div className="px-6 py-8 text-center text-white">
          <Download className="mx-auto mb-4 w-10 h-10 text-[#FFD700]" />
          <h1 className="text-3xl font-bold">Receive Money</h1>
          <p className="mt-2 text-lg">Choose how you want to receive your funds</p>
        </div>
      </div>

      {/* Main Panel */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Instruction Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-[#5B2C6F] mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-[#FFD700]" />
            Why Use Receive?
          </h2>
          <ul className="space-y-3 text-gray-700 flex-1">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-[#5B2C6F]">•</span>
              <span>Fast and secure delivery to your account.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-[#5B2C6F]">•</span>
              <span>Multiple payout methods for convenience.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-[#5B2C6F]">•</span>
              <span>Transparent fee structure—no surprises.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-[#5B2C6F]">•</span>
              <span>View your receive history in one place.</span>
            </li>
          </ul>
          <div className="mt-6 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-[#FFD700] text-[#5B2C6F] px-6 py-2 rounded-xl font-semibold hover:bg-[#e6c200] transition"
            >
              Scroll to Form
            </button>
          </div>
        </div>

        {/* Right: Form Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <form onSubmit={handleReceive} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From Country */}
              <div>
                <label htmlFor="fromCountry" className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#5B2C6F]" />
                  From Country
                </label>
                <select
                  id="fromCountry"
                  name="fromCountry"
                  value={form.fromCountry}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
                >
                  <option value="" disabled>Select Country</option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Payout Method */}
              <div>
                <label htmlFor="payoutMethod" className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-[#5B2C6F]" />
                  Payout Method
                </label>
                <select
                  id="payoutMethod"
                  name="payoutMethod"
                  value={form.payoutMethod}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
                >
                  <option value="" disabled>Select Method</option>
                  {payoutOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Recipient Name */}
              <div>
                <label htmlFor="recipientName" className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#5B2C6F]" />
                  Recipient Name
                </label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={form.recipientName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Jane Doe"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
                />
              </div>

              {/* Recipient Account/Number */}
              <div>
                <label htmlFor="recipientAccount" className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                  <WalletIcon className="w-5 h-5 text-[#5B2C6F]" />
                  Recipient Account
                </label>
                <input
                  type="text"
                  id="recipientAccount"
                  name="recipientAccount"
                  value={form.recipientAccount}
                  onChange={handleChange}
                  required
                  placeholder={
                    form.payoutMethod === "lumens"
                      ? "Stellar Address"
                      : "Account number / Mobile"
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
                />
              </div>

              {/* Amount */}
              <div className="md:col-span-2">
                <label htmlFor="amount" className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                  <Download className="w-5 h-5 text-[#5B2C6F]" />
                  Amount (USD)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  min="1"
                  step="any"
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
                />
              </div>
            </div>

            {/* Confirmation */}
            {confirmation && (
              <p className="text-center text-green-600 font-medium">{confirmation}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-[#5B2C6F] text-white py-3 rounded-lg font-semibold hover:bg-[#43215A] transition disabled:opacity-60"
            >
              {processing ? "Processing..." : "Receive Funds"}
            </button>
          </form>
        </div>
      </div>

      {/* Transaction Summary */}
      {summary && (
        <div className="max-w-4xl mx-auto mt-8 bg-[#FFFDF2] border-t-4 border-[#FFD700] rounded-b-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-[#2C3E50] mb-4">Receive Summary</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>From Country:</strong> {summary.fromCountry}</li>
            <li><strong>Payout Method:</strong> {payoutOptions.find((o) => o.value === summary.payoutMethod)?.label}</li>
            <li><strong>Recipient Name:</strong> {summary.recipientName}</li>
            <li><strong>Recipient Info:</strong> {summary.recipientAccount}</li>
            <li><strong>Amount:</strong> ${summary.amount}</li>
            <li><strong>Time:</strong> {summary.time}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
