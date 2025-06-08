import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#5B2C6F] text-[#FFFDF2] py-6 mt-12 text-center">
      <p>&copy; {new Date().getFullYear()} Zend. All rights reserved.</p>
    </footer>
  );
}
