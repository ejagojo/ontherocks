import logo from "../assets/logo/Logo.png";
import { Link } from "react-router-dom";
import profile from "../assets/Profile-icon/profile.jpg"

const Header = () => {
  return (
    <header className="w-full fixed top-0 bg-white shadow z-50">
    <div className="flex items-center justify-between h-20 px-4">
        {/* Logo flush left */}
        <Link to="/">
            <img src={logo} alt="logo" className="h-40" />
        </Link>

        {/* Centered button */}
        <div className="flex-1 flex justify-center">
            <button className="ml-4 flex items-center justify-between px-4 py-2 bg-gray-200 rounded-full shadow-md text-black font-medium hover:bg-gray-300">
                <span className="font-bold">123 Lowell St</span>
                <span className="mx-2 h-6 w-px bg-gray-400"></span>
                <span>Pick Up</span>
            </button>
        </div>

        {/* Search + Profile on the right */}
        <div className="flex items-center gap-4">
            <div className="flex items-center px-4 py-2 bg-gray-200 rounded-full shadow-md text-black font-medium">
                <input
                    className="bg-transparent outline-none"
                    placeholder="Search"
                />
                <span className="mx-2 h-6 w-px bg-gray-400"></span>
            </div>
            <img src={profile} className="h-10 w-10 rounded-full object-cover" />
        </div>
    </div>
</header>

  );
};

export default Header