import { seedInventory } from "../services/seedInventory";
import { seedStores } from "../services/seedStore";
import { seedCocktailRecipes } from "../services/seedDrinks";
import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";


const ScriptsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const handleScripts = async () => {
        setLoading(true);
        setError(null);

        try {
            await seedStores();
            await seedInventory();
            await seedCocktailRecipes();
        } catch (error) {
            console.error("Handling script Error: ", error);
            setError("Error loading script");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return (
    <div className="relative w-full min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/landing-page/background.jpg')`,
          filter: "contrast(100%) brightness(30%)",
        }}
      />
      <div className="relative z-10 flex flex-col h-full text-white">
        <Navbar />
        <div className="flex flex-col h-full justify-center items-center mt-16 md:mt-20 mx-4 md:mx-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && <LoadingSpinner />}
            <div className="w-full max-w-[320px] md:max-w-[400px] p-4 border border-white rounded-lg bg-opacity-0 backdrop-blur-xs">
                <p className="mt-3 text-xs text-center">
                Load The Scripts
                <button onClick={handleScripts} className="text-yellow-400 hover:underline">
                    Load SCRIPTS
                </button>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default ScriptsPage;
