import React from "react";

const ProfilePage = () => {
  return (
    <form className="max-w-md mx-auto space-y-4">
      {/* Form that allows users to change profile data like name, email, and password */}
      <div>
        {/* Input field where users can change name */}
        <label className="block text-md font-medium mb-1">Name</label>
        <input
          type="text"
          className="w-full h-8 p-3 rounded-full bg-gray-300 border border-black"
        />
      </div>
      {/* Input field where users can change email */}
      <div>
        <label className="block text-md font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full h-8 p-3 rounded-full bg-gray-300 border border-black"
        />
      </div>

      {/* Input field where users can change phone number */}
      <div>
        <label className="block text-md font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          className="w-full h-8 p-3 rounded-full bg-gray-300 border border-black"
        />
      </div>

      {/* Input field where users can reset their password */}
      <div>
        <label className="block text-md font-medium mb-1">
          Current Password
        </label>
        <input
          type="password"
          className="w-full h-8 p-3 mb-4 rounded-full bg-gray-300 border border-black"
        />

        <label className="block text-md font-medium mb-1">New Password</label>
        <input
          type="password"
          className="w-full h-8 p-3 rounded-full bg-gray-300 border border-black"
        />
      </div>

      {/* A save button which will eventually update the user's login info */}
      <div className="text-center">
        {/* <button
                    type="submit"
                    className="bg-black text-white px-8 py-3 rounded-full text-lg">
                    Save
                </button> */}
        <button className="bg-black hover:bg-slate-600 text-white rounded-full py-3 px-8 mt-4">
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfilePage;
