import React from "react";
import Navbar from "../components/Navbar";
import { FaLinkedin } from "react-icons/fa";
import PropTypes from "prop-types";

const CustomProfileCard = ({ imageUrl, name, description }) => (
  <div className="bg-gray-800 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="relative w-32 h-32 mx-auto mb-4">
      <img
        src={imageUrl}
        alt={name || "Profile"}
        className="w-full h-full rounded-full object-cover border-4 border-gray-700"
      />
    </div>
    {name && <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>}
    <div className="text-blue-300 text-sm flex items-center justify-center gap-2">
      {description}
    </div>
  </div>
);

CustomProfileCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string,
  description: PropTypes.node,
};

const About = () => {
  return (
    <div className="relative w-full min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/landing-page/background.jpg')`,
          filter: "contrast(100%) brightness(30%)",
        }}
      />
      <div className="relative z-10 flex flex-col h-full text-white">
        <Navbar />
        <div className="flex flex-col h-full justify-center items-center mt-16 md:mt-20 mx-4 md:mx-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CustomProfileCard
              imageUrl="/assets/about-page/ej-headshot.jpg"
              name="Eljohn Agojo"
              description={
                <a
                  href="https://www.linkedin.com/in/eljohn-agojo/"
                  className="hover:underline flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              }
            />
            <CustomProfileCard
              imageUrl="/assets/about-page/mena-headshot.png"
              name="Mena Hanna"
              description={
                <a
                  href="https://www.linkedin.com/in/mena-hanna/"
                  className="hover:underline flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              }
            />
            <CustomProfileCard
              imageUrl="/assets/about-page/jake-headshot.png"
              name="Jake Shick"
              description={
                <a
                  href="https://www.linkedin.com/in/jakeshick/"
                  className="hover:underline flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              }
            />
            <CustomProfileCard
              imageUrl="/assets/about-page/aum-headshot.png"
              name="Aum Patel"
              description={
                <a
                  href="https://www.linkedin.com/in/aumpatel21/"
                  className="hover:underline flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              }
            />
            <CustomProfileCard
              imageUrl="/assets/about-page/pak-headshot.png"
              name="Pakshal Gandhi"
              description={
                <a
                  href="https://www.linkedin.com/in/pakshal-gandhi-51209027b/"
                  className="hover:underline flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
