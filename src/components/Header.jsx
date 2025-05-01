import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaAward } from "react-icons/fa6";
import logo from "/assets/logo/Logo.png";
import profile from "/assets/Profile-icon/profile.jpg";
import StoreSearchPopup from "../pages/StoreSearchPopup";
import { db } from "../services/firebase";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import CartPreviewPopup from "./CartPreviewPopup";

const Header = () => {
  const userName = null;
  const [address, setAddress] = useState("123 Lowell St");
  const [isEditing, setIsEditing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const auth = getAuth();
  const prevCartRef = useRef([]);

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

  const toggleCartPreview = () => {
    setShowCartPreview((prev) => !prev);
  };

  const locationBoxRef = useRef(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const cartRef = collection(db, "users", user.uid, "AddToCartItems");

    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      const currentCart = items;
      const previousCart = prevCartRef.current;

      const previousCount = previousCart.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );
      const currentCount = currentCart.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );

      // if (currentCount > previousCount) {
      //   setShowCartPreview(true);
      // }

      prevCartRef.current = currentCart;
      setCartItems(currentCart);
      setCartCount(currentCount);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

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

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      locationBoxRef.current &&
      !locationBoxRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
      setIsEditing(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  }, []);

  return (
    <>
      <header className="w-full fixed top-0 bg-white z-50 py-2">
        <div className="flex items-center justify-between mr-6 h-24 md:h-16 md:gap-2 relative">
          <Link to="/order" className="shrink-0"> 
            {/* Users have been getting redirected to the home page unwantedly */}
            <img src={logo} alt="logo" className=" h-35 md:h-40 w-auto" />
          </Link>

          <div className="flex flex-col md:flex-row items-end md:items-center justify-end gap-2 my-4">
            <div className="flex-1 flex md:flex-row items-end md:items-center justify-end gap-2 ml-4">
              <div
                ref={locationBoxRef}
                className="w-[210px]  md:w-[280px] h-10 relative flex items-center justify-between px-4 py-2 gap-2 bg-gray-200 rounded-full text-black font-medium hover:bg-gray-300">
                {/* to signify this is the location input */}
                <FaLocationDot />
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
                <span className="text-sm md:text-md whitespace-nowrap">
                  Pick Up
                </span>
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

            <div className="flex items-center w-full md:w-auto justify-end relative">
              <div className="flex items-center gap-3 md:gap-2">
                <Link to="/loyalty">
                  <FaAward className="text-2xl text-yellow-500 transition-transform duration-200 hover:scale-110 hover:text-yellow-600" />
                </Link>

                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={toggleCartPreview}
                >
                  <FaShoppingCart className="text-2xl text-black transition-transform duration-200 hover:scale-110 hover:text-gray-700" />
                  <span className="font-bold text-black">{cartCount}</span>
                  {showCartPreview && (
                    <CartPreviewPopup
                      cartItems={cartItems}
                      onClose={toggleCartPreview}
                    />
                  )}
                </div>

                <Link to="/profile" className="flex items-center gap-2 ml-px">
                  <img
                    src={profile}
                    alt="profile"
                    className="h-10 w-10 rounded-full object-cover transition-transform duration-200 hover:scale-105"
                  />
                  {userName && <span>{userName}</span>}
                </Link>
              </div>
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
