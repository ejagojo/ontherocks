import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc
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
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeRef = doc(db, "stores", storeId);
        const storeSnap = await getDoc(storeRef);

        if (storeSnap.exists()) {
          setStoreInfo({ id: storeSnap.id, ...storeSnap.data() });
        } else {
          console.warn("Store not found in Firestore:", storeId);
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

      const quantity = quantities[item.id] || 1;

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

  if (loading) return <LoadingSpinner />;

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

        <h3 className="text-2xl font-semibold mb-4">Items in this store</h3>
        {items.length === 0 ? (
          <div className="bg-white shadow-md rounded-md p-6 text-center">
            No items found for this store.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
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
                <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                <p className="text-gray-700 font-medium mt-2">
                  ${item.price.toFixed(2)}
                </p>
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
      <Footer />
    </div>
  );
};

export default StoreDetails;
