import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Partner from "./pages/partner";
import Loyalty from "./pages/Loyalty";
import UserProfile from "../UserProfile/UserProfile";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/partner" element = {<Partner />} />
        <Route path="/UserProfile" element = {<UserProfile />} />
        <Route path = "/loyalty" element = {<Loyalty />} />
        <Route path = "/profile" element = {<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
