import React, { useState } from 'react';
import ProfileTabs from './ProfileTabs';
import OrderHistory from './OrderHistory';
import PaymentMethods from './PaymentMethods';

// Sample data
const orderData = [
  {
    id: '#ORD-2025-1234',
    product: 'Plastic Bottle Vodka 1L',
    status: 'PENDING',
    total: '$15',
    image: '/images/vodka.png',
  },
  {
    id: '#ORD-2025-5678',
    product: 'Batanga Tequila Blanco 750ml',
    status: 'PICKED UP',
    total: '$29.99',
    image: '/images/tequila.png',
  },
  {
    id: '#ORD-2025-1357',
    product: 'Calumet Farm 15 Year Old Bourbon',
    status: 'CANCELED',
    total: '$143.99',
    image: '/images/bourbon.png',
  },
];

const paymentData = [
  {
    id: 1,
    type: 'mastercard',
    lastFour: '2468',
    expires: '12/29',
    name: 'John Doe',
  },
  {
    id: 2,
    type: 'visa',
    lastFour: '1357',
    expires: '12/27',
    name: 'John Doe',
  },
];

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-80 rounded-lg shadow-xl p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="On The Rocks" className="h-12" />
            <div className="flex items-center bg-gray-700 rounded-full px-3 py-1">
              <span className="text-sm">123 Lowell St</span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-sm">Pick up</span>
            </div>
          </div>

          {/* Search and Cart */}
          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="relative">
              <div className="h-5 w-5 bg-red-600 rounded-full absolute -top-1 -right-1 flex items-center justify-center text-xs">
                2
              </div>
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>

            <div className="w-10 h-10 rounded-full bg-gray-400"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex">
          <div className="w-full md:w-3/4">
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === 'profile' && (
              <div className="p-4">
                <h2 className="text-xl font-bold">Profile Content</h2>
              </div>
            )}

            {activeTab === 'orders' && <OrderHistory orders={orderData} />}

            {activeTab === 'payment' && <PaymentMethods payments={paymentData} />}
          </div>

          {/* Sidebar */}
          <div className="hidden md:block md:w-1/4 ml-6">
            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 text-center">
              <div className="w-32 h-32 rounded-full bg-gray-400 mx-auto"></div>
              <h3 className="text-xl mt-4">John Doe</h3>
              <button className="bg-red-700 hover:bg-red-800 text-white rounded-full py-2 px-4 w-full mt-4">
                Delete Account
              </button>
              <button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full py-2 px-4 w-full mt-2">
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
