import React from "react";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";

const ProfilePage = () => {
  return (
    <div className="h-screen text-white ">
      {/* Pass theme="dark" to use the white logo and dark header background */}
      <Header theme="light" />
      {/* Add top padding so the fixed header doesn't cover your content */}
      <div className="">
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;