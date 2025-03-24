import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo/Logo.png";


const OrderPageNavbar = () => {


  return (
    <nav className="absolute top-0 left-0 w-full p-6 bg-transparent h-16 flex items-center justify-between z-50">
        <div className="flex item-center">
            <Link to="/">
                <img src={Logo} alt="Order Page On The Rocks Logo" className="h-40 w-auto" />
            </Link>
        </div>
        <div className="hideen md:flex gap-8">
            
        </div>
    </nav>
  );
};

export default OrderPageNavbar;
