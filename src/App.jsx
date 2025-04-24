import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { seedInventory } from "./services/seedInventory";
import { useEffect } from "react";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Partner from "./pages/Partner";
import Loyalty from "./pages/Loyalty";
import UserProfile from "./components/UserProfile";
import Profile from "./pages/Profile";
import StoreDetails from "./pages/StoreDetails";
import UserCart from "./pages/UserCart";

const App = () => {
  useEffect(() => {
    seedInventory(); // only runs once on initial load
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/loyalty" element={<Loyalty />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/store/:storeId" element={<StoreDetails />} />
        <Route path="/cart" element={<UserCart />} />
      </Routes>
    </Router>
  );
};

export default App;
