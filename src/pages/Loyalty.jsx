import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoyaltyBar from "../components/LoyaltyBar";
import BackArrow from "../components/BackArrow";
import LoyaltyRewards from "../components/LoyaltyRewards";
import LoyaltyDeals from "../components/LoyaltyDeals";

const Loyalty = () => {
  const [points, setPoints] = useState(50);
    return (
      <div className="relative w-full h-auto md:h-screen min-h-screen text-black overflow-y-auto">
        <Header />
        <BackArrow to="/order" />
        <div className="px-4 mt-30 text-left">
          <h1 className="text-4xl font-bold knewave-font mb-6">
            Welcome back John!
          </h1>
          <div className="-mt-20">
            <LoyaltyBar points = {points}/>
          </div>
        </div>

        <hr className="w-full border-t border-black mt-15" />
        <h1 className="text-2xl font-bold knewave-font mb-6 ml-4 mt-4">My Rewards</h1>
        <LoyaltyRewards points = {points} setPoints = {setPoints}/>

        <hr className="w-full border-t border-black mt-10" />
        <h1 className="text-2xl font-bold knewave-font mb-6 ml-4 mt-4">My Deals</h1>
        <LoyaltyDeals />
        <Footer />
      </div>
  );
};

export default Loyalty;
