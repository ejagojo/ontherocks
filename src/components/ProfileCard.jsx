import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

// If you want to store the profile image in Firestore, you can load it similarly.
// For now, we accept imageUrl as a prop and default to a placeholder if none provided.

const ProfileCard = ({ imageUrl, description }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return; // Not logged in, optionally handle accordingly

      try {
        const docRef = doc(db, "users", currentUser.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const displayName = `${firstName} ${lastName}`.trim() || "Anonymous User";

  return (
    <motion.div
      className="flex flex-col items-center max-w-sm rounded-xl shadow-lg mx-3 bg-gradient-to-br from-yellow-900 to-amber-500 mt-20 relative select-none"
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Profile Image container */}
      <div className="absolute -top-20">
        <img
          className="rounded-full border-4 border-amber-500 border-double w-50 h-40 object-cover"
          src={
            imageUrl ||
            "https://via.placeholder.com/150?text=No+Profile+Image"
          }
          alt="profile"
        />
      </div>

      {/* Text content */}
      <div className="px-6 py-4 mt-20 text-center">
        <div className="font-bold text-xl mb-2 text-amber-100 knewave-font">
          {displayName}
        </div>
        <p className="text-amber-200 text-base poppins-font">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
