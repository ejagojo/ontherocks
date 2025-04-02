import React, { useState, useEffect } from "react";
import ProfileTabs from "./ProfileTabs.jsx";
import OrderHistory from "./OrderHistory";
import PaymentMethods from "./PaymentMethods";
import PlasticBottle from "/assets/drinks/Plastic-Bottle.png";
import Batanga from "/assets/drinks/Batanga-Tequila.png";
import Calumet from "/assets/drinks/Calumet-Farm.png";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import ProfilePage from "./ProfilePage";

// Example order data
const orderData = [
  {
    id: "#ORD-2025-1234",
    product: "Plastic Bottle Vodka 1L",
    status: "PENDING",
    total: "$15",
    image: PlasticBottle,
  },
  {
    id: "#ORD-2025-5678",
    product: "Batanga Tequila Blanco 750ml",
    status: "PICKED UP",
    total: "$29.99",
    image: Batanga,
  },
  {
    id: "#ORD-2025-1357",
    product: "Calumet Farm 15 Year Old Bourbon",
    status: "CANCELED",
    total: "$143.99",
    image: Calumet,
  },
];

const UserProfile = () => {
  // Manage which tab is active
  const [activeTab, setActiveTab] = useState("profile");

  // Payment state
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "mastercard",
      lastFour: "2468",
      expires: "12/29",
      name: "John Doe",
    },
    {
      id: 2,
      type: "visa",
      lastFour: "1357",
      expires: "12/27",
      name: "John Doe",
    },
  ]);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [newCard, setNewCard] = useState({
    type: "",
    number: "",
    expires: "",
    name: "",
    cvv: "",
  });

  // Sidebar user info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoURL, setPhotoURL] = useState(""); // Optionally store a user photo

  // Fetch user info on mount
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return; // Not logged in
    const docRef = doc(db, "users", currentUser.uid);

    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        // If you store an avatar in Firestore, do:
        // setPhotoURL(data.photoURL || "");
      }
    });
  }, []);

  // Add a new card
  const handleAddCard = () => {
    const lastFour = newCard.number.slice(-4);
    const newPaymentMethod = {
      id: Date.now(),
      type: newCard.type.toLowerCase(),
      lastFour,
      expires: newCard.expires,
      name: newCard.name,
    };
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setNewCard({ type: "", number: "", expires: "", name: "", cvv: "" });
    setShowAddCardForm(false);
  };

  // Delete card
  const handleDeleteCard = (id) => {
    setPaymentMethods((prev) => prev.filter((card) => card.id !== id));
  };

  // Delete account (placeholder logic)
  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // Here you could call a backend function or Firebase Admin to delete user
      // For now, just navigate away
      window.location.href = "/";
    }
  };

  return (
    <div className="bg-white text-white flex items-center justify-center">
      <div className="mx-10 w-full bg-[#1e1e1e] rounded-2xl shadow-2xl p-14 h-auto min-h-[80vh]">
        {/* Tabs (Profile/Orders/Payment) */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* Horizontal line below the tabs */}
        <hr className="border-gray-600 mb-6" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left: Main Tabs & Content */}
          <div className="md:col-span-3">
            {activeTab === "profile" && <ProfilePage />}
            {activeTab === "orders" && <OrderHistory orders={orderData} />}
            {activeTab === "payment" && (
              <PaymentMethods
                payments={paymentMethods}
                onAddCard={() => setShowAddCardForm(true)}
                onDeleteCard={handleDeleteCard}
                showAddCardForm={showAddCardForm}
                newCard={newCard}
                setNewCard={setNewCard}
                handleAddCard={handleAddCard}
                onCancel={() => setShowAddCardForm(false)}
              />
            )}
          </div>

          {/* Right: Sidebar Profile Info */}
          <div className="md:col-span-1">
            <div className="bg-[#2c2c2c] rounded-xl p-6 text-center shadow-md ring-1 ring-gray-800">
              {/* If you have photoURL from Firestore or from user object */}
              <img
                src={
                  photoURL ||
                  "/assets/Profile-icon/profile.jpg" // fallback image
                }
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">
                {firstName || lastName
                  ? `${firstName} ${lastName}`.trim()
                  : "Anonymous User"}
              </h3>

              {/* Delete Account */}
              <button
                className="bg-red-700 hover:bg-red-800 text-white rounded-full py-2 px-4 w-full mt-4"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>

              {/* Sign Out (placeholder) */}
              <a href="/">
                <button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full py-2 px-4 w-full mt-2">
                  Sign out
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
