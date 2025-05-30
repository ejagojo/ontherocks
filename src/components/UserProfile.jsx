import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileTabs from "./ProfileTabs.jsx";
import OrderHistory from "./OrderHistory";
import PaymentMethods from "./PaymentMethods";
import PlasticBottle from "/assets/drinks/Plastic-Bottle.png";
import Batanga from "/assets/drinks/Batanga-Tequila.png";
import Calumet from "/assets/drinks/Calumet-Farm.png";
import { auth, db } from "../services/firebase";
import { doc, getDoc, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { deleteUser, signOut } from "firebase/auth";
import ProfilePage from "./ProfilePage";
import LoginForm from "./Login";
import SignUpForm from "./Registration";

const drinkImages = {
  "Plastic Bottle Vodka 1L": PlasticBottle,
  "Batanga Tequila Blanco 750ml": Batanga,
  "Calumet Farm 15 Year Old Bourbon": Calumet,
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [newCard, setNewCard] = useState({
    type: "",
    number: "",
    expires: "",
    name: "",
    cvc: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setPaymentMethods([]);
        setOrders([]);
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
      }

      const paymentRef = collection(db, "users", user.uid, "paymentMethods");
      const unsubscribePayments = onSnapshot(paymentRef, (snapshot) => {
        const cards = [];
        snapshot.forEach((doc) => {
          cards.push({ id: doc.id, ...doc.data() });
        });
        setPaymentMethods(cards);
      });

      const ordersRef = collection(db, "users", user.uid, "Orders");
      const unsubscribeOrders = onSnapshot(ordersRef, (snapshot) => {
        const fetchedOrders = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetchedOrders.push({
            id: data.id || doc.id,
            product: data.product,
            status: data.status,
            total: data.total,
            items: data.items || [],
            image: drinkImages[data.product] || "/assets/default-drink.png",
            pickupTime: data.pickupTime || '',
            pickupAddress: data.store?.address || '',
          });
        });
        setOrders(fetchedOrders);
      });

      return () => {
        unsubscribePayments();
        unsubscribeOrders();
      };
    });

    return () => unsubscribeAuth();
  }, []);

  const handleDeleteCard = async (id) => {
    const user = auth.currentUser;
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "paymentMethods", id));
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmed) return;
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete account. Please re-authenticate and try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="bg-white text-white flex items-center justify-center">
      <div className="mx-4 md:mx-10 mt-32 md:w-2/3 bg-[#1e1e1e] rounded-2xl shadow-2xl p-6 md:p-14 h-auto min-h-[80vh]">
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <hr className="border-gray-600 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            {activeTab === "profile" && <ProfilePage />}
            {activeTab === "orders" && <OrderHistory orders={orders} />}
            {activeTab === "payment" && (
              <PaymentMethods
                payments={paymentMethods}
                onAddCard={() => setShowAddCardForm(true)}
                onDeleteCard={handleDeleteCard}
                showAddCardForm={showAddCardForm}
                newCard={newCard}
                setNewCard={setNewCard}
                handleAddCard={() => setShowAddCardForm(false)}
                onCancel={() => setShowAddCardForm(false)}
              />
            )}
          </div>
          <div className="md:col-span-1">
            <div className="bg-[#2c2c2c] rounded-xl p-6 text-center shadow-md ring-1 ring-gray-800">
              <img
                src={photoURL || "/assets/Profile-icon/profile.jpg"}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">
                {firstName || lastName ? `${firstName} ${lastName}`.trim() : "Anonymous User"}
              </h3>
              {isLoggedIn ? (
                <>
                  <button
                    className="bg-red-700 hover:bg-red-800 text-white rounded-full py-2 px-4 w-full mt-4"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="bg-gray-900 hover:bg-gray-800 text-white rounded-full py-2 px-4 w-full mt-2"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowLoginPopup(true)}
                    className="bg-green-700 hover:bg-green-800 text-white rounded-full py-2 px-4 w-full mt-4"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegisterPopup(true)}
                    className="bg-gray-900 hover:bg-gray-800 text-white rounded-full py-2 px-4 w-full mt-2"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="relative bg-[#1e1e1e] p-6 rounded-xl shadow-lg w-full max-w-md">
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
            >
              &times;
            </button>
            <LoginForm toggleForm={() => {
              setShowLoginPopup(false);
              setShowRegisterPopup(true);
            }} />
          </div>
        </div>
      )}

      {showRegisterPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="relative bg-[#1e1e1e] p-6 rounded-xl shadow-lg w-full max-w-[400px] mx-auto my-auto">
            <button
              onClick={() => setShowRegisterPopup(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
            >
              &times;
            </button>
            <SignUpForm toggleForm={() => {
              setShowRegisterPopup(false);
              setShowLoginPopup(true);
            }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
