import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Reference to the form container for click-outside detection
  const formRef = useRef(null);

  // Fetch user's data from Firestore
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return; // Not logged in

    const docRef = doc(db, "users", currentUser.uid);
    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const fName = data.firstName || "";
        const lName = data.lastName || "";
        const userEmail = data.email || "";
        const phone = data.phoneNumber || "";
        setFirstName(fName);
        setLastName(lName);
        setEmail(userEmail);
        setPhoneNumber(phone);
        // Store original values for cancellation purposes
        setOriginalData({
          firstName: fName,
          lastName: lName,
          email: userEmail,
          phoneNumber: phone,
        });
      }
    });
  }, []);

  // Validate email: must not exceed total 254 characters, local part <= 64, and have a valid TLD.
  const validateEmail = (emailAddress) => {
    const emailRegex = /^(?=.{1,254}$)(?=.{1,64}@)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
    return emailRegex.test(emailAddress.trim());
  };

  // Validate US phone number: must have area and exchange codes starting with 2-9.
  const validatePhone = (phone) => {
    const usPhoneRegex = /^(?:\+1[-.\s]?)?\(?([2-9]\d{2})\)?[-.\s]?([2-9]\d{2})[-.\s]?(\d{4})$/;
    return usPhoneRegex.test(phone.trim());
  };

  // Save updates to Firestore after performing validations
  const handleSave = async () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address (e.g., john.doe@example.com).");
      return;
    }
    if (!validatePhone(phoneNumber)) {
      alert("Please enter a valid US phone number (e.g., 212-555-1212).");
      return;
    }
    
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
      // Update originalData to the new saved values.
      setOriginalData({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Check console for details.");
    }
  };

  // Cancel editing: revert changes and exit editing mode
  const handleCancel = () => {
    if (originalData) {
      setFirstName(originalData.firstName);
      setLastName(originalData.lastName);
      setEmail(originalData.email);
      setPhoneNumber(originalData.phoneNumber);
    }
    setIsEditing(false);
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

  // Toggle edit mode
  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // If editing and user clicks outside the form, cancel editing
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isEditing && formRef.current && !formRef.current.contains(event.target)) {
        handleCancel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-xl font-semibold text-center">Profile</h2>
      <div ref={formRef}>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* First Name */}
          <div>
            <label className="block text-md font-medium mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              readOnly={!isEditing}
              onFocus={() => setIsEditing(true)}
              onChange={(e) => setFirstName(e.target.value)}
              className="text-black w-full h-8 p-3 rounded-full bg-gray-300 border border-black"
            />
          </div>
          {/* Last Name */}
          <div>
            <label className="block text-md font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              readOnly={!isEditing}
              onFocus={() => setIsEditing(true)}
              onChange={(e) => setLastName(e.target.value)}
              className="text-black w-full h-8 p-3 rounded-full bg-gray-300 border border-black"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-md font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              readOnly={!isEditing}
              onFocus={() => setIsEditing(true)}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black w-full h-8 p-3 rounded-full bg-gray-300 border border-black"
            />
          </div>
          {/* Phone Number */}
          <div>
            <label className="block text-md font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              readOnly={!isEditing}
              onFocus={() => setIsEditing(true)}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="text-black w-full h-8 p-3 rounded-full bg-gray-300 border border-black"
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
    </div>
  );
};

export default ProfilePage;
