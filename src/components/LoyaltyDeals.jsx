import React from "react";

const fireball = "/assets/drinks/fireball_50ml.png";
const absolut = "/assets/drinks/absolut_vodka50ml.webp";
const tito = "/assets/drinks/tito50ml.jpg";
const smirnoff = "/assets/drinks/smirnoff_root_beer50ml.png";

const LoyaltyDeals = () => {

return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-38 mt-4 ml-0 justify-center px-2 mb-10">
            <button className="hidden md:flex absolute left-2 top-[95%] -translate-y-1/2 z-10 h-12 w-10 items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
            ◀
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-60 h-60 -mt-2">
                <div className="flex items-center ml-2">
                    <img src={smirnoff} className="w-24 h-40 -ml-6 mt-4 object-contain" alt="Smirnoff bottle" />
                    <div className="ml-2 mt-4">
                        <h1 className="font-bold knewave-font">Smirnoff Rootbeer Vodka 50ml</h1>
                        <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
                            $0.50
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-60 h-60 -mt-2">
                <div className="flex items-center ml-2">
                    <img src={fireball} className="w-24 h-40 -ml-8 mt-4 object-contain" alt="Fireball bottle" />
                    <div className="ml-2 mt-4">
                        <h1 className="font-bold knewave-font">Fireball Whisky 50ml</h1>
                        <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
                            $0.50
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-60 h-60 -mt-2">
                <div className="flex items-center ml-2">
                    <img src={tito} className="w-24 h-40 -ml-8 mt-4 object-contain" alt="Tito Vodka bottle" />
                    <div className="ml-2 mt-4">
                        <h1 className="font-bold knewave-font">Tito Vodka 50ml</h1>
                        <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
                            $0.50
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-60 h-60 -mt-2">
                <div className="flex items-center ml-2">
                    <img src={absolut} className="w-30 h-45 -ml-8 mt-4 object-contain" alt="Absolut Vodka bottle" />
                    <div className="ml-2 mt-4">
                        <h1 className="font-bold knewave-font">Absolut Vodka 50ml</h1>
                        <button className="mt-6 px-6 py-2 bg-gray-200 rounded-full font-bold italic text-black whitespace-nowrap hover:bg-gray-300">
                            $0.50
                        </button>
                    </div>
                </div>
            </div>

            <button className="hidden md:flex absolute right-2 top-[95%] -translate-y-1/2 z-10 h-12 w-10 items-center justify-center bg-white bg-opacity-80 text-black rounded-r-md hover:bg-opacity-100">
                ▶
            </button>
        </div>
    )
}

export default LoyaltyDeals;