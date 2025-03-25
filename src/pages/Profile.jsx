import React from "react";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";

const ProfilePage = () => {
  return (
    <div className="h-screen overflow-hidden bg-[linear-gradient(45deg,#000031,#000000,#220000)] text-white overflow-hidden">
      {/* Pass theme="dark" to use the white logo and dark header background */}
      <Header theme="light" />
      {/* Add top padding so the fixed header doesn't cover your content */}
      <div className="pt-10">
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
