import React from "react";
import Header from "../components/Header";
import SubNav from "../components/SubNav";

const Order = () => {
  return (
    <div className="relative w-full h-screen text-black">
      <Header />
      <SubNav/>
      <div className="pt-24 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Order Page - Placeholder</h1>
      </div>
    </div>
  );
};

export default Order;
