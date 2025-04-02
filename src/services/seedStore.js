// /src/services/seedStores.js
import { db } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";

/**
 * Hardcoded store data, matching your 8 stores in StoreCarousel.
 * You can include any additional fields you want, e.g. address, 
 * phone number, operational hours, etc.
 */
const storeData = [
  {
    id: "store-001",
    name: "Total Wine",
    distance: "5 miles away",
    rating: 4,
    image: "/assets/stores/store6.webp",
  },
  {
    id: "store-002",
    name: "The Liquor Store",
    distance: "2.3 miles away",
    rating: 4,
    image: "/assets/stores/store2.webp",
  },
  {
    id: "store-003",
    name: "Discount Liquors",
    distance: "3 miles away",
    rating: 3,
    image: "/assets/stores/store3.jpg",
  },
  {
    id: "store-004",
    name: "Discount Liquors",
    distance: "3 miles away",
    rating: 3,
    image: "/assets/stores/store5.jpg",
  },
  {
    id: "store-005",
    name: "Aums Liquors",
    distance: "27 miles away",
    rating: 3,
    image: "/assets/stores/store8.jpg",
  },
  {
    id: "store-006",
    name: "Mena's Liquors",
    distance: "18 miles away",
    rating: 3,
    image: "/assets/stores/store7.jpeg",
  },
  {
    id: "store-007",
    name: "Jake's Liquors",
    distance: "12 miles away",
    rating: 3,
    image: "/assets/stores/store9.png",
  },
  {
    id: "store-008",
    name: "Pak's Liquors",
    distance: "12 miles away",
    rating: 5,
    image: "/assets/stores/store6.webp",
  },
];

export const seedStores = async () => {
  try {
    for (const store of storeData) {
      const docRef = doc(collection(db, "stores"), store.id);
      await setDoc(docRef, store, { merge: true });
    }
    console.log("Store data seeded successfully!");
  } catch (error) {
    console.error("Error seeding stores:", error);
  }
};
