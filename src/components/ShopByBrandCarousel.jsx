import React, { useRef } from "react";

const ShopByBrandCarousel = () => {
  const carouselRef = useRef(null);

  const brands = [
    {
      id: 1,
      name: "Modelo",
      description: "The classic Mexican beer",
      image: "src/assets/brands/brand1.jpg",
    },
    {
      id: 2,
      name: "Dos Equis",
      description: "A refreshing lager for any occasion",
      image: "src/assets/brands/brand2.jpg",
    },
    {
      id: 3,
      name: "Miller Lite",
      description: "A true American pilsner",
      image: "src/assets/brands/brand3.jpg",
    },
    {
      id: 4,
      name: "Budlight BudlightYuhhh",
      description: "Budlight",
      image: "src/assets/brands/brand4.jpg",
    },
    {
      id: 5,
      name: "Sapporo",
      description: "Sapporo Yummy",
      image: "src/assets/brands/brand5.webp",
    },
  ];

  const scrollLeft = () => {
    carouselRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    carouselRef.current.scrollLeft += 300;
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
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="w-64 h-56 bg-white rounded-lg shadow-md p-3 flex-shrink-0 transform transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <div className="mt-3">
              <h3 className="text-lg font-semibold">{brand.name}</h3>
              <p className="text-sm text-gray-500">{brand.description}</p>
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

export default ShopByBrandCarousel;
