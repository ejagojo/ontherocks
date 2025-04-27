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
        setDrinks(drinkList.slice(0, 5)); // limit to 5 per week
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
    <div className="mx-auto w-4/5 my-8">
      <div
        ref={carouselRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
      >
        {drinks.map((drink) => (
          <a
            key={drink.id}
            href={drink.recipe_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-md p-3 transform transition-transform duration-300 ease-in-out hover:scale-105"
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
    </div>
  );
};

export default DrinksOfTheWeekCarousel;
