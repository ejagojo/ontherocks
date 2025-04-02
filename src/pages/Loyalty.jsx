import React from "react";
import Header from "../components/Header";
import LoyaltyBar from "../components/LoyaltyBar";
import banana from "../assets/drinks/99-bananas-50ml.png";
import bacardi from "../assets/drinks/bacardi_raspberry_50ml.png"
import fireball from "../assets/drinks/fireball_50ml.png"
import absolut from "../assets/drinks/absolut_vodka50ml.webp"
import heritage from "../assets/drinks/Heritage_brown_sugar50ml.jpg"
import tito from "../assets/drinks/tito50ml.jpg"
import smirnoff from "../assets/drinks/smirnoff_root_beer50ml.png"

const Loyalty = () => {
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
      <button className="absolute left-2 top-[62%] -translate-y-1/2 z-10 h-12 w-10 flex items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
        ◀
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60">
        <div className="flex items-center ml-2">
          <img src={banana} className="w-24 h-36 -ml-6 mt-4 object-contain" alt="99 Bananas bottle" />
          <div className="ml-2 mt-4">
            <h1 className="font-bold knewave-font">99 Banana Liquor 50ml</h1>
            <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap">
              25 Points
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60">
        <div className="flex items-center ml-2">
          <img src={bacardi} className="w-24 h-36 -ml-6 mt-4 object-contain" alt="Bacardi Raspberry bottle" />
          <div className="ml-2 mt-4">
            <h1 className="font-bold knewave-font">Raspberry Bacardi 50ml</h1>
            <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
              25 Points
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60">
        <div className="flex items-center ml-2">
          <img src={fireball} className="w-24 h-40 -ml-8 mt-4 object-contain" alt="Fireball bottle" />
          <div className="ml-2 mt-4">
            <h1 className="font-bold knewave-font">Fireball Whisky 50ml</h1>
            <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
              25 Points
            </button>

          </div>
        </div>
      </div>
      <button className="absolute right-2 top-[62%] -translate-y-1/2 z-10 h-12 w-10 flex items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
        ▶
      </button>
    </div>


    <hr className="w-full border-t border-black mt-10" />
    <h1 className="text-2xl font-bold knewave-font mb-6 ml-4 mt-4">My Deals</h1>
    <div className="flex gap-38 mt-4 ml-0 justify-center">
      <button className="absolute left-2 top-[95%] -translate-y-1/2 z-10 h-12 w-10 flex items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
        ◀
      </button>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60">
        <div className="flex items-center ml-2">
          <img src={smirnoff} className="w-24 h-40 -ml-6 mt-4 object-contain" alt="Fireball bottle" />
          <div className="ml-2 mt-4">
            <h1 className="font-bold knewave-font">Smirnoff Rootbeer Vodka 50ml</h1>
            <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
              $0.50
            </button>

          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60">
        <div className="flex items-center ml-2">
          <img src={fireball} className="w-24 h-40 -ml-8 mt-4 object-contain" alt="Fireball bottle" />
          <div className="ml-2 mt-4">
            <h1 className="font-bold knewave-font">Fireball Whisky 50ml</h1>
            <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
              $0.50
            </button>

          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60">
        <div className="flex items-center ml-2">
          <img src={tito} className="w-24 h-40 -ml-8 mt-4 object-contain" alt="Fireball bottle" />
          <div className="ml-2 mt-4">
            <h1 className="font-bold knewave-font">Tito Vodka 50ml</h1>
            <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
              $0.50
            </button>

          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-60 h-60">
        <div className="flex items-center ml-2">
          <img src={absolut} className="w-30 h-45 -ml-8 mt-4 object-contain" alt="Fireball bottle" />
          <div className="ml-2 mt-4">
            <h1 className="font-bold knewave-font">Absolut Vodka 50ml</h1>
            <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
              $0.50
            </button>

          </div>
        </div>
      </div>
      <button className="absolute right-2 top-[95%] -translate-y-1/2 z-10 h-12 w-10 flex items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
        ▶
      </button>
    </div>
  </div>
  );
};

export default Loyalty;
