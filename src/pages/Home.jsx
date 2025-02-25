// src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginForm from "../components/Login";
import SignUpForm from "../components/Registration";

const Home = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/src/assets/landing-page/background.jpg')`,
          filter: "contrast(100%) brightness(30%)",
        }}
      ></div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col h-full text-white">
        <Navbar />
        <div className="flex flex-grow items-center justify-between mx-20">
          {/* Left Side Content */}
          <div className="max-w-lg">
            <h1 className="text-7xl font-bold knewave-font">On The Rocks</h1>
            <p className="text-lg mt-4 poppins-font">
              Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudantium.
            </p>

            {/* Order Now Button */}
            <Link
              to="/order"
              className="mt-6 inline-block px-8 py-4 text-lg font-semibold text-white bg-[#2F2F2F] rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-[#404040]"
            >
              Order Now
            </Link>

            {/* Star Rating */}
            <div className="mt-4 flex items-center">
              <span className="text-yellow-400 text-2xl">★★★★★</span>
              <p className="ml-2 text-sm">5 star rating based on 1788 reviews</p>
            </div>
          </div>

          {/* Right Side - Enlarged Login/Register Form */}
          <div className="w-[650px] p-10 border-white rounded-xl bg-opacity-0">
            {isRegistering ? <SignUpForm toggleForm={toggleForm} /> : <LoginForm toggleForm={toggleForm} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
