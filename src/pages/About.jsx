import React from "react";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import { FaLinkedin } from "react-icons/fa";

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
            <ProfileCard
              imageUrl="/assets/about-page/ej-headshot.jpg"
              name="Eljohn Agojo"
              description={
                <a
                  href="https://www.linkedin.com/in/eljohn-agojo/"
                  className="text-blue-300 hover:underline flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              }
            />
            <ProfileCard
              imageUrl="/assets/about-page/mena-headshot.png"
              name="Mena Hanna"
              description={
                <a
                  href="https://www.linkedin.com/in/mena-hanna/"
                  className="text-blue-300 hover:underline flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              }
            />
            <ProfileCard
              imageUrl="/assets/about-page/jake-headshot.png"
              name="Jake Shick"
              description={
                <a
                  href="https://www.linkedin.com/in/jakeshick/"
                  className="text-blue-300 hover:underline flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              }
            />
            <ProfileCard
              imageUrl="/assets/about-page/aum-headshot.png"
              name="Aum Patel"
              description={
                <a
                  href="https://www.linkedin.com/in/aumpatel21/"
                  className="text-blue-300 hover:underline flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              }
            />
            <ProfileCard
              imageUrl="/assets/about-page/pak-headshot.png"
              name="Pakshal Gandhi"
              description={
                <a
                  href="https://www.linkedin.com/in/pakshal-gandhi-51209027b/"
                  className="text-blue-300 hover:underline flex items-center gap-2"
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
