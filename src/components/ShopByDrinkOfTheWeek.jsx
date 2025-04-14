import React, { useEffect, useRef, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const DrinksOfTheWeekCarousel = () => {
  const carouselRef = useRef(null);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const snapshot = await getDocs(collection(db, "cocktailRecipes"));
        const drinkList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setDrinks(drinkList);
      } catch (error) {
        console.error("Failed to fetch drinks of the week:", error);
      }
    };
    fetchDrinks();
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 300;
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
        ref={carouselRef}
        className="flex overflow-x-auto gap-4 py-2 scroll-smooth"
      >
        {drinks.map((drink) => (
          <a
            key={drink.id}
            href={drink.recipe_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-64 h-56 bg-white rounded-lg shadow-md p-3 flex-shrink-0 transform transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <img
              src={drink.image_url}
              alt={drink.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <div className="mt-3">
              <h3 className="text-lg font-semibold">{drink.name}</h3>
              <p className="text-sm text-gray-500">{drink.alcohol_type}</p>
            </div>
          </a>
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

export default DrinksOfTheWeekCarousel;