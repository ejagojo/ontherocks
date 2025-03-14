import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginForm from "../components/Login";
import SignUpForm from "../components/Registration";

const Home = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const toggleForm = () => setIsRegistering((prev) => !prev);

  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/src/assets/landing-page/background.jpg')`,
          filter: "contrast(100%) brightness(30%)",
        }}
      ></div>
      <div className="relative z-10 flex flex-col h-full text-white">
        <Navbar />
        <div className="flex flex-col md:flex-row flex-grow items-center justify-center md:justify-between mx-4 md:mx-20 mt-10 md:mt-0">
          <div className="max-w-lg mb-8 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-7xl font-bold knewave-font">Welcome to On The Rocks</h1>
            <p className="text-md md:text-lg mt-2 md:mt-4 poppins-font">
              Browse and order from local liquor stores with ease.
            </p>
            <Link
              to="/order"
              className="mt-4 md:mt-6 inline-block px-6 md:px-8 py-3 md:py-4 text-md md:text-lg font-semibold text-white bg-[#2F2F2F] rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-[#404040]"
            >
              Order Now
            </Link>
            <div className="mt-3 md:mt-4 flex items-center justify-center md:justify-start">
              <span className="text-yellow-400 text-xl md:text-2xl">★★★★★</span>
              <p className="ml-2 text-xs md:text-sm">5 star rating based on 1788 reviews</p>
            </div>
          </div>
          <div className="hidden md:block w-[500px] p-10 border-white rounded-xl bg-opacity-0">
            {isRegistering ? <SignUpForm toggleForm={toggleForm} /> : <LoginForm toggleForm={toggleForm} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
