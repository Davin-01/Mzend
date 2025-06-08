import React, { useState } from "react";
import {
  Headset,
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Info,
  User, // ✅ Fixed: Added missing import
} from "lucide-react";

const faqList = [
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the Profile page and click on “Change Password.” Follow the prompts to update your password. If you need further assistance, contact support.",
  },
  {
    question: "How can I view my transaction history?",
    answer:
      "You can view your full transaction history by navigating to the “Transactions” page in the dashboard. Use filters or search to locate specific transactions.",
  },
  {
    question: "What are the fees for sending money?",
    answer:
      "Fees vary by payout method and country. Visit our FAQ section on fees for detailed information, or contact support to get a personalized quote.",
  },
  {
    question: "How do I connect my Lobstr wallet?",
    answer:
      "Go to the Wallet page and click “Connect Wallet.” For now, we have a dummy integration; full Stellar integration will be available soon.",
  },
];

export default function Support() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState(Array(faqList.length).fill(false));

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const toggleFaq = (index) => {
    setFaqOpen((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div className="min-h-screen bg-[#F3E8FF] p-6">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-[#5B2C6F] to-[#43215A] rounded-2xl shadow-md overflow-hidden">
        <div className="px-6 py-8 text-center text-white">
          <Headset className="mx-auto mb-4 w-10 h-10 text-[#FFD700]" />
          <h1 className="text-3xl font-bold">Support Center</h1>
          <p className="mt-2 text-lg">We’re here to help. Get in touch or check our FAQs.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-[#5B2C6F] mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#FFD700]" /> Contact Support
          </h2>

          {submitted ? (
            <p className="text-center text-green-600 font-medium">
              ✅ Your message has been submitted. We’ll get back to you soon!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-1 flex items-center gap-2"
                >
                  <User className="w-5 h-5 text-[#5B2C6F]" /> Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-1 flex items-center gap-2"
                >
                  <Mail className="w-5 h-5 text-[#5B2C6F]" /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-1 flex items-center gap-2"
                >
                  <Info className="w-5 h-5 text-[#5B2C6F]" /> Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Brief summary"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-1 flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 text-[#5B2C6F]" /> Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe your issue or question"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#5B2C6F] text-white py-3 rounded-lg font-semibold hover:bg-[#43215A] transition"
              >
                Submit Request
              </button>
            </form>
          )}
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-[#5B2C6F] mb-4 flex items-center gap-2">
            <Phone className="w-6 h-6 text-[#FFD700]" /> Other Ways to Reach Us
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#5B2C6F]" />
              <a href="mailto:support@zendapp.com" className="hover:underline">
                support@zendapp.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#5B2C6F]" />
              <a href="tel:+15551234567" className="hover:underline">
                +1 (555) 123-4567
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Headset className="w-5 h-5 text-[#5B2C6F]" />
              Live Chat (coming soon)
            </li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-[#5B2C6F] mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-[#FFD700]" /> Frequently Asked Questions
          </h2>

          {faqList.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-none">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center py-4 focus:outline-none"
              >
                <span className="text-gray-800 font-medium">{faq.question}</span>
                {faqOpen[index] ? (
                  <ChevronUp className="w-5 h-5 text-[#5B2C6F]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#5B2C6F]" />
                )}
              </button>
              {faqOpen[index] && (
                <div className="pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
