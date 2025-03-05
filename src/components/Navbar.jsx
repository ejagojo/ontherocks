import React from "react";
import { Link } from "react-router-dom"; // Import React Router for navigation placeholders
import { FaSearch } from "react-icons/fa";
import Logo from "../assets/logo/Logo-White.png"; // Import the logo image

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 bg-transparent h-16">
      {/* Logo Image */}
      <div className="h-full flex items-center">
        <Link
          to="/"
        >
          <img src={Logo} alt="On The Rocks Logo" className="h-40 w-auto" />
        </Link>
      </div>

      {/* Menu Links (Navigation Placeholders) */}
      <div className="flex gap-8">
        <Link
          to="/order"
          className="text-white poppins-font text-lg relative transition-transform duration-300 ease-in-out hover:scale-110 hover:text-white after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
        >
          Order
        </Link>
        <Link
          to="/contact"
          className="text-white poppins-font text-lg relative transition-transform duration-300 ease-in-out hover:scale-110 hover:text-white after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
        >
          Contact
        </Link>
        <Link
          to="/about"
          className="text-white poppins-font text-lg relative transition-transform duration-300 ease-in-out hover:scale-110 hover:text-white after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
        >
          About
        </Link>
        <Link
          to="/partner"
          className="text-white poppins-font text-lg relative transition-transform duration-300 ease-in-out hover:scale-110 hover:text-white after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
        >
          Partner
        </Link>
      </div>

      {/* Search Feature */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-lg bg-white text-black focus:outline-none"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
      </div>
    </nav>
  );
};

export default Navbar;
