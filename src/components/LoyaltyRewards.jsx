import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { redeemLoyaltyReward, removeLoyaltyRewardAndRefund} from "./loyaltyHealpers"

const LoyaltyRewards = ({ points, setPoints }) => {
  const [drinks, setDrinks] = useState([]);
  const [counter, setCounter] = useState({});
  const [store, setStore] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "stores", "store-001", "items")
        );
        const loyaltyDrinks = [];

        querySnapshot.forEach((doc) => {
          if (doc.id.startsWith("loyalty-")) {
            const data = doc.data();
            loyaltyDrinks.push({
              id: doc.id,
              label: data.name,
              assets: data.image_url,
              volume: data.volume_ml + "ml",
              points: data.points
            });
          }
        });

        setDrinks(loyaltyDrinks);
      } catch (error) {
        console.error("Error fetching loyalty items:", error);
      }
    };

    fetchDrinks();
  }, []);

  const handleRedeem = async (cost) => {
    if (points >= cost) {
      const newPoints = points - cost;
      setPoints(newPoints);

      try {
        const user = auth.currentUser;
        if (!user) {
          alert("You must be logged in to redeem points.");
          return;
        }

        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          loyaltyPoints: newPoints
        });

        console.log("Points updated in Firestore!");
      } catch (error) {
        console.error("Error updating points:", error);
        alert("Failed to redeem points, please try again.");
      }
    } else {
      alert("Not Enough Points!");
    }
  };

  const updateQuantity = (itemId, delta) => {
    setCounter((prev) => {
      const newQty = Math.max(1, (prev[itemId] || 1) + delta);
      return { ...prev, [itemId]: newQty };
    });
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  return (
    <div className="mx-auto w-4/5 my-8 relative">
      <select 
        value={store} 
        onChange={(e) => setStore(e.target.value)} 
        className="mt-2 px-4 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300 w-40"
      >
        <option value="" disabled hidden>
          Select a Store
        </option>
        <option value="store-001">Total Wine</option>
        <option value="store-002">The Liquor Store</option>
        <option value="store-003">Discount Liquors</option>
      </select>

      <button
        onClick={scrollLeft}
        className="absolute z-10 h-56 flex items-center justify-center bg-white bg-opacity-80 rounded-r-md px-2 focus:outline-none hover:bg-opacity-100"
        style={{ top: "50%", left: "-2rem", transform: "translateY(-50%)" }}
      >
        ◀
      </button>

      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-4 py-2 scroll-smooth"
      >
        {drinks.map((drink) => (
          <div
            key={drink.id}
            className="flex flex-col bg-white rounded-lg shadow-md p-4 transform transition-transform duration-300 ease-in-out hover:scale-105 w-60 flex-shrink-0 h-auto"
          >
            <img
              src={drink.assets}
              className="w-full aspect-square object-cover object-center rounded-md mb-3"
              alt={`${drink.label} bottle`}
            />
            <h1 className="text-lg font-semibold mb-1 knewave-font">{drink.label}</h1>
            <h1 className="text-sm text-gray-600 knewave-font">{drink.volume}</h1>

            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                onClick={() => updateQuantity(drink.id, -1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold text-black"
              >
                -
              </button>
              <span className="text-lg font-semibold w-6 text-center">
                {counter[drink.id] || 1}
              </span>
              <button
                onClick={() => updateQuantity(drink.id, 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold text-black"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                const quantity = counter[drink.id] || 1;
                const totalCost = drink.points * quantity;

                handleRedeem(totalCost);
                redeemLoyaltyReward({
                  item: drink,
                  cost: totalCost,
                  total: quantity,
                  userPoints: points,
                  storeId: store,
                  setPoints 

                });
              }}
              className="mt-auto px-4 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300"
            >
              {(drink.points * (counter[drink.id] || 1))} Points
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute z-10 h-56 flex items-center justify-center bg-white bg-opacity-80 rounded-l-md px-2 focus:outline-none hover:bg-opacity-100"
        style={{ top: "50%", right: "-2rem", transform: "translateY(-50%)" }}
      >
        ▶
      </button>
    </div>
  );
};

export default LoyaltyRewards;
