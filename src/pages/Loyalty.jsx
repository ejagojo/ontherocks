import React, { useState, useEffect } from 'react';
import {auth, db} from '../services/firebase'
import {doc, getDoc} from 'firebase/firestore'
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoyaltyBar from "../components/LoyaltyBar";
import BackArrow from "../components/BackArrow";
import LoyaltyRewards from "../components/LoyaltyRewards";
import LoyaltyDeals from "../components/LoyaltyDeals";
import LoadingSpinner from '../components/LoadingSpinner';

const Loyalty = () => {
  const [points, setPoints] = useState(null);
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getLoyaltyPoints = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setPoints(userData.loyaltyPoints);
          setUserName(userData.firstName);
        } else {
          console.log("No user document found.");
        }
      } else {
        console.log("User not logged in.");
      }
    };

    getLoyaltyPoints();
  }, []);

  if (loading) return <LoadingSpinner />;

    return (
      <div className="relative w-full h-auto md:h-screen min-h-screen text-black overflow-y-auto">
        <Header />
        <BackArrow to="/order" />
        <div className="mx-auto w-4/5 mt-30 text-left">
          <h1 className="text-4xl font-bold knewave-font mb-6">
            Welcome back {userName}!
          </h1>
          <div className="-mt-20">
            <LoyaltyBar points = {points}/>
          </div>
        </div>

        <div className="mx-auto w-4/5 my-8 relative">
          <h1 className="text-xl font-semibold font-sans mb-6 mt-4">My Rewards</h1>
          <hr className="w-full border-t border-gray-300 mb-4" />
          <LoyaltyRewards points={points} setPoints={setPoints} />
        </div>

        <div className="mx-auto w-4/5 my-8 relative">
          <h1 className="text-xl font-semibold font-sans mb-6 mt-4">My Deals</h1>
          <hr className="w-full border-t border-gray-300 mb-4" />
          <LoyaltyDeals />
        </div>
        <Footer />
      </div>
  );
};

export default Loyalty;
