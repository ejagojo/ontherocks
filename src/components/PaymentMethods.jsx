import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../services/firebase";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
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
  const auth = getAuth();
  // Track if the user has attempted to submit
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const addCardToFirestore = async () => {
    // Mark that submission was attempted so error messages are shown
    setSubmitAttempted(true);

    const { type, number, expires, name, cvc } = newCard;
    if (!type || !number || !expires || !name || !cvc) {
      // Do not proceed further; errors will be shown inline.
      return;
    }

    // Remove spaces for validations
    const cardNumber = number.replace(/\s+/g, "");

    // Validate card number length: 13-19 digits
    if (!/^\d{13,19}$/.test(cardNumber)) {
      alert("Please enter a valid card number with 13 to 19 digits.");
      return;
    }

    // Validate expiry in MM/YY format
    const expRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const expMatch = expires.match(expRegex);
    if (!expMatch) {
      alert("Expiry date must be in MM/YY format with a valid month (01-12).");
      return;
    }
    const expMonth = parseInt(expMatch[1], 10);
    const expYear = parseInt("20" + expMatch[2], 10);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      alert("The expiry date cannot be in the past.");
      return;
    }

    // Validate CVC: must be exactly 3 digits
    if (!/^\d{3}$/.test(cvc)) {
      alert("CVC must be exactly 3 digits (e.g., 123).");
      return;
    }

    // Last 4 digits for UI display
    const lastFour = cardNumber.slice(-4);

    const cardData = {
      type,
      name,
      lastFour,
      expires,
      cvc,
      createdAt: new Date().toISOString(),
    };

    try {
      const user = auth.currentUser;
      if (!user) return;
      const userPaymentsRef = collection(db, "users", user.uid, "paymentMethods");
      await addDoc(userPaymentsRef, cardData);
      setNewCard({ type: "", number: "", expires: "", name: "", cvc: "" });
      setSubmitAttempted(false);
      handleAddCard();
    } catch (error) {
      console.error("Error adding card to Firestore:", error);
    }
  };

  const deleteCardFromFirestore = async (cardId) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const cardRef = doc(db, "users", user.uid, "paymentMethods", cardId);
      await deleteDoc(cardRef);
      onDeleteCard(cardId);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div className="mt-6">
      <div className="space-y-4 overflow-y-auto max-h-[300px]">
        {payments.map((payment) => (
          <PaymentCard
            key={payment.id}
            payment={payment}
            onDelete={() => deleteCardFromFirestore(payment.id)}
          />
        ))}
      </div>

      {showAddCardForm ? (
        <div className="mt-6 bg-[#2c2c2c] p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
          <div className="space-y-4">
            {/* Card Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Card Type
              </label>
              <select
                className="w-full bg-[#1e1e1e] border border-gray-600 rounded-md p-2 text-white"
                value={newCard.type}
                onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
              >
                <option value="">Select card type</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
              </select>
              {submitAttempted && !newCard.type && (
                <span className="text-red-500 text-xs">Please fill out the card type.</span>
              )}
            </div>

            {/* Card Number */}
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
              {submitAttempted && !newCard.number && (
                <span className="text-red-500 text-xs">Please enter your card number.</span>
              )}
            </div>

            {/* Expiry Date and CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Expiry Date (MM/YY)
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
                {submitAttempted && !newCard.expires && (
                  <span className="text-red-500 text-xs">Please fill out the expiry date.</span>
                )}
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
                {submitAttempted && !newCard.cvc && (
                  <span className="text-red-500 text-xs">Please enter the CVC.</span>
                )}
              </div>
            </div>

            {/* Name on Card */}
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
              {submitAttempted && !newCard.name && (
                <span className="text-red-500 text-xs">Please enter the name on card.</span>
              )}
            </div>

            {/* Form buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={addCardToFirestore}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md text-black font-medium"
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