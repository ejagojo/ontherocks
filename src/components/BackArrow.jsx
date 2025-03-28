import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

// back arrow component
const BackArrow = ({ to = "/" }) => {
    return (
        <div className="hidden md:block w-full relative">
            <Link to={to} className="fixed top-1/7 left-4 md:left-16  z-50 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition ">
                <BiArrowBack className="text-black text-xl" />
            </Link>
        </div>
    );
};

export default BackArrow;   