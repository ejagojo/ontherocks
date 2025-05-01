import React from "react";
import StoreLocator from "./StoreLocator";

const StoreSearchPopup = ({ isOpen, address, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mt-20 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <StoreLocator adrs={address} onClose={onClose} />
      </div>
    </div>
  );
};

export default StoreSearchPopup;
