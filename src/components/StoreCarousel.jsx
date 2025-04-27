import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const StoreCarousel = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const snapshot = await getDocs(collection(db, "stores"));
        const fetchedStores = [];
        snapshot.forEach((doc) => {
          fetchedStores.push({ id: doc.id, ...doc.data() });
        });
        setStores(fetchedStores);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const getStars = (rating = 0) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const scrollLeft = () => {
    containerRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handleStoreClick = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading stores...</div>;
  }

  return (
    <div className="mx-auto w-4/5 my-8 relative">
      <button
        onClick={scrollLeft}
        className="absolute z-10 h-56 flex items-center justify-center bg-transparent rounded-r-md px-2 focus:outline-none"
        style={{ top: "50%", left: "-2rem", transform: "translateY(-50%)" }}
      >
        ◀
      </button>
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-4 py-2 scroll-smooth"
      >
        {stores.map((store) => (
          <div
            key={store.id}
            onClick={() => handleStoreClick(store.id)}
            className="w-64 h-56 bg-white rounded-lg shadow-md p-3 flex-shrink-0 transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
          >
            <img
              src={store.image}
              alt={store.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <div className="mt-3">
              <h3 className="text-lg font-semibold">{store.name}</h3>
              <p className="text-sm text-gray-500">{store.distance}</p>
              <div>{getStars(store.rating)}</div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute z-10 h-56 flex items-center justify-center bg-transparent rounded-l-md px-2 focus:outline-none"
        style={{ top: "50%", right: "-2rem", transform: "translateY(-50%)" }}
      >
        ▶
      </button>
    </div>
  );
};

export default StoreCarousel;
