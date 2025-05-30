import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Scripts } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Partner from "./pages/Partner";
import Loyalty from "./pages/Loyalty";
import UserProfile from "./components/UserProfile";
import Profile from "./pages/Profile";
import StoreDetails from "./pages/StoreDetails";
import UserCart from "./pages/UserCart";
import ScriptsPage from "./pages/scripts";

const App = () => {
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
        <Route path="/scripts" element={<ScriptsPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
