import React from "react";

const ProfilePage = () => {
    return (
        <form className="max-w-md mx-auto mt-4 space-y-6">
            {/* Form that allows users to change profile data like name, email, and password */}
            <div>
                {/* Input field where users can change name */}
                <label className="block text-lg font-medium mb-1">Name</label>
                <input
                    type="text"
                    className="w-full p-3 rounded-full bg-gray-300 border border-black"
                />
            </div>
            {/* Input field where users can change email */}
            <div>
                <label className="block text-lg font-medium mb-1">Email</label>
                <input
                    type="email"
                    className="w-full p-3 rounded-full bg-gray-300 border border-black"
                />
            </div>
    
          {/* Input field where users can change phone number */}
            <div>
                <label className="block text-lg font-medium mb-1">Phone Number</label>
                <input
                    type="tel"
                    className="w-full p-3 rounded-full bg-gray-300 border border-black"
                />
            </div>
    
          {/* Input field where users can reset their password */}
            <div>
                <label className="block text-lg font-medium mb-1">Current Password</label>
                <input
                    type="password"
                    className="w-full p-3 mb-4 rounded-full bg-gray-300 border border-black"
                />
    
                <label className="block text-lg font-medium mb-1">New Password</label>
                <input
                    type="password"
                    className="w-full p-3 rounded-full bg-gray-300 border border-black"
                />
            </div>
    
          {/* A save button which will eventually update the user's login info */}
            <div className="text-center">
                <button
                    type="submit"
                    className="bg-black text-white px-8 py-3 rounded-full text-lg">
                    Save
                </button>
            </div>
        </form>
    );
};

export default ProfilePage
