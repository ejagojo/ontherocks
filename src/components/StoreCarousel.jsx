import React, { useRef } from "react";

const StoreCarousel = () => {
  const containerRef = useRef(null);

  const stores = [
    {
      id: 1,
      name: "Total Wine",
      distance: "5 miles away",
      rating: 4,
      image: "/assets/stores/store6.webp",
    },
    {
      id: 2,
      name: "The Liquor Store",
      distance: "2.3 miles away",
      rating: 4,
      image: "/assets/stores/store2.webp",
    },
    {
      id: 3,
      name: "Discount Liquors",
      distance: "3 miles away",
      rating: 3,
      image: "/assets/stores/store3.jpg",
    },
    {
      id: 4,
      name: "Discount Liquors",
      distance: "3 miles away",
      rating: 3,
      image: "/assets/stores/store5.jpg",
    },
    {
      id: 5,
      name: "Discount Liquors",
      distance: "3 miles away",
      rating: 3,
      image: "/assets/stores/store6.webp",
    },
    {
      id: 6,
      name: "Aums Liquors",
      distance: "27 miles away",
      rating: 3,
      image: "/assets/stores/store8.jpg",
    },
    {
      id: 7,
      name: "Mena's Liquors",
      distance: "18 miles away",
      rating: 3,
      image: "/assets/stores/store7.jpeg",
    },
    {
      id: 8,
      name: "Jake's Liquors",
      distance: "12 miles away",
      rating: 3,
      image: "/assets/stores/store9.png",
    },
    {
      id: 9,
      name: "Pak's Liquors",
      distance: "12 miles away",
      rating: 5,
      image: "/assets/stores/store6.webp",
    },
  ];

  const getStars = (rating) => {
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
        {stores.map((store) => (
          <div
            key={store.id}
            className="w-64 h-56 bg-white rounded-lg shadow-md p-3 flex-shrink-0 transform transition-transform duration-300 ease-in-out hover:scale-105"
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
        className="absolute z-10 h-56 flex items-center justify-center bg-white bg-opacity-80 rounded-l-md px-2 focus:outline-none hover:bg-opacity-100"
        style={{ top: "50%", right: "-2rem", transform: "translateY(-50%)" }}
      >
        ▶
      </button>
    </div>
  );
};

export default StoreCarousel;
