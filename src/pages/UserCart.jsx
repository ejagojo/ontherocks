import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../services/firebase";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
  getDocs,
  addDoc
} from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import BackArrow from "../components/BackArrow";

const UserCart = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [storeInfo, setStoreInfo] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState("");
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [newCard, setNewCard] = useState({
    type: "",
    number: "",
    expires: "",
    name: "",
    cvc: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const cartRef = collection(db, "users", user.uid, "AddToCartItems");
    const unsubCart = onSnapshot(cartRef, async (snapshot) => {
      const items = [];
      let firstStoreId = null;
      snapshot.forEach((docSnap) => {
        const itemData = { id: docSnap.id, ...docSnap.data() };
        if (!firstStoreId) firstStoreId = itemData.storeId;
        items.push(itemData);
      });
      setCartItems(items);
      if (firstStoreId) {
        const storeDoc = await getDoc(doc(db, "stores", firstStoreId));
        if (storeDoc.exists()) {
          setStoreInfo({ id: storeDoc.id, ...storeDoc.data() });
        }
      }
      setLoading(false);
    });

    const payRef = collection(db, "users", user.uid, "paymentMethods");
    const unsubPayments = onSnapshot(payRef, (snapshot) => {
      const cards = [];
      snapshot.forEach((docSnap) => {
        cards.push({ id: docSnap.id, ...docSnap.data() });
      });
      setPaymentMethods(cards);
    });

    return () => {
      unsubCart();
      unsubPayments();
    };
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1) * item.price,
    0
  );
  const tax = parseFloat((subtotal * 0.156).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  const generateOrderNumber = () => {
    const now = new Date();
    return `#ORD-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}-${Math.floor(Math.random() * 9000 + 1000)}`;
  };

  const removeItemFromCart = async (itemId) => {
    const user = auth.currentUser;
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "AddToCartItems", itemId));
  };

  const handleCheckout = async () => {
    const user = auth.currentUser;
    if (!selectedTime) {
      alert("Please select a pickup time first.");
      return;
    }
    if (!selectedPaymentId && !showNewCardForm) {
      alert("Please select a card or add a new one.");
      return;
    }
    if (!user || cartItems.length === 0 || !storeInfo) return;

    const orderNumber = generateOrderNumber();
    const orderData = {
      orderNumber,
      items: cartItems,
      subtotal,
      tax,
      total,
      pickupTime: selectedTime,
      store: {
        name: storeInfo.name,
        address: storeInfo.address,
        hours: storeInfo.hours || "10:00 AM - 9:00 PM"
      },
      createdAt: new Date().toISOString(),
      status: "AWAITING_PICKUP"
    };

    const ordersRef = collection(db, "users", user.uid, "Orders");
    await addDoc(ordersRef, orderData);

    const cartRef = collection(db, "users", user.uid, "AddToCartItems");
    const cartSnap = await getDocs(cartRef);
    const deletions = cartSnap.docs.map((docSnap) =>
      deleteDoc(doc(db, "users", user.uid, "AddToCartItems", docSnap.id))
    );
    await Promise.all(deletions);

    setCartItems([]);
    setOrderDetails({
      orderNumber,
      pickupTime: selectedTime,
      store: storeInfo,
      subtotal,
      tax,
      total,
      items: cartItems
    });
    setShowSuccess(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 text-black relative">
      <Header />
      <BackArrow />
      {showSuccess && orderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-green-600">Payment Successful!</h2>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  setCartItems([]);
                }}
                className="text-gray-600 hover:text-black"
              >
                &times;
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Your order has been processed. Here’s your summary:
            </p>
            <div className="bg-green-50 rounded p-3 text-sm mb-4">
              <p className="font-semibold">Order Number: {orderDetails.orderNumber}</p>
              <p>Pickup Time: {new Date(orderDetails.pickupTime).toLocaleString()}</p>
              <p>Store: {orderDetails.store.name}</p>
              <p>Address: {orderDetails.store.address}</p>
              <hr className="my-2" />
              <p className="font-semibold mb-1">Order Summary</p>
              {orderDetails.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.name} (x{item.quantity || 1})</span>
                  <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${orderDetails.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mt-1">
                <span>Total</span>
                <span>${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => (window.location.href = "/order")}
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Review Your Order</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-md shadow-md p-5">
              <h2 className="text-lg font-bold mb-4">Cart Items</h2>
              <ul className="divide-y">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 py-3">
                    <img
                      src={item.image_url || "/assets/placeholder.jpg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-600">${item.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">→ {item.type || "Alcohol"}</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-sm font-semibold">Qty: {item.quantity || 1}</p>
                        <button
                            onClick={() => removeItemFromCart(item.id)}
                            className="text-red-500 text-xs hover:underline mt-1"
                        >
                            Remove
                        </button>
                    </div>
                    <div className="text-sm font-semibold text-right">
                      Qty: {item.quantity || 1}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t pt-4 space-y-2 text-sm text-gray-800 font-medium">
                <div className="flex justify-between">
                  <span>SubTotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {storeInfo && (
              <div className="bg-white rounded-md shadow-md p-5">
                <h2 className="text-lg font-bold mb-3">Pickup Location</h2>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-semibold">Store:</span> {storeInfo.name}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span> {storeInfo.address}
                  </p>
                  <p>
                    <span className="font-semibold">Hours:</span> {storeInfo.hours || "10:00 AM - 9:00 PM"}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-md shadow-md p-5">
              <h2 className="text-lg font-bold mb-3">Select Pickup Time</h2>
              <input
                type="datetime-local"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm text-gray-700 outline-none"
              />
            </div>

            <div className="bg-white rounded-md shadow-md p-5">
              <h2 className="text-lg font-bold mb-3">Payment Method</h2>
              {paymentMethods.length === 0 && !showNewCardForm && (
                <p className="text-sm text-gray-600 mb-2">
                  No cards on file. Add one below.
                </p>
              )}
              <div className="mb-4 flex flex-col space-y-2">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedPaymentId === method.id}
                      onChange={() => {
                        setSelectedPaymentId(method.id);
                        setShowNewCardForm(false);
                      }}
                    />
                    <span className="text-sm text-gray-700">
                      {method.type.toUpperCase()} ending with {method.lastFour} — Expires {method.expires}
                    </span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="new"
                    checked={showNewCardForm}
                    onChange={() => {
                      setShowNewCardForm(true);
                      setSelectedPaymentId("");
                    }}
                  />
                  <span className="text-sm text-gray-700">Use new card</span>
                </label>
              </div>
              {showNewCardForm && (
                <div className="mt-4 border-t pt-4 space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Card Type
                    </label>
                    <select
                      className="border rounded px-3 py-2 text-sm w-full"
                      value={newCard.type}
                      onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
                    >
                      <option value="">Select card type</option>
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="border rounded px-3 py-2 text-sm w-full"
                      placeholder="1234 5678 9012 3456"
                      value={newCard.number}
                      onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <label className="block text-sm text-gray-700 mb-1">
                        Expires
                      </label>
                      <input
                        type="text"
                        className="border rounded px-3 py-2 text-sm w-full"
                        placeholder="MM/YY"
                        value={newCard.expires}
                        onChange={(e) => setNewCard({ ...newCard, expires: e.target.value })}
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        className="border rounded px-3 py-2 text-sm w-full"
                        placeholder="123"
                        value={newCard.cvc}
                        onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      className="border rounded px-3 py-2 text-sm w-full"
                      placeholder="John Doe"
                      value={newCard.name}
                      onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                    />
                  </div>
                  <button
                    onClick={async () => {
                      const user = auth.currentUser;
                      if (!user) return;
                      const lastFour = newCard.number.replace(/\s+/g, "").slice(-4);
                      const cardData = {
                        type: newCard.type.toLowerCase(),
                        name: newCard.name,
                        lastFour,
                        expires: newCard.expires,
                        cvc: newCard.cvc,
                        createdAt: new Date().toISOString()
                      };
                      const userPayRef = collection(db, "users", user.uid, "paymentMethods");
                      await addDoc(userPayRef, cardData);
                      setNewCard({ type: "", number: "", expires: "", name: "", cvc: "" });
                      setShowNewCardForm(false);
                    }}
                    className="bg-[#0A0A28] text-white mt-3 px-4 py-2 rounded text-sm font-semibold hover:bg-[#1e1e3e]"
                    disabled={
                      !newCard.type ||
                      !newCard.number ||
                      !newCard.expires ||
                      !newCard.name
                    }
                  >
                    Save Card
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <button
              className="w-full bg-[#0A0A28] text-white py-2 text-sm font-semibold rounded hover:bg-[#1e1e3e] transition-colors"
              onClick={handleCheckout}
            >
              Checkout
            </button>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-semibold text-sm mb-2">Stay Updated</h3>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full mb-2 px-3 py-2 rounded border text-sm outline-none"
              />
              <button className="w-full bg-[#0A0A28] text-white py-2 text-sm font-semibold rounded hover:bg-[#1e1e3e] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {showSuccess && orderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-green-600">Payment Successful!</h2>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  setCartItems([]);
                }}
                className="text-gray-600 hover:text-black"
              >
                &times;
              </button>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Your order has been processed. Here’s your summary:
            </p>
            <div className="bg-green-50 rounded p-3 text-sm mb-4">
              <p className="font-semibold">
                Order Number: {orderDetails.orderNumber}
              </p>
              <p>
                Pickup Time: {new Date(orderDetails.pickupTime).toLocaleString()}
              </p>
              <p>Store: {orderDetails.store.name}</p>
              <p>Address: {orderDetails.store.address}</p>
              <hr className="my-2" />
              <p className="font-semibold mb-1">Order Summary</p>
              {orderDetails.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.name} (x{item.quantity || 1})</span>
                  <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${orderDetails.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mt-1">
                <span>Total</span>
                <span>${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => (window.location.href = "/order")}
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;
