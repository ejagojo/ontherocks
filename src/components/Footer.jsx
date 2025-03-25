import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black py-8 mt-10 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <Link
            to="/"
            className="text-xl font-semibold transition-transform duration-300 ease-in-out hover:scale-110 knewave-font"
          >
            On The Rocks
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-4 text-sm poppins-font">
          <Link
            to="/about"
            className="relative transition-transform duration-300 ease-in-out hover:scale-110"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="relative transition-transform duration-300 ease-in-out hover:scale-110"
          >
            Contact
          </Link>
          <Link
            to="/order"
            className="relative transition-transform duration-300 ease-in-out hover:scale-110"
          >
            Order
          </Link>
          <Link
            to="/partner"
            className="relative transition-transform duration-300 ease-in-out hover:scale-110"
          >
            Partner
          </Link>
        </div>
        <div className="mt-6 md:mt-0 text-xs text-gray-600 poppins-font">
          © {new Date().getFullYear()} On The Rocks. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
