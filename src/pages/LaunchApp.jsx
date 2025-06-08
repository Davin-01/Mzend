import React from "react";

export default function LaunchApp() {
  return (
    <main className="min-h-screen bg-[#0B0F1A] text-white px-6 py-12 flex items-center justify-center">
      <div className="bg-[#1C2230] p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">📲 Launch App</h2>
        <p className="text-gray-400 mb-6">
          Scan the QR code below to download our app, or use the store buttons.
        </p>

        {/* QR CODE */}
        <div className="flex justify-center mb-6">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://yourapp.link"
            alt="QR Code to download app"
            className="rounded"
          />
        </div>

        {/* DOWNLOAD BADGES */}
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <a
            href="https://apps.apple.com/us/app/example/id123456789"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Available_on_the_App_Store_%28black%29_SVG.svg"
              alt="Download on the App Store"
              className="h-12 hover:scale-105 transition"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.example"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-12 hover:scale-105 transition"
            />
          </a>
        </div>
      </div>
    </main>
  );
}
