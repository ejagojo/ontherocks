import React from "react";

const drinks = [
    {
        id: 1,
        name: "99Banana",
        label: "99 Banana Liquor 50ml",
        assets: "/assets/drinks/99-bananas-50ml.png",
        points: 25,
        className: "w-24 h-36 -ml-6 mt-4 object-contain"
    },
    {
        id: 2,
        name: "BacardiRaspberry",
        label: "Raspberry Bacardi 50ml",
        assets: "/assets/drinks/bacardi_raspberry_50ml.png",
        points: 25,
        className: "w-24 h-36 -ml-6 mt-4 object-contain"
    },
    {
        id: 3,
        name: "FireballWhisky",
        label: "Fireball Whisky 50ml",
        assets: "/assets/drinks/fireball_50ml.png",
        points: 25,
        className: "w-24 h-40 -ml-8 mt-4 object-contain"
    }
]
const LoyaltyRewards = ({points, setPoints}) => {
    const handleRedeem = (cost) => {
        console.log("Current points:", points);
        console.log("Drink cost:", cost);
        if (points >= cost) {
            
            setPoints((prev) => prev - cost);
        }
        else {
            alert("Not Enough Points!")
        }
    }
    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-38 mt-4 ml-0 justify-center px-2">
            <button className="hidden md:flex absolute left-2 top-[55%] -translate-y-1/2 z-10 h-12 w-10 items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
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
                            <button onClick={() => handleRedeem(drink.points)} className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
                                {drink.points} Points
                            </button>
                        </div>
                    </div>
                </div>
            ))}
  
            <button className="hidden md:flex absolute right-2 top-[55%] -translate-y-1/2 z-10 h-12 w-10 items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
                ▶
            </button>
        </div>
    );
};
  
export default LoyaltyRewards;