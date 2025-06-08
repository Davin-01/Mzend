import React from "react";

export default function Footer() {
  return (
    <footer
      className="bg-[#0B0F1A] text-[#EEE] py-6 mt-12 text-center text-sm select-none"
      style={{ animation: "fadeIn 1s ease forwards" }}
    >
      <p className="hover:text-[#00FFA3] transition-colors cursor-default">
        &copy; {new Date().getFullYear()} Zend. All rights reserved.
      </p>

      <style jsx global>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
}
