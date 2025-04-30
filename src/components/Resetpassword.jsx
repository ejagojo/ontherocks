import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import LoadingSpinner from "./LoadingSpinner";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleResetPassword = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      console.error("Password Reset Error:", err);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="w-full max-w-[320px] md:max-w-[400px] p-4 border border-white rounded-lg bg-opacity-0 backdrop-blur-xs">
        <h2 className="text-lg font-semibold mb-4 text-center">Reset Password</h2>
        {error && <p className="text-sm text-red-500 mb-3 text-center">{error}</p>}
        {successMessage && <p className="text-sm text-green-500 mb-3 text-center">{successMessage}</p>}
        <div className="mb-3">
          <label className="block text-xs mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
            placeholder="Email"
          />
        </div>
        <button
          onClick={handleResetPassword}
          className="w-full px-4 py-3 mt-4 text-sm font-semibold text-white bg-[#2F2F2F] rounded-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-[#404040]"
        >
          Send Reset Email
        </button>
      </div>
    </>
  );
};

ResetPasswordForm.propTypes = {
    toggleForm: PropTypes.func.isRequired
};

export default ResetPasswordForm;
