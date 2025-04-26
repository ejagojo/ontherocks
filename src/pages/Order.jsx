import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SubNav from "../components/SubNav";
import RewardShowcase from "../components/RewardShowcase";
import StoreCarousel from "../components/StoreCarousel";
import ShopByBrandCarousel from "../components/ShopByDrinkOfTheWeek";
import Footer from "../components/Footer";
import BackArrow from "../components/BackArrow";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const Order = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="relative w-full min-h-screen text-black bg-gray-50">
      <Header />
      <SubNav />
      <BackArrow />

      <div className="w-full bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 py-12 mb-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Find Your Favorite Liquor Fast</h1>
          <p className="text-md md:text-lg text-gray-700">Order for pickup from top stores in your area</p>
        </div>
      </div>

      <RewardShowcase />

      <div className="mx-auto w-4/5 my-12">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-white text-2xl font-bold">1</div>
            <p className="mt-4 font-semibold">Browse</p>
            <p className="text-sm text-gray-600">Find your favorite liquor stores</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-white text-2xl font-bold">2</div>
            <p className="mt-4 font-semibold">Pick</p>
            <p className="text-sm text-gray-600">Choose your favorite drinks</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-white text-2xl font-bold">3</div>
            <p className="mt-4 font-semibold">Checkout</p>
            <p className="text-sm text-gray-600">Fast and easy payment</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-white text-2xl font-bold">4</div>
            <p className="mt-4 font-semibold">Pickup</p>
            <p className="text-sm text-gray-600">Grab your order in-store</p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-4/5 my-8">
        <h2 className="text-xl font-semibold mb-2">Stores Near By</h2>
        <div className="w-full border-b border-gray-300" />
      </div>
      <StoreCarousel />

      <div className="mx-auto w-4/5 my-12 bg-yellow-100 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">🔥 Featured Deal</h2>
          <p className="text-gray-700 mb-4">Get 20% off your first pickup order. Limited time only!</p>
          <Link to="/order" className="inline-block px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
            Order Now
          </Link>
        </div>
      </div>

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

      <div className="mx-auto w-4/5 my-12 bg-blue-50 p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">🎁 Earn Rewards with Every Order</h2>
        <p className="text-gray-700 mb-4">Join our loyalty program and unlock exclusive perks.</p>
        <Link to="/loyalty" className="inline-block px-6 py-2 bg-[#2F2F2F] text-white font-semibold rounded-lg hover:bg-[#404040] transition">
          Learn More
        </Link>
      </div>

      <div className="mx-auto w-4/5 my-12">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded-md shadow-md">
            <summary className="cursor-pointer font-semibold">What stores can I order from?</summary>
            <p className="mt-2 text-sm text-gray-600">You can order from any store listed in your area based on your pickup location.</p>
          </details>
          <details className="bg-white p-4 rounded-md shadow-md">
            <summary className="cursor-pointer font-semibold">Is there a delivery option?</summary>
            <p className="mt-2 text-sm text-gray-600">Currently we offer pickup only. Delivery options are coming soon!</p>
          </details>
          <details className="bg-white p-4 rounded-md shadow-md">
            <summary className="cursor-pointer font-semibold">How do loyalty points work?</summary>
            <p className="mt-2 text-sm text-gray-600">Every dollar you spend earns points that can be redeemed for rewards.</p>
          </details>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Order;
