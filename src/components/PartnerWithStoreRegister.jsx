import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signUpWithEmail } from "../services/firebase";
import { FcGoogle } from "react-icons/fc";

const PartnerWithStoreRegister = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  // Function to handle sign up with validation
  const handleSignUp = () => {
    setError(""); // Reset previous errors

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    signUpWithEmail(email, password, navigate);
  };

  return (
    <div className="w-full max-w-[320px] md:max-w-[400px] p-4 border border-white rounded-lg bg-opacity-0 backdrop-blur-xs">
      <h2 className="text-lg font-semibold mb-4 text-center">Sign Up</h2>

      {/* Email Input */}
      <div className="mb-3">
        <label className="block text-xs mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium"
          placeholder="Email"
        />
      </div>

      {/* Password Input */}
      <div className="mb-3">
        <label className="block text-xs mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium"
          placeholder="Password"
        />
      </div>

      {/* Retype Password Input */}
      <div className="mb-3">
        <label className="block text-xs mb-1">Re-Type Password</label>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium"
          placeholder="Re-type password"
        />
      </div>

      {/* Display Error Message if Any */}
      {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}

      {/* Date of Birth Input */}
      <div className="mb-3">
        <label className="block text-xs mb-1">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium"
        />
      </div>

      {/* Sign Up Button - Disabled if any input is missing */}
      <button
        onClick={handleSignUp}
        className={`w-full px-4 py-3 mt-4 text-sm font-semibold rounded-md transition-transform duration-300 ease-in-out ${
          email && password && password2 && dob
            ? "bg-[#2F2F2F] text-white hover:scale-105 hover:bg-[#404040]"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
        disabled={!email || !password || !password2 || !dob}
      >
        Sign Up
      </button>

      {/* Divider */}
      <div className="my-3 text-center text-xs text-gray-400">- or -</div>

      {/* Google Sign-Up Button */}
      <button
        onClick={() => signInWithGoogle(navigate)}
        className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold bg-white text-black rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
      >
        <FcGoogle className="mr-2 text-lg" /> Sign up with Google
      </button>

      {/* Terms & Privacy Policy */}
      <p className="mt-3 text-[10px] text-center">
        By continuing, you agree to OnTheRocks <br />
        <span className="underline cursor-pointer">Terms of Service</span> and acknowledge you’ve read <br />
        our <span className="underline cursor-pointer">Privacy Policy</span>. Notice at collection.
      </p>

      {/* Switch to Login */}
      <p className="mt-3 text-xs text-center">
        Already a member?{" "}
        <button onClick={toggleForm} className="text-yellow-400 hover:underline">
          Log in
        </button>
      </p>
    </div>
  );
};

PartnerWithStoreRegister.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default PartnerWithStoreRegister;
