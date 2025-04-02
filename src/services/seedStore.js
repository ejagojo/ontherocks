// /src/services/seedStores.js
import { db } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const storeData = [
  {
    id: "store-001",
    name: "Total Wine",
    distance: "5 miles away",
    rating: 4,
    image: "/assets/stores/store6.webp",
    address: "123 Main Street, Boston, MA 02108",
    phone: "(617) 555-0101",
    hours: "9:00 AM – 10:00 PM"
  },
  {
    id: "store-002",
    name: "The Liquor Store",
    distance: "2.3 miles away",
    rating: 4,
    image: "/assets/stores/store2.webp",
    address: "456 Elm Street, Cambridge, MA 02139",
    phone: "(617) 555-0102",
    hours: "10:00 AM – 9:00 PM"
  },
  {
    id: "store-003",
    name: "Discount Liquors",
    distance: "3 miles away",
    rating: 3,
    image: "/assets/stores/store3.jpg",
    address: "789 Beacon Street, Brookline, MA 02446",
    phone: "(617) 555-0103",
    hours: "10:00 AM – 8:00 PM"
  },
  {
    id: "store-004",
    name: "Discount Liquors",
    distance: "3 miles away",
    rating: 3,
    image: "/assets/stores/store5.jpg",
    address: "321 Broadway, Somerville, MA 02145",
    phone: "(617) 555-0104",
    hours: "9:00 AM – 11:00 PM"
  },
  {
    id: "store-005",
    name: "Aums Liquors",
    distance: "27 miles away",
    rating: 3,
    image: "/assets/stores/store8.jpg",
    address: "654 Washington Street, Newton, MA 02458",
    phone: "(617) 555-0105",
    hours: "8:00 AM – 10:00 PM"
  },
  {
    id: "store-006",
    name: "Mena's Liquors",
    distance: "18 miles away",
    rating: 3,
    image: "/assets/stores/store7.jpeg",
    address: "987 Tremont Street, Roxbury, MA 02120",
    phone: "(617) 555-0106",
    hours: "11:00 AM – 10:00 PM"
  },
  {
    id: "store-007",
    name: "Jake's Liquors",
    distance: "12 miles away",
    rating: 3,
    image: "/assets/stores/store9.png",
    address: "111 Summer Street, Boston, MA 02110",
    phone: "(617) 555-0107",
    hours: "10:00 AM – 9:00 PM"
  },
  {
    id: "store-008",
    name: "Pak's Liquors",
    distance: "12 miles away",
    rating: 5,
    image: "/assets/stores/store6.webp",
    address: "222 Boylston Street, Boston, MA 02116",
    phone: "(617) 555-0108",
    hours: "9:30 AM – 10:30 PM"
  }
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
