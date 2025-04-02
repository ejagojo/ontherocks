import React from "react";
import Header from "../components/Header";
import LoyaltyBar from "../components/LoyaltyBar";
import BackArrow from "../components/BackArrow";
import LoyaltyRewards from "../components/LoyaltyRewards";
import LoyaltyDeals from "../components/LoyaltyDeals";

const Loyalty = () => {
  return (
    <div className="relative w-full h-auto md:h-screen min-h-screen text-black overflow-y-auto">
      <Header />
      <BackArrow to="/order" />
      <div className="px-4 mt-30 text-left">
        <h1 className="text-4xl font-bold knewave-font mb-6">
          Welcome back John!
        </h1>
        <div className="-mt-20">
          <LoyaltyBar />
        </div>
      </div>

      <hr className="w-full border-t border-black mt-15" />
      <h1 className="text-2xl font-bold knewave-font mb-6 ml-4 mt-4">My Rewards</h1>
      <LoyaltyRewards />

      <hr className="w-full border-t border-black mt-10" />
      <h1 className="text-2xl font-bold knewave-font mb-6 ml-4 mt-4">My Deals</h1>
      <LoyaltyDeals />

    </div>
  );
};

export default Loyalty;
