import React, { useState } from 'react';
import ProfileTabs from './ProfileTabs';
import OrderHistory from './OrderHistory';
import PaymentMethods from './PaymentMethods';
import PlasticBottle from "../assets/drinks/Plastic-Bottle.png";
import Batanga from "../assets/drinks/Batanga-Tequila.png";
import Calumet from "../assets/drinks/Calumet-Farm.png";
import profile from "../assets/Profile-icon/profile.jpg";

const orderData = [
  {
    id: '#ORD-2025-1234',
    product: 'Plastic Bottle Vodka 1L',
    status: 'PENDING',
    total: '$15',
    image: PlasticBottle,
  },
  {
    id: '#ORD-2025-5678',
    product: 'Batanga Tequila Blanco 750ml',
    status: 'PICKED UP',
    total: '$29.99',
    image: Batanga,
  },
  {
    id: '#ORD-2025-1357',
    product: 'Calumet Farm 15 Year Old Bourbon',
    status: 'CANCELED',
    total: '$143.99',
    image: Calumet,
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
    <div className="min-h-screen bg-white text-white flex items-center justify-center">
      <div className="w-full max-w-[1400px] mx-auto bg-[#1e1e1e] rounded-2xl shadow-2xl p-14 max-h-[800px]">
        
        {/* Tabs (Profile/Orders/Payment) */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Horizontal line right below the tabs */}
        <hr className="border-gray-600 mb-6" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left: Main Tabs & Content */}
          <div className="md:col-span-3">
            {activeTab === 'profile' && (
              <div className="p-4">
                <h2 className="text-xl font-bold text-yellow-400">Profile Content</h2>
              </div>
            )}
            {activeTab === 'orders' && <OrderHistory orders={orderData} />}
            {activeTab === 'payment' && <PaymentMethods payments={paymentData} />}
          </div>

          {/* Right: Sidebar Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-[#2c2c2c] rounded-xl p-6 text-center shadow-md ring-1 ring-gray-800">
              <img
                src={profile}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
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
