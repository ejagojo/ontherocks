// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaShoppingCart } from "react-icons/fa";
// import { FaSearch } from "react-icons/fa";
// import logo from "../assets/logo/Logo.png";
// import profile from "../assets/Profile-icon/profile.jpg";

// const Header = () => {
//   const userName = null;
//   const [address, setAddress] = useState("123 Lowell St");
//   const [isEditing, setIsEditing] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [addressHistory] = useState([
//     "123 Lowell St",
//     "234 Maple Ave",
//     "567 Oak Rd",
//   ]);
//   const [cartCount] = useState(0);

//   const handleInputFocus = () => {
//     setIsEditing(true);
//     setShowSuggestions(true);
//   };

//   const handleSelectAddress = (addr) => {
//     setAddress(addr);
//     setIsEditing(false);
//     setShowSuggestions(false);
//   };

//   return (
//     <header className="w-full sticky top-0 bg-white z-50 py-2">
//       <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-20 px-4 gap-2 md:gap-0">
//         <Link to="/">
//           <img src={logo} alt="logo" className=" h-20 md:h-40 w-auto" />
//         </Link>
//         <div className="flex-1 flex justify-center">
//           <div className="md:ml-40 mx-2 relative flex items-center justify-between px-4 py-2 bg-gray-200 rounded-full text-black font-medium hover:bg-gray-300">
//             {isEditing ? (
//               <input
//                 autoFocus
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 onBlur={() => setTimeout(() => setIsEditing(false), 200)}
//                 onFocus={handleInputFocus}
//                 className="bg-transparent outline-none font-bold max-w-[120px] md:max-w-none"
//               />
//             ) : (
//               <span
//                 className="font-bold cursor-pointer max-w-[120px] md:max-w-none truncate"
//                 onClick={handleInputFocus}
//               >
//                 {address}
//               </span>
//             )}
//             <span className="mx-2 h-6 w-px bg-gray-400"></span>
//             <span>Pick Up</span>
//             {showSuggestions && (
//               <div className="absolute top-14 left-0 w-full bg-white text-black rounded-lg shadow-md mt-1 z-50 py-2">
//                 {addressHistory.map((addr) => (
//                   <div
//                     key={addr}
//                     onMouseDown={() => handleSelectAddress(addr)}
//                     className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
//                   >
//                     {addr}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           {/* Search bar and cart */}
//           <div className="flex items-center px-2 md:px-4 py-2 bg-gray-200 rounded-full">
//             <FaSearch className="md:hidden" />
//             <input
//               className="md:block bg-transparent outline-none w-20 md:w-auto"
//               placeholder="Search"
//             />
//             <span className="mx-2 h-6 w-px bg-gray-400 hidden md:block"></span>
//             <FaShoppingCart className="mr-1" />
//             <span className="font-bold">{cartCount}</span>
//           </div>
//           <Link to="/profile" className="flex items-center gap-2">
//             <img
//               src={profile}
//               alt="profile"
//               className="h-10 w-10 rounded-full object-cover"
//             />
//             {userName && <span>{userName}</span>}
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
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
    <header className="w-full sticky top-0 bg-white z-50 py-2">
      <div className="flex items-center justify-between h-24 md:h-16 px-4 gap-2">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="logo" className=" h-40 w-auto" />
        </Link>

        {/* address bar + search bar + profile */}
        <div className=" flex flex-col md:flex-row items-end md:items-center justify-end gap-2 ml-4 my-4">
        <div className="flex-1 flex md:flex-row items-end md:items-center justify-end gap-2 ml-4">
          {/* Address bar */}
          <div className="w-auto h-10 relative flex items-center justify-between px-4 py-2 bg-gray-200 rounded-full text-black font-medium hover:bg-gray-300">
            {isEditing ? (
              <input
                autoFocus
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() => setTimeout(() => setIsEditing(false), 200)}
                onFocus={handleInputFocus}
                className="bg-transparent outline-none font-bold max-w-[120px] md:max-w-none"
              />
            ) : (
              <span
                className="font-bold cursor-pointer max-w-[120px] md:max-w-none truncate"
                onClick={handleInputFocus}
              >
                {address}
              </span>
            )}
            <span className="mx-2 h-6 w-px bg-gray-400"></span>
            <span className="text-sm md:text-md">Pick Up</span>
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
        {/* Search + profile row */}
        <div className="flex items-center gap-1 w-full md:w-auto justify-end">
          {/* Search bar and cart */}
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
  );
};

export default Header;
