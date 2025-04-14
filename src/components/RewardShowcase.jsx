import React from "react";
import { Link } from "react-router-dom";

const RewardShowcase = () => {
  return (
    <div className="w-4/5 mx-auto my-8">
      <div className="hidden md:flex justify-center">
        <Link to="/loyalty" className="w-full max-w-4xl">
          <div className="w-full aspect-[3/1] bg-gray-100 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
            <img
              src="/assets/Rewards/reward-4.png"
              alt="Rewards Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>

      <div className="md:hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 py-2">
          <div className="flex-shrink-0 w-[90vw] snap-start">
            <Link to="/loyalty">
              <div className="w-full aspect-[3/1] bg-gray-100 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
                <img
                  src="/assets/Rewards/reward-4.png"
                  alt="Rewards Banner"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardShowcase;
