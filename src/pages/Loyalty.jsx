import React from "react";
import Header from "../components/Header";
import LoyaltyBar from "../components/LoyaltyBar";

const Loyalty = () => {
  const rewards = [
    
  ];

  const deals = [

  ];
  return (
    <div className="relative w-full h-screen text-black">
    <Header />
    <div className="px-4 mt-30 text-left">
      <h1 className="text-4xl font-bold knewave-font mb-6">
        Welcome back John!
      </h1>
      <div class="-mt-20">
        <LoyaltyBar />
      </div>
    </div>
    <hr className="w-full border-t border-black mt-15" /> 
    <h1 className="text-2xl font-bold knewave-font mb-6 ml-4 mt-4">My Rewards</h1>
    <div className="flex gap-38 mt-4 ml-0 justify-center">
      <button className="absolute left-2 top-[40%] -translate-y-1/2 z-10 h-12 w-10 flex items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
        ◀
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60"></div>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60"></div>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60"></div>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60"></div>
      <button className="absolute right-2 top-[40%] -translate-y-1/2 z-10 h-12 w-10 flex items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
        ▶
      </button>
    </div>


    <hr className="w-full border-t border-black mt-10" />
    <h1 className="text-2xl font-bold knewave-font mb-6 ml-4 mt-4">My Deals</h1>
    <div className="flex gap-38 mt-4 ml-0 justify-center">
      <button className="absolute left-2 top-[80%] -translate-y-1/2 z-10 h-12 w-10 flex items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
        ◀
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60"></div>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60"></div>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60"></div>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60"></div>
      <button className="absolute right-2 top-[80%] -translate-y-1/2 z-10 h-12 w-10 flex items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
        ▶
      </button>
    </div>
  </div>
  );
};

export default Loyalty;