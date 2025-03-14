import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; 
import Logo from "../assets/logo/Logo-White.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="absolute top-0 left-0 w-full p-6 bg-transparent h-16 flex items-center justify-between z-50">
      <div className="flex items-center">
        <Link to="/">
          <img src={Logo} alt="On The Rocks Logo" className="h-40 w-auto" />
        </Link>
      </div>

      <div className="hidden md:flex gap-8">
        <Link
          to="/order"
          className="text-white poppins-font text-lg relative transition-transform duration-300 ease-in-out hover:scale-110 hover:text-white
            after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white
            after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
        >
          Order
        </Link>
        <Link
          to="/contact"
          className="text-white poppins-font text-lg relative transition-transform duration-300 ease-in-out hover:scale-110 hover:text-white
            after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white
            after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
        >
          Contact
        </Link>
        <Link
          to="/about"
          className="text-white poppins-font text-lg relative transition-transform duration-300 ease-in-out hover:scale-110 hover:text-white
            after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white
            after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
        >
          About
        </Link>
        <Link
          to="/partner"
          className="text-white poppins-font text-lg relative transition-transform duration-300 ease-in-out hover:scale-110 hover:text-white
            after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white
            after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
        >
          Partner
        </Link>
      </div>

      <div className="hidden md:block relative">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-lg bg-white text-black focus:outline-none"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
      </div>

      <button
        className="md:hidden text-white text-2xl focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle mobile menu"
      >
        <FaBars />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-16 right-0 w-full bg-black bg-opacity-80 flex flex-col items-center py-4 md:hidden"
            style={{ backdropFilter: "blur(2px)" }}
          >
            <Link
              to="/order"
              onClick={toggleMenu}
              className="text-white poppins-font text-lg py-2"
            >
              Order
            </Link>
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="text-white poppins-font text-lg py-2"
            >
              Contact
            </Link>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="text-white poppins-font text-lg py-2"
            >
              About
            </Link>
            <Link
              to="/partner"
              onClick={toggleMenu}
              className="text-white poppins-font text-lg py-2"
            >
              Partner
            </Link>
            <Link
              to="#"
              onClick={toggleMenu}
              className="text-white poppins-font text-lg py-2"
            >
              Login
            </Link>
            <Link
              to="#"
              onClick={toggleMenu}
              className="text-white poppins-font text-lg py-2"
            >
              Sign Up
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
