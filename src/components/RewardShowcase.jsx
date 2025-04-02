import React from "react";
import { Link } from "react-router-dom";

const RewardShowcase = () => {
  const rewards = [
    { id: 1, img: "/assets/Rewards/reward1.png", title: "Reward 1" },
    { id: 2, img: "/assets/Rewards/reward2.png", title: "Reward 2" },
    { id: 3, img: "/assets/Rewards/reward3.png", title: "Reward 3" },
  ];

  return (
    <div className="w-4/5 mx-auto my-8">
      {/* desktop version: grid */}
      <div className="hidden md:flex flex-wrap justify-center gap-6">
        {rewards.map((item) => (
          <Link key={item.id} to="/loyalty">
            <div className="w-60 h-30 bg-gray-100 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        ))}

      </div>

      {/* mobile version: carousel */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 py-2">
          {rewards.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-60 h-30 snap-start">
              <Link to="/loyalty">
                <div className="w-60 h-30 bg-gray-100 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardShowcase;
