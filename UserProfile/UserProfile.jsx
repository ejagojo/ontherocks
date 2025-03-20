import React, { useState } from 'react';
import ProfileTabs from "./ProfileTabs";
import OrderHistory from "./OrderHistory";
import PaymentMethods from "./PaymentMethods";
import "./UserProfile.css";

// Sample data based on the prototype
const orderData = [
    {
        id: '#ORD-2025-1234',
        product: 'Plastic Bottle Vodka 1L',
        status: 'PENDING',
        total: '$15',
        image: '/image/vodka.png' 
    },

    {
        id: '#ORD-2025-5678',
        product: 'Batanga Tequila Blanco 750ml',
        status: 'PICKED UP',
        total: '$29.99',
        image: '/images/tequila.png'
    },

    {
        id: '#ORD-2025-1357',
        product: 'Calumet Farm 15 Year Old Bourbon',
        status: 'CANCELED',
        total: '$143.99',
        image: '/images/bourbon.png'
    }
];

const paymentData = [
    {
        id: 1,
        type: 'mastercard',
        lastFour: '2468',
        expires: '12/29',
        name: 'John Doe'
      },
      {
        id: 2,
        type: 'visa',
        lastFour: '1357',
        expires: '12/27',
        name: 'John Doe'
      }
];

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('orders'); // Default to orders tab

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="header-container">
                    <div className="flex items-center">
                        <img src="/logo.png" alt="On The Rocks" className="h-12" />
                        <div className="location-badge">
                            <span className="text-sm">123 Lowell st</span>
                            <span className="mx-2 text-gray-400">|</span>
                            <span className="text-sm">Pick up</span>
                        </div>
                    </div>

                    <div className="flex items-center mt-4 md:mt-0">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search"
                                className="search-input"
                            />
                            <svg
                                className="search-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>

                        <div className="relative ml-4">
                            <div className="cart-badge">2</div>
                            <svg 
                                className="h-6 w-6 text-white" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                        </div>

                        <div className="ml-4">
                            <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                        </div>
                    </div>
                </div>

                <div className="content-wrapper">
                    <div className="main-content">
                        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                        {activeTab == "profile" && (
                            <div className="p-4">
                                <h2 className="text-x1 font-bold">Profile Content</h2>
                                {/* Profile content would go here */}
                            </div>    
                        )}
                        {activeTab === "order" && <OrderHistory orders={orderData} />}

                        {activeTab === "payment" && <PaymentMethods payments={paymentData} />}
                    </div>

                    <div className="sidebar">
                        <div className="profile-sidebar">
                            <div className="avatar-placeholder"></div>
                            <h3 className="text-xl mt-4">John Doe</h3>
                            <button className="delete-button">
                                Delete Account
                            </button>
                            <button className="signout-button">
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;