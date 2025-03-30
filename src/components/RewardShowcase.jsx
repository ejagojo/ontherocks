import React from "react";
import { Link } from "react-router-dom";

const RewardShowcase = () => {
  const rewards = [
    { id: 1, img: "/assets/Rewards/reward1.png", title: "Reward 1" },
    { id: 2, img: "/assets/Rewards/reward2.png", title: "Reward 2" },
    { id: 3, img: "/assets/Rewards/reward3.png", title: "Reward 3" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {rewards.map((item) => (
        <Link key={item.id} to="/loyalty">
          <div className="w-96 h-52 bg-gray-100 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RewardShowcase;
