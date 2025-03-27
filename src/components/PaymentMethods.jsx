import React from "react";
import PaymentCard from "./PaymentCard";

const PaymentMethods = ({
  payments,
  onAddCard,
  onDeleteCard,
  showAddCardForm,
  newCard,
  setNewCard,
  handleAddCard,
  onCancel,
}) => {
  return (
    <div className="mt-6">
      <div className="space-y-4 overflow-y-auto max-h-[300px]">
        {payments.map((payment) => (
          <PaymentCard
            key={payment.id}
            payment={payment}
            onDelete={() => onDeleteCard(payment.id)}
          />
        ))}
      </div>

      {showAddCardForm ? (
        <div className="mt-6 bg-[#2c2c2c] p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Card Type
              </label>
              <select
                className="w-full bg-[#1e1e1e] border border-gray-600 rounded-md p-2 text-white"
                value={newCard.type}
                onChange={(e) =>
                  setNewCard({ ...newCard, type: e.target.value })
                }
              >
                <option value="">Select card type</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Card Number
              </label>
              <input
                type="text"
                className="w-full bg-[#1e1e1e] border border-gray-600 rounded-md p-2 text-white"
                placeholder="1234 5678 9012 3456"
                value={newCard.number}
                onChange={(e) =>
                  setNewCard({ ...newCard, number: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1e1e1e] border border-gray-600 rounded-md p-2 text-white"
                  placeholder="MM/YY"
                  value={newCard.expires}
                  onChange={(e) =>
                    setNewCard({ ...newCard, expires: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1e1e1e] border border-gray-600 rounded-md p-2 text-white"
                  placeholder="123"
                  value={newCard.cvc || ""}
                  onChange={(e) =>
                    setNewCard({ ...newCard, cvc: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                className="w-full bg-[#1e1e1e] border border-gray-600 rounded-md p-2 text-white"
                placeholder="John Doe"
                value={newCard.name}
                onChange={(e) =>
                  setNewCard({ ...newCard, name: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCard}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md text-black font-medium"
                disabled={
                  !newCard.type ||
                  !newCard.number ||
                  !newCard.expires ||
                  !newCard.name
                }
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={onAddCard}
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md flex items-center"
        >
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
      )}
    </div>
  );
};

export default PaymentMethods;
