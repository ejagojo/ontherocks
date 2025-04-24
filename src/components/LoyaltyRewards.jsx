import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const LoyaltyRewards = ({ points, setPoints }) => {
  const [drinks, setDrinks] = useState([]);
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
              points: data.points,
              className: "w-24 h-36 -ml-6 mt-4 object-contain"
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

  const handleRedeem = (cost) => {
    if (points >= cost) {
      setPoints((prev) => prev - cost);
    } else {
      alert("Not Enough Points!");
    }
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
            className="bg-white rounded-2xl shadow-lg p-6 w-60 flex-shrink-0 h-60"
          >
            <div className="flex items-center ml-2">
              <img
                src={drink.assets}
                className={drink.className}
                alt={`${drink.label} bottle`}
              />
              <div className="ml-2 mt-4">
                <h1 className="font-bold knewave-font">{drink.label}</h1>
                <h1 className="font-bold knewave-font">{drink.volume}</h1>
                <button
                  onClick={() => handleRedeem(drink.points)}
                  className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300"
                >
                  {drink.points} Points
                </button>
              </div>
            </div>
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
