import React, { useState } from "react";
import { Banknote, Globe, Send as SendIcon, User, Wallet } from "lucide-react";

export default function Send() {
  const [form, setForm] = useState({
    fromCountry: "",
    recipientName: "",
    recipientAccount: "",
    payoutMethod: "",
    amount: "",
  });
  const [confirmation, setConfirmation] = useState(null);
  const [summary, setSummary] = useState(null);
  const [sending, setSending] = useState(false);

  const countries = [
    { code: "KE", name: "Kenya", flag: "🇰🇪" },
    { code: "NG", name: "Nigeria", flag: "🇳🇬" },
    { code: "GH", name: "Ghana", flag: "🇬🇭" },
    { code: "US", name: "USA", flag: "🇺🇸" },
    { code: "UK", name: "UK", flag: "🇬🇧" },
  ];

  const payoutOptions = [
    { value: "bank", label: "Bank Transfer", icon: <Banknote className="w-5 h-5 text-gray-500" /> },
    { value: "mobile", label: "Mobile Money", icon: <Wallet className="w-5 h-5 text-gray-500" /> },
    { value: "lumens", label: "Lumens (XLM)", icon: <Globe className="w-5 h-5 text-gray-500" /> },
  ];

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!form.fromCountry || !form.recipientName || !form.recipientAccount || !form.payoutMethod || !form.amount) {
      setConfirmation("❗ Please complete all fields.");
      return;
    }
    setSending(true);
    setConfirmation(null);

    setTimeout(() => {
      const timestamp = new Date();
      setSending(false);
      setConfirmation("✅ Transaction sent successfully!");
      setSummary({
        ...form,
        time: timestamp.toLocaleString(),
      });
      setForm({
        fromCountry: "",
        recipientName: "",
        recipientAccount: "",
        payoutMethod: "",
        amount: "",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-yellow-200">
        <div className="bg-yellow-500 flex items-center gap-3 px-6 py-5">
          <SendIcon className="w-6 h-6 text-white" />
          <h1 className="text-2xl font-bold text-white tracking-wide">Send Money</h1>
        </div>

        <div className="p-10">
          <form onSubmit={handleSend} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="fromCountry" className="block text-yellow-700 font-semibold mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-yellow-600" /> From Country
                </label>
                <select
                  id="fromCountry"
                  name="fromCountry"
                  value={form.fromCountry}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                >
                  <option value="" disabled>Select Country</option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="payoutMethod" className="block text-yellow-700 font-semibold mb-2 flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-yellow-600" /> Payout Method
                </label>
                <select
                  id="payoutMethod"
                  name="payoutMethod"
                  value={form.payoutMethod}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                >
                  <option value="" disabled>Select Method</option>
                  {payoutOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="recipientName" className="block text-yellow-700 font-semibold mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-yellow-600" /> Recipient Name
                </label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  value={form.recipientName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="recipientAccount" className="block text-yellow-700 font-semibold mb-2 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-yellow-600" /> Recipient Account
                </label>
                <input
                  type="text"
                  id="recipientAccount"
                  name="recipientAccount"
                  value={form.recipientAccount}
                  onChange={handleChange}
                  required
                  placeholder={form.payoutMethod === "lumens" ? "Stellar Address" : "Account number / Mobile"}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="amount" className="block text-yellow-700 font-semibold mb-2 flex items-center gap-2">
                  <SendIcon className="w-5 h-5 text-yellow-600" /> Amount (USD)
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                />
              </div>
            </div>

            {confirmation && (
              <p className="text-center text-green-600 font-semibold mt-4">{confirmation}</p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 hover:scale-[1.02] transition-transform duration-200 disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send Money"}
            </button>
          </form>

          {summary && (
            <div className="mt-10 bg-yellow-50 border-t-4 border-yellow-400 rounded-xl p-6 shadow-inner">
              <h3 className="text-lg font-bold text-yellow-800 mb-4">Transaction Summary</h3>
              <ul className="space-y-1 text-yellow-700">
                <li><strong>From Country:</strong> {countries.find(c => c.code === summary.fromCountry)?.name}</li>
                <li><strong>Recipient Name:</strong> {summary.recipientName}</li>
                <li><strong>Payout Method:</strong> {payoutOptions.find(o => o.value === summary.payoutMethod)?.label}</li>
                <li><strong>Recipient Info:</strong> {summary.recipientAccount}</li>
                <li><strong>Amount:</strong> ${summary.amount}</li>
                <li><strong>Time:</strong> {summary.time}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
