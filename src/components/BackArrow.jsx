import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const BackArrow = ({ to = "/" }) => {
    const navigate = useNavigate();
    return (
        <div className="hidden md:block w-full relative">
            <Link
                to="#"
                onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }}
                className="fixed top-1/7 left-4 md:left-16 z-50 bg-white/80 backdrop-blur border border-gray-300 rounded-full p-2 shadow-2xl hover:bg-white transition"
            >
                <BiArrowBack className="text-black text-2xl" />
            </Link>
        </div>
    );
};

export default BackArrow;
