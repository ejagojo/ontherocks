import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo/Logo.png";
import profile from "../assets/Profile-icon/profile.jpg";

const Header = () => {
  const userName = null;
  const [address, setAddress] = useState("123 Lowell St");
  const [isEditing, setIsEditing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [addressHistory] = useState([
    "123 Lowell St",
    "234 Maple Ave",
    "567 Oak Rd",
  ]);
  const [cartCount] = useState(0);

  const handleInputFocus = () => {
    setIsEditing(true);
    setShowSuggestions(true);
  };

  const handleSelectAddress = (addr) => {
    setAddress(addr);
    setIsEditing(false);
    setShowSuggestions(false);
  };

  return (
    <header className="w-full sticky top-0 bg-white z-50">
      <div className="flex items-center justify-between h-20 px-4">
        <Link to="/">
          <img src={logo} alt="logo" className="h-40" />
        </Link>
        <div className="flex-1 flex justify-center">
          <div className="ml-40 relative flex items-center justify-between px-4 py-2 bg-gray-200 rounded-full text-black font-medium hover:bg-gray-300">
            {isEditing ? (
              <input
                autoFocus
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() => setTimeout(() => setIsEditing(false), 200)}
                onFocus={handleInputFocus}
                className="bg-transparent outline-none font-bold w-30"
              />
            ) : (
              <span
                className="font-bold cursor-pointer w-30 truncate"
                onClick={handleInputFocus}
              >
                {address}
              </span>
            )}
            <span className="mx-2 h-6 w-px bg-gray-400"></span>
            <span>Pick Up</span>
            {showSuggestions && (
              <div className="absolute top-14 left-0 w-full bg-white text-black rounded-lg shadow-md mt-1 z-50 py-2">
                {addressHistory.map((addr) => (
                  <div
                    key={addr}
                    onMouseDown={() => handleSelectAddress(addr)}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    {addr}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center px-4 py-2 bg-gray-200 rounded-full text-black font-medium">
            <input
              className="bg-transparent outline-none"
              placeholder="Search"
            />
            <span className="mx-2 h-6 w-px bg-gray-400"></span>
            <FaShoppingCart className="mr-1" />
            <span className="font-bold">{cartCount}</span>
          </div>
          <Link to="/profile" className="flex items-center gap-2">
            <img
              src={profile}
              alt="profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            {userName && <span>{userName}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
