import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { addDealToCart } from "./loyaltyHealpers";
import { db } from "../services/firebase";

const LoyaltyDeals = ({ store_id }) => {
  if (!store_id) return;
  const [deals, setDeals] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "stores", store_id, "items")
        );
        const allDeals = [];

        querySnapshot.forEach((doc) => {
          if (doc.id.startsWith("deals-")) {
            const data = doc.data();
            allDeals.push({
              id: doc.id,
              label: data.name,
              assets: data.image_url,
              volume: data.volume_ml,
              cost: data.price,
              storeId: store_id
            });
          }
        });

        setDeals(allDeals);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, [store_id]);

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
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="flex flex-col bg-white rounded-lg shadow-md p-4 transform transition-transform duration-300 ease-in-out hover:scale-105 w-60 flex-shrink-0 h-auto"
          >
            <img
              src={deal.assets}
              className="w-full aspect-square object-cover object-center rounded-md mb-3"
              alt={`${deal.label} bottle`}
            />
            <h1 className="text-lg font-semibold mb-1 knewave-font">{deal.label}</h1>
            <h1 className="text-sm text-gray-600 knewave-font">{deal.volume}ml</h1>
            <button
              onClick={() => addDealToCart(deal, store_id)}
              className="mt-auto px-4 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300"
              >
              ${deal.cost?.toFixed(2)}
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

export default LoyaltyDeals;
