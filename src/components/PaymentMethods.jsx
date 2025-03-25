import React from 'react';
import PaymentCard from './PaymentCard';

const PaymentMethods = ({ payments }) => {
  return (
    <div className="mt-6">
      <div className="space-y-4">
        {payments.map((payment) => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>

      <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md flex items-center">
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        ADD CREDIT/DEBIT CARD
      </button>
    </div>
  );
};

export default PaymentMethods;
