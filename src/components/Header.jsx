import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import logo from "../../public/assets/logo/Logo.png";
import profile from "../../public/assets/Profile-icon/profile.jpg";
import StoreSearchPopup from "../pages/StoreSearchPopup";

const Header = ({ theme = "light" }) => {
  const userName = null;
  const [address, setAddress] = useState("123 Lowell St");
  const [isEditing, setIsEditing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cartCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleInputFocus = () => {
    setIsEditing(true);
    setShowSuggestions(true);
  };

  const handleSelectAddress = (addr) => {
    setAddress(addr);
    setIsEditing(false);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (address.trim() === "") return;
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
          address
        )}&limit=5`;
        const response = await fetch(`https://corsproxy.io/?${url}`);
        const data = await response.json();
        const clean = data.map((item) => {
          const { house_number, road, city, town, village, state, postcode } =
            item.address || {};
          let hn = house_number;
          if (hn && hn.includes(";")) {
            const nums = hn.split(";").map((n) => n.trim());
            hn = nums[nums.length - 1];
          }
          const line = [hn, road].filter(Boolean).join(" ");
          const place = city || town || village || "";
          return [line, place, state, postcode].filter(Boolean).join(", ");
        });
        setSuggestions(clean);
      } catch (err) {
        console.error("Autocomplete fetch failed", err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [address]);

  return (
    <>
      <header className="w-full sticky top-0 bg-white z-50 py-2">
        <div className="flex items-center justify-between h-24 md:h-16 px-4 gap-2">
          <Link to="/" className="shrink-0">
            <img src={logo} alt="logo" className=" h-40 w-auto" />
          </Link>

          <div className="flex flex-col md:flex-row items-end md:items-center justify-end gap-2 ml-4 my-4">
            <div className="flex-1 flex md:flex-row items-end md:items-center justify-end gap-2 ml-4">
              <div className="w-[280px] h-10 relative flex items-center justify-between px-4 py-2 bg-gray-200 rounded-full text-black font-medium hover:bg-gray-300">
                {isEditing ? (
                  <form onSubmit={handleSearchSubmit} className="w-full">
                    <input
                      autoFocus
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onBlur={() => setTimeout(() => setIsEditing(false), 200)}
                      onFocus={handleInputFocus}
                      className="bg-transparent outline-none font-bold w-full"
                    />
                  </form>
                ) : (
                  <span
                    className="font-bold cursor-pointer truncate w-full"
                    onClick={handleInputFocus}
                  >
                    {address}
                  </span>
                )}
                <span className="mx-2 h-6 w-px bg-gray-400"></span>
                <span className="text-sm md:text-md">Pick Up</span>
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-12 left-0 w-full bg-white text-black rounded-lg shadow-md z-50 max-h-60 overflow-auto">
                    {suggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        onMouseDown={() => handleSelectAddress(suggestion)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm leading-tight"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 w-full md:w-auto justify-end">
              <div className="flex items-center px-3 md:px-4 py-2 bg-gray-200 rounded-full">
                <FaSearch className="md:hidden mr-1" />
                <input
                  className="md:block bg-transparent outline-none w-20 md:w-auto"
                  placeholder="Search"
                />
                <span className="mx-2 h-6 w-px bg-gray-400 hidden md:block"></span>
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
        </div>
      </header>

      <StoreSearchPopup
        isOpen={showPopup}
        address={address}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
};

export default Header;
