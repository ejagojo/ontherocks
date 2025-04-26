import { db } from "../services/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const redeemLoyaltyReward = async ({ item, cost, total, userPoints, setPoints }) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Please sign in to redeem rewards.");
      return;
    }

    if (userPoints < cost) {
      alert("Not enough points to redeem this reward!");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.error("User document not found.");
      return;
    }

    const newPoints = userPoints - cost;

    await updateDoc(userDocRef, {
      loyaltyPoints: newPoints
    });

    setPoints(newPoints);

    const rewardRef = doc(db, "users", user.uid, "AddToCartItems", item.id);
    await setDoc(rewardRef, {
      name: item.label,
      price: 0.00,
      quantity: total,
      storeId: "loyalty-rewards",
      isLoyaltyReward: true,
      image_url: item.assets
    });

    alert(`Successfully redeemed ${item.label}!`);
  } catch (err) {
    console.error("Error redeeming reward:", err);
  }
};
