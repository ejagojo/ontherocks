import React from "react";

const drinks = [
    {
        id: 1,
        name: "SmirnoffRootBeer",
        label: "Smirnoff Rootbeer Vodka 50ml",
        assets: "/assets/drinks/smirnoff_root_beer50ml.png",
        cost: 0.50,
        className: "w-24 h-40 -ml-6 mt-4 object-contain"
    },
    {
        id: 2,
        name: "FireballWhisky",
        label: "Fireball Whisky 50ml",
        assets: "/assets/drinks/fireball_50ml.png",
        cost: 0.50,
        className: "w-24 h-40 -ml-8 mt-4 object-contain"
    },
    {
        id: 3,
        name: "TitoVodka",
        label: "Tito Vodka 50ml",
        assets: "/assets/drinks/tito50ml.jpg",
        cost: 0.50,
        className: "w-24 h-40 -ml-8 mt-4 object-contain"
    },
    {
        id: 4,
        name: "AbsolutVodka",
        label: "Absolut Vodka 50ml",
        assets: "/assets/drinks/absolut_vodka50ml.webp",
        cost: 0.50,
        className: "w-30 h-45 -ml-8 mt-4 object-contain"
    },
]


const LoyaltyDeals = () => {

    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-38 mt-4 ml-0 justify-center px-2">
            <button className="hidden md:flex absolute left-2 top-[90%] -translate-y-1/2 z-10 h-12 w-10 items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
                ◀
            </button>
    
            {drinks.map((drink) => (
                <div
                    key={drink.id}
                    className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-60 h-60">
                    <div className="flex items-center ml-2">
                        <img
                            src={drink.assets}
                            className={drink.className}
                            alt={`${drink.label} bottle`}
                        />
                        <div className="ml-2 mt-4">
                            <h1 className="font-bold knewave-font">{drink.label}</h1>
                            <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
                                ${drink.cost.toFixed(2)} 
                            </button>
                        </div>
                    </div>
                </div>
            ))}
    
            <button className="hidden md:flex absolute right-2 top-[90%] -translate-y-1/2 z-10 h-12 w-10 items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
                ▶
            </button>
        </div>
    );
};

export default LoyaltyDeals;