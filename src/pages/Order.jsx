import React from "react";
import Header from "../components/Header";
import SubNav from "../components/SubNav";
import RewardShowcase from "../components/RewardShowcase";
import StoreCarousel from "../components/StoreCarousel";
import ShopByBrandCarousel from "../components/ShopByBrandCarousel";
import Footer from "../components/Footer";
import BackArrow from "../components/BackArrow";

const Order = () => {
  return (
    <div className="relative w-full h-screen text-black">
      <Header />
      <SubNav />
      <BackArrow />

      <RewardShowcase />
      <div className="mx-auto w-4/5 my-8">
        <h2 className="text-xl font-semibold mb-2">Stores Near By</h2>
        <div className="w-full border-b border-gray-300" />
      </div>
      <StoreCarousel />
      <div className="mx-auto w-4/5 my-8">
        <h2 className="text-xl font-semibold mb-2">Shop By Brand</h2>
        <div className="w-full border-b border-gray-300" />
      </div>
      <ShopByBrandCarousel />
      <Footer />
    </div>
  );
};

export default Order;
