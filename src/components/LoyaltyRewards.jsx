import React from "react";

const banana = "/assets/drinks/99-bananas-50ml.png";
const bacardi = "/assets/drinks/bacardi_raspberry_50ml.png";
const fireball = "/assets/drinks/fireball_50ml.png";

const LoyaltyRewards = () => { 
    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-38 mt-4 ml-0 justify-center px-2">
            <button className="hidden md:flex absolute left-2 top-[62%] -translate-y-1/2 z-10 h-12 w-10 items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
                ◀
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-60 h-60">
                <div className="flex items-center ml-2">
                    <img src={banana} className="w-24 h-36 -ml-6 mt-4 object-contain" alt="99 Bananas bottle" />
                    <div className="ml-2 mt-4">
                        <h1 className="font-bold knewave-font">99 Banana Liquor 50ml</h1>
                        <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap">
                            25 Points
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-60 h-60">
                <div className="flex items-center ml-2">
                    <img src={bacardi} className="w-24 h-36 -ml-6 mt-4 object-contain" alt="Bacardi Raspberry bottle" />
                    <div className="ml-2 mt-4">
                        <h1 className="font-bold knewave-font">Raspberry Bacardi 50ml</h1>
                        <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
                            25 Points
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-60 h-60">
                <div className="flex items-center ml-2">
                    <img src={fireball} className="w-24 h-40 -ml-8 mt-4 object-contain" alt="Fireball bottle" />
                    <div className="ml-2 mt-4">
                        <h1 className="font-bold knewave-font">Fireball Whisky 50ml</h1>
                        <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
                            25 Points
                        </button>
                    </div>
                </div>
            </div>

            <button className="hidden md:flex absolute right-2 top-[62%] -translate-y-1/2 z-10 h-12 w-10 items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
                ▶
            </button>
        </div>
    )
}

export default LoyaltyRewards;