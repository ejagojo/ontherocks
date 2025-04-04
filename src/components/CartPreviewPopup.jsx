import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import { db } from "../services/firebase";
import {
  doc,
  deleteDoc,
  getDoc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CartPreviewPopup = ({ cartItems: initialCartItems, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const enrichItems = async () => {
      const enriched = [];
      for (const item of initialCartItems) {
        const itemRef = doc(db, "stores", item.storeId, "items", item.id);
        const fullSnap = await getDoc(itemRef);
        const fullData = fullSnap.exists() ? fullSnap.data() : {};
        enriched.push({
          ...fullData,
          ...item
        });
      }
      setCartItems(enriched);
      setLoading(false);
    };

    enrichItems();
  }, [initialCartItems]);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1) * item.price,
    0
  );

  const removeItemFromCart = async (itemId) => {
    const user = auth.currentUser;
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "AddToCartItems", itemId));
  };

  if (loading) {
    return (
      <div className="absolute top-14 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-80 max-h-96 overflow-y-auto">
        <div className="p-4 text-center text-sm text-gray-500">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="absolute top-14 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-80 max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <span className="font-semibold text-lg">Your Cart</span>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-black"
        >
          &times;
        </button>
      </div>
      {cartItems.length === 0 ? (
        <div className="px-4 py-6 text-center text-gray-500">Cart is empty.</div>
      ) : (
        <>
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                <img
                  src={item.image_url || "/assets/placeholder.jpg"}
                  alt={item.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-gray-600 text-xs">{item.brand}</p>
                  <p className="text-gray-600 text-xs">Qty: {item.quantity || 1}</p>
                </div>
                <div className="text-sm font-semibold text-right">
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </div>
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className="text-red-500 text-xs hover:underline mt-1"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="px-4 py-3 border-t text-sm font-medium text-gray-700 flex justify-between">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="px-4 pb-4">
            <button
              className="w-full bg-black text-white py-2 text-sm font-semibold rounded hover:bg-gray-900 transition-colors"
              onClick={() => {
                onClose();
                navigate("/cart");
              }}
            >
              View Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

CartPreviewPopup.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image_url: PropTypes.string,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number,
      storeId: PropTypes.string
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired
};

export default CartPreviewPopup;
