import React from "react";
import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/src/assets/landing-page/background.jpg')`,
          filter: "contrast(100%) brightness(30%)",
        }}
      ></div>

      <Navbar />
    </div>
  );
};

export default Contact;
