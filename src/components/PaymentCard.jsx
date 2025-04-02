import React from "react";

const PaymentCard = ({ payment, onDelete }) => {
  const getLogoClass = (type) => {
    switch (type) {
      case "mastercard":
        return "bg-yellow-500";
      case "visa":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getLogoText = (type) => {
    switch (type) {
      case "mastercard":
        return "MC";
      case "visa":
        return "VISA";
      default:
        return "CARD";
    }
  };

  return (
    <div className="bg-[#000021] bg-opacity-50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-6">
            <div
              className={`${getLogoClass(
                payment.type
              )} text-white rounded px-1 py-0.5 text-xs text-center`}
            >
              {getLogoText(payment.type)}
            </div>
          </div>
          <div className="ml-4">
            <p className="text-white">{payment.name}</p>
            <div className="text-sm text-blue-400">
              Ending with {payment.lastFour}
            </div>
            <div className="text-xs text-gray-400">
              Expires {payment.expires}
            </div>
          </div>
        </div>
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => onDelete(payment.id)}
          aria-label="Delete card"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
