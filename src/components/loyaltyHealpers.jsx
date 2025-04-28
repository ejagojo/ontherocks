import { db } from "../services/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const redeemLoyaltyReward = async ({ item, cost, total, userPoints, storeId, setPoints }) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert("Please sign in to redeem rewards.");
            return;
        }

        if (storeId == "") {
            alert("You must choose a store.")
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
        const rewardSnap = await getDoc(rewardRef);

        let existingQuantity = 0;
        if (rewardSnap.exists()) {
            const rewardData = rewardSnap.data();
            existingQuantity = rewardData.quantity || 0;
        }

        await setDoc(rewardRef, {
            name: item.label,
            price: 0.00,
            quantity: total + existingQuantity,
            storeId: storeId,
            isLoyaltyReward: true,
            image_url: item.assets
        });

        alert(`Successfully redeemed ${item.label}!`);
    } catch (err) {
        console.error("Error redeeming reward:", err);
    }
};

export const removeLoyaltyRewardAndRefund = async ({ itemId, setPoints }) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (!user) {
            alert("Please sign in to remove rewards.");
            return;
        }
    
        const rewardRef = doc(db, "users", user.uid, "AddToCartItems", itemId);
        const rewardSnap = await getDoc(rewardRef);
    
        if (!rewardSnap.exists()) {
            console.error("Reward not found.");
            return;
        }
    
        const rewardData = rewardSnap.data();
        const quantity = rewardData.quantity || 1;
        const itemName = rewardData.name;
        
        const storeItemRef = doc(db, "stores", "store-001", "items", itemId);
        const storeItemSnap = await getDoc(storeItemRef);
    
        if (!storeItemSnap.exists()) {
            console.error("Original item not found in store catalog.");
            return;
        }
    
        const storeItemData = storeItemSnap.data();
        const pointsPerItem = storeItemData.points || 0;
    
        const totalPointsToRefund = pointsPerItem * quantity;
    
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
    
        if (!userDocSnap.exists()) {
            console.error("User document not found.");
            return;
        }
    
        const userData = userDocSnap.data();
        const currentPoints = userData.loyaltyPoints || 0;
    
        const newPoints = currentPoints + totalPointsToRefund;
    
        await updateDoc(userDocRef, {
            loyaltyPoints: newPoints
        });
    
        setPoints(newPoints);
    
        await deleteDoc(rewardRef);
    
        alert(`Removed ${itemName} and refunded ${totalPointsToRefund} points.`);
        } catch (err) {
        console.error("Error removing reward:", err);
        }
};
