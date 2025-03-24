import React from "react";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
const About = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/src/assets/landing-page/background.jpg')`,
          filter: "contrast(100%) brightness(30%)",
        }}
      ></div>

      <div className="relative z-10 flex flex-col h-full text-white">
        <Navbar />
        {/* Team profile cards */}
        <div className="flex flex-col h-full justify-center items-center mt-16 md:mt-20 mx-4 md:mx-20">
          <div>
            {/* top 2 cards */}
            <div className="flex flex-col md:flex-row md:w-auto w-full gap-6">
              <ProfileCard
                imageUrl="https://placehold.co/250"
                name="John Doe"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
              />

              <ProfileCard
                imageUrl="https://placehold.co/250"
                name="John Doe"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
              />

              <ProfileCard
                imageUrl="https://placehold.co/250"
                name="John Doe"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
              />
            </div>
            {/* bottom 2 cards */}
            <div className="flex flex-col md:flex-row md:w-auto w-full justify-center gap-6 mt-6 mb-6">
              <ProfileCard
                imageUrl="https://placehold.co/250"
                name="John Doe"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
              />

              <ProfileCard
                imageUrl="https://placehold.co/250"
                name="John Doe"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;