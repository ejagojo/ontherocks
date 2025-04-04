import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Header from "../components/Header";
import SubNav from "../components/SubNav";
import LoadingSpinner from "../components/LoadingSpinner";
import BackArrow from "../components/BackArrow";
import Footer from "../components/Footer";

const StoreDetails = () => {
  const { storeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [storeInfo, setStoreInfo] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [selectedTypes, setSelectedTypes] = useState(["Beer", "Wine", "Vodka", "Tequila"]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [abvRange, setAbvRange] = useState([0, 100]);

  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeRef = doc(db, "stores", storeId);
        const storeSnap = await getDoc(storeRef);

        if (storeSnap.exists()) {
          setStoreInfo({ id: storeSnap.id, ...storeSnap.data() });
        }

        const itemsRef = collection(db, "stores", storeId, "items");
        const querySnapshot = await getDocs(itemsRef);
        const fetchedItems = [];
        const quantityMap = {};
        querySnapshot.forEach((docSnap) => {
          fetchedItems.push({ id: docSnap.id, ...docSnap.data() });
          quantityMap[docSnap.id] = 1;
        });
        setItems(fetchedItems);
        setQuantities(quantityMap);
      } catch (error) {
        console.error("Error fetching store details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [storeId]);

  const handleAddToCart = async (item) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please sign in to add items to your cart.");
        return;
      }

      const cartRef = collection(db, "users", user.uid, "AddToCartItems");
      const cartSnap = await getDocs(cartRef);
      const quantity = quantities[item.id] || 1;

      let existingStoreId = null;
      cartSnap.forEach((doc) => {
        const data = doc.data();
        if (!existingStoreId) existingStoreId = data.storeId;
      });

      if (existingStoreId && existingStoreId !== storeId) {
        alert("You can only add items from one store at a time. Please clear your cart first.");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, { createdAt: new Date().toISOString() });
      }

      const cartItemRef = doc(db, "users", user.uid, "AddToCartItems", item.id);
      const cartItemSnap = await getDoc(cartItemRef);

      if (cartItemSnap.exists()) {
        const prevQty = cartItemSnap.data()?.quantity || 0;
        await updateDoc(cartItemRef, {
          quantity: prevQty + quantity
        });
      } else {
        await setDoc(cartItemRef, {
          name: item.name,
          brand: item.brand,
          price: item.price,
          storeId,
          quantity
        });
      }

      alert("Item added to cart.");
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  };

  const updateQuantity = (itemId, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, (prev[itemId] || 1) + delta);
      return { ...prev, [itemId]: newQty };
    });
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const applyFilters = () => {
    return items.filter((item) => {
      if (!selectedTypes.includes(item.type)) return false;
      const itemPrice = item.price || 0;
      if (itemPrice < priceRange[0] || itemPrice > priceRange[1]) return false;
      const itemAbv = item.abv || 0;
      if (itemAbv < abvRange[0] || itemAbv > abvRange[1]) return false;
      return true;
    });
  };

  const resetFilters = () => {
    setSelectedTypes(["Beer", "Wine", "Vodka", "Tequila"]);
    setPriceRange([0, 200]);
    setAbvRange([0, 100]);
  };

  if (loading) return <LoadingSpinner />;

  const filteredItems = applyFilters();

  return (
    <div className="relative w-full min-h-screen text-black bg-gray-50">
      <Header />
      <SubNav />
      <BackArrow />
      <div className="mx-auto w-11/12 sm:w-4/5 my-10">
        {storeInfo ? (
          <div className="bg-white shadow-lg rounded-md p-6 mb-8 transition-transform duration-300 ease-in-out hover:shadow-xl">
            <h2 className="text-3xl font-bold mb-1">{storeInfo.name}</h2>
            <p className="text-gray-600 text-sm mb-3">
              {storeInfo.distance} &middot; Rating: {storeInfo.rating} / 5
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={storeInfo.image}
                alt={storeInfo.name}
                className="w-full sm:w-1/2 h-64 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed mb-2">
                  Explore the finest selection of beverages, all curated with
                  the highest standards. Whether you're looking for a refreshing
                  lager, a smooth spirit, or an exclusive vintage, {storeInfo.name}{" "}
                  offers an array of products to suit every taste.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Discover the perfect choice for your occasion and enjoy
                  a modern, convenient shopping experience.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-md p-6 mb-8 text-red-500 font-semibold">
            Store not found or missing data.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-md shadow-md p-4 h-fit lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Refine Results</h3>
            <button
              onClick={resetFilters}
              className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1.5 rounded-lg mb-4 hover:bg-blue-200 block ml-auto"
            >
              Reset Filters
            </button>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <div className="flex flex-col space-y-2 text-sm">
                {["Beer", "Wine", "Vodka", "Tequila"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="block text-sm font-medium text-gray-700 mb-1">
                Shop by Price
              </p>
              <div className="flex flex-col space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={priceRange[0] === 25 && priceRange[1] === 50}
                    onChange={() => setPriceRange([25, 50])}
                  />
                  <span>$25 - $50</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={priceRange[0] === 50 && priceRange[1] === 100}
                    onChange={() => setPriceRange([50, 100])}
                  />
                  <span>$50 - $100</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={priceRange[0] === 100 && priceRange[1] === 150}
                    onChange={() => setPriceRange([100, 150])}
                  />
                  <span>$100 - $150</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={priceRange[0] === 150 && priceRange[1] === 1000}
                    onChange={() => setPriceRange([150, 1000])}
                  />
                  <span>Over $150</span>
                </label>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ABV Range
              </label>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>{abvRange[0]}%</span>
                <span>{abvRange[1]}%</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={abvRange[0]}
                  onChange={(e) =>
                    setAbvRange([Number(e.target.value), abvRange[1]])
                  }
                  className="border rounded px-2 py-1 w-full text-sm"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={abvRange[1]}
                  onChange={(e) =>
                    setAbvRange([abvRange[0], Number(e.target.value)])
                  }
                  className="border rounded px-2 py-1 w-full text-sm"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-2xl font-semibold mb-4">Items in this store</h3>
            {filteredItems.length === 0 ? (
              <div className="bg-white shadow-md rounded-md p-6 text-center">
                No items found for this store with the chosen filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border rounded-md shadow-md p-4 transform transition-transform duration-300 ease-in-out hover:scale-105"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-md mb-3"
                    />
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                    <p className="text-sm text-gray-600 capitalize">
                      {item.type}
                    </p>
                    <p className="text-gray-700 font-medium mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      ABV: {item.abv || 0}%
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold text-black"
                        >
                          −
                        </button>
                        <span className="text-lg font-semibold w-6 text-center">
                          {quantities[item.id] || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold text-black"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-[#2F2F2F] text-white text-sm font-medium py-2 px-4 rounded hover:bg-[#404040] transition-colors duration-200"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StoreDetails;
