import React, { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";
import { resetPasswordEmail } from "../services/firebase";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Fetch user's data from Firestore
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return; // Not logged in

    const docRef = doc(db, "users", currentUser.uid);
    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phoneNumber || "");
      }
    });
  }, []);

  // Toggle edit mode
  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };


  // Save updates to Firestore
  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("No user is logged in!");
      return;
    }

    try {
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phoneNumber: phoneNumber.trim(),
        },
        { merge: true }
      );
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Check console for details.");
    }
  };

  // Send password reset email
  const handleResetPassword = async () => {
    if (!email.trim()) {
      alert("No email to send the reset link to!");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      alert("Password reset email sent!");
    } catch (error) {
      console.error("Error sending password reset:", error);
      alert("Failed to send password reset email. Check console for details.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-xl font-semibold text-center">Profile</h2>

      {/* We remove onSubmit to avoid accidental submission */}
      <form className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-md font-medium mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            disabled={!isEditing}
            onChange={(e) => setFirstName(e.target.value)}
            className="text-black w-full h-8 p-3 rounded-full bg-gray-300 border border-black disabled:bg-gray-200"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-md font-medium mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            disabled={!isEditing}
            onChange={(e) => setLastName(e.target.value)}
            className="text-black w-full h-8 p-3 rounded-full bg-gray-300 border border-black disabled:bg-gray-200"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-md font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled={!isEditing}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black w-full h-8 p-3 rounded-full bg-gray-300 border border-black disabled:bg-gray-200"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-md font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            disabled={!isEditing}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="text-black w-full h-8 p-3 rounded-full bg-gray-300 border border-black disabled:bg-gray-200"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-6">
          {!isEditing ? (
            <button
              type="button"
              onClick={handleToggleEdit}
              className="bg-black text-white rounded-full py-2 px-6 hover:bg-slate-600"
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="bg-black text-white rounded-full py-2 px-6 hover:bg-slate-600"
            >
              Save
            </button>
          )}

          {/* Password Reset Button */}
          <button
            type="button"
            onClick={handleResetPassword}
            className="bg-yellow-600 text-white rounded-full py-2 px-6 hover:bg-yellow-700"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
