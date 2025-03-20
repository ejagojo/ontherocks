import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Partner from "./pages/partner";
import UserProfile from "./UserProfile/UserProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/partner" element = {<Partner />} />
      </Routes>
    </Router>
  );
};

export default App;
