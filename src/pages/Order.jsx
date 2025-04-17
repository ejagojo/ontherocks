import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SubNav from "../components/SubNav";
import RewardShowcase from "../components/RewardShowcase";
import StoreCarousel from "../components/StoreCarousel";
import ShopByBrandCarousel from "../components/ShopByDrinkOfTheWeek";
import Footer from "../components/Footer";
import BackArrow from "../components/BackArrow";
import LoadingSpinner from "../components/LoadingSpinner";

const Order = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="relative w-full h-screen text-black">
      <Header />
      <SubNav />
      <BackArrow />
      {/* <RewardShowcase /> */}
      <div className="mx-auto w-4/5 my-8">
        <h2 className="text-xl font-semibold mb-2">Stores Near By</h2>
        <div className="w-full border-b border-gray-300" />
      </div>
      <StoreCarousel />
      <div className="mx-auto w-4/5 my-8">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-semibold">Drinks Of The Week</h2>
          <div className="relative group">
            <div className="w-5 h-5 rounded-full bg-gray-300 text-xs text-center leading-5 cursor-pointer">
              i
            </div>
            <div className="absolute left-6 top-0 w-64 text-xs bg-white text-gray-800 border border-gray-300 rounded p-2 shadow-lg hidden group-hover:block z-50">
              We do not own any of the recipes shown here, nor are we claiming
              any partnership with A Bar Above. These recipes are shown as part
              of a simulated experience and we hope to partner with them if this
              platform goes live.
            </div>
          </div>
        </div>
        <div className="w-full border-b border-gray-300" />
      </div>
      <ShopByBrandCarousel />
      <Footer />
    </div>
  );
};

export default Order;
