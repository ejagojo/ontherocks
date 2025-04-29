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
  addDoc,
  updateDoc
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
  // New state for tracking form submission attempts
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Additional local states for separated date/time inputs
  const [selectedDateOnly, setSelectedDateOnly] = useState("");
  const [selectedTimeOnly, setSelectedTimeOnly] = useState("");

  // Name validation regex - must be at least two words
  const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;

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

      for (const docSnap of snapshot.docs) {
        const baseData = docSnap.data();
        if (!firstStoreId) firstStoreId = baseData.storeId;

        const itemRef = doc(db, "stores", baseData.storeId, "items", docSnap.id);
        const itemSnap = await getDoc(itemRef);
        const fullItemData = itemSnap.exists() ? itemSnap.data() : {};

        items.push({
          id: docSnap.id,
          ...fullItemData,
          ...baseData
        });
      }

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

  // Helpers for store hours parsing
  const parseStoreHours = (hoursStr) => {
    if (!hoursStr) return null;
    const cleaned = hoursStr.replace(/[\u2013\u2014]/g, "-");
    const parts = cleaned.split("-").map((p) => p.trim());
    if (parts.length !== 2) {
      return null;
    }
    return { open: parts[0], close: parts[1] };
  };

  const convertTo24Hour = (timeStr) => {
    if (!timeStr) return null;
    const [time, ampm] = timeStr.split(" ");
    const [hh, mm] = time.split(":");
    let hours = parseInt(hh, 10);
    const minutes = parseInt(mm, 10) || 0;
    if (ampm?.toUpperCase() === "PM" && hours < 12) {
      hours += 12;
    }
    if (ampm?.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }
    return { hours, minutes };
  };

  const isWithinOpenHours = (selectedDateTime, openTime, closeTime) => {
    if (!openTime || !closeTime) return true;
    const userHours = selectedDateTime.getHours();
    const userMinutes = selectedDateTime.getMinutes();

    const openMinutesTotal = openTime.hours * 60 + openTime.minutes;
    const closeMinutesTotal = closeTime.hours * 60 + closeTime.minutes;
    const userMinutesTotal = userHours * 60 + userMinutes;

    return userMinutesTotal >= openMinutesTotal && userMinutesTotal <= closeMinutesTotal;
  };

  // Validate and save new card
  const saveNewCard = async () => {
    // Mark that submission was attempted to trigger validation messages
    setSubmitAttempted(true);

    const { type, number, expires, name, cvc } = newCard;
    
    // Check if any required fields are empty
    if (!type || !number || !expires || !name || !cvc) {
      return; // Don't proceed further; errors will be shown inline
    }

    // Remove spaces for validations
    const cardNumber = number.replace(/\s+/g, "");

    // Validate card number length: 13-19 digits
    if (!/^\d{13,19}$/.test(cardNumber)) {
      return; // Error message will be shown inline
    }

    // Validate expiry in MM/YY format
    const expRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const expMatch = expires.match(expRegex);
    if (!expMatch) {
      return; // Error message will be shown inline
    }
    
    // Check if expiry date is in the past
    const expMonth = parseInt(expMatch[1], 10);
    const expYear = parseInt("20" + expMatch[2], 10);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return; // Error message will be shown inline
    }

    // Validate CVC: must be exactly 3 digits
    if (!/^\d{3}$/.test(cvc)) {
      return; // Error message will be shown inline
    }

    // Validate Name
    if (!nameRegex.test(name.trim())) {
      return; // Error message will be shown inline
    }

    const user = auth.currentUser;
    if (!user) return;
    
    // Last 4 digits for UI display
    const lastFour = cardNumber.slice(-4);
    
    const cardData = {
      type: type.toLowerCase(),
      name: name,
      lastFour,
      expires: expires,
      cvc: cvc,
      createdAt: new Date().toISOString()
    };
    
    const userPayRef = collection(db, "users", user.uid, "paymentMethods");
    await addDoc(userPayRef, cardData);
    
    // Reset form and validation state
    setNewCard({ type: "", number: "", expires: "", name: "", cvc: "" });
    setSubmitAttempted(false);
    setShowNewCardForm(false);
  };

  const handleCheckout = async () => {
    const user = auth.currentUser;
    if (!selectedTime) {
      alert("Please select a valid pickup time.");
      return;
    }
    const combinedPickedTime = new Date(selectedTime);
    if (combinedPickedTime < new Date()) {
      alert("Pickup time cannot be in the past.");
      return;
    }

    // Check store hours
    if (storeInfo && storeInfo.hours) {
      const hoursParsed = parseStoreHours(storeInfo.hours);
      if (hoursParsed) {
        const openTime = convertTo24Hour(hoursParsed.open);
        const closeTime = convertTo24Hour(hoursParsed.close);
        if (openTime && closeTime) {
          if (!isWithinOpenHours(combinedPickedTime, openTime, closeTime)) {
            alert(`The time you chose is out of the operating hours for this store, which are ${storeInfo.hours}.`);
            return;
          }
        }
      }
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

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const currentPoints = userDocSnap.data().loyaltyPoints || 0;
      const pointsEarned = Math.floor(subtotal);
      const newPoints = currentPoints + pointsEarned;

      await updateDoc(userDocRef, { loyaltyPoints: newPoints });
      console.log(`Added ${pointsEarned} loyalty points! New total: ${newPoints}`);
    }

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
              Your order has been processed. Here's your summary:
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
                      <button
                        onClick={() => {removeItemFromCart(item.id);
                        }
}
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
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={selectedDateOnly}
                    onChange={(e) => {
                      setSelectedDateOnly(e.target.value);
                      if (e.target.value && selectedTimeOnly) {
                        setSelectedTime(`${e.target.value}T${selectedTimeOnly}`);
                      }
                    }}
                    className="w-full border rounded px-3 py-2 text-sm text-gray-700 outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    value={selectedTimeOnly}
                    onChange={(e) => {
                      setSelectedTimeOnly(e.target.value);
                      if (selectedDateOnly && e.target.value) {
                        setSelectedTime(`${selectedDateOnly}T${e.target.value}`);
                      }
                    }}
                    className="w-full border rounded px-3 py-2 text-sm text-gray-700 outline-none"
                  />
                </div>
              </div>
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
                    {submitAttempted && !newCard.type && (
                      <span className="text-red-500 text-xs">Please select a card type.</span>
                    )}
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
                    {submitAttempted && !newCard.number && (
                      <span className="text-red-500 text-xs">Please enter your card number.</span>
                    )}
                    {submitAttempted &&
                      newCard.number &&
                      !/^\d{13,19}$/.test(newCard.number.replace(/\s+/g, "")) && (
                        <span className="text-red-500 text-xs">
                          Card number must be 13-19 digits.
                        </span>
                      )}
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
                      {submitAttempted && !newCard.expires && (
                        <span className="text-red-500 text-xs">
                          Please fill out the expiry date.
                        </span>
                      )}
                      {submitAttempted &&
                        newCard.expires &&
                        !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(newCard.expires) && (
                          <span className="text-red-500 text-xs">
                            Expiry must be in MM/YY format.
                          </span>
                        )}
                      {submitAttempted &&
                        newCard.expires &&
                        /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(newCard.expires) && (
                          (() => {
                            const expRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
                            const expMatch = newCard.expires.match(expRegex);
                            const expMonth = parseInt(expMatch[1], 10);
                            const expYear = parseInt("20" + expMatch[2], 10);
                            const currentDate = new Date();
                            const currentMonth = currentDate.getMonth() + 1;
                            const currentYear = currentDate.getFullYear();
                            
                            if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                              return (
                                <span className="text-red-500 text-xs">
                                  The expiry date cannot be in the past.
                                </span>
                              );
                            }
                            return null;
                          })()
                        )}
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
                      {submitAttempted && !newCard.cvc && (
                        <span className="text-red-500 text-xs">
                          Please enter the CVC.
                        </span>
                      )}
                      {submitAttempted &&
                        newCard.cvc &&
                        !/^\d{3}$/.test(newCard.cvc) && (
                          <span className="text-red-500 text-xs">
                            CVC must be exactly 3 digits.
                          </span>
                        )}
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
                    {submitAttempted && !newCard.name && (
                      <span className="text-red-500 text-xs">
                        Please enter the name on card.
                      </span>
                    )}
                    {submitAttempted &&
                      newCard.name &&
                      !nameRegex.test(newCard.name.trim()) && (
                        <span className="text-red-500 text-xs">
                          Please enter a valid full name (e.g., John Doe).
                        </span>
                      )}
                  </div>
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => {
                        setShowNewCardForm(false);
                        setNewCard({ type: "", number: "", expires: "", name: "", cvc: "" });
                        setSubmitAttempted(false);
                      }}
                      className="bg-[#5E5E5E] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#878787]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveNewCard}
                      className="bg-[#0A0A28] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#1e1e3e]"
                    >
                      Save Card
                    </button>
                  </div>
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
              Your order has been processed. Here's your summary:
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
