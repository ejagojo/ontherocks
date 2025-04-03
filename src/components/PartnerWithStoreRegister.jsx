import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signUpWithEmail } from "../services/firebase";
import { FcGoogle } from "react-icons/fc";
import LoadingSpinner from "./LoadingSpinner";

const PartnerWithStoreRegister = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMobile, setShowMobile] = useState(true);

  const handleSignUp = () => {
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    signUpWithEmail(email, password, navigate)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleGoogleSignUp = () => {
    setLoading(true);
    signInWithGoogle(navigate)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className={`fixed inset-0 z-50 flex items-center justify-center md:static md:inset-auto md:z-auto md:flex-none md:justify-start md:text-white text-black ${!showMobile ? "hidden md:flex" : ""}`}>
        <div className="relative w-full max-w-[320px] md:max-w-[400px] p-4 border border-white rounded-lg bg-white md:bg-opacity-0 md:bg-[#ffffff10] md:backdrop-blur-xs">
          <button
            onClick={() => setShowMobile(false)}
            className="absolute top-2 right-3 text-black text-xl md:hidden"
            aria-label="Close"
          >
            &times;
          </button>

          <h2 className="text-lg font-semibold mb-4 text-center md:text-white">Sign Up</h2>

          <div className="mb-3">
            <label className="block text-xs mb-1 md:text-white">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
              placeholder="Your Store Name"
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs mb-1 md:text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
              placeholder="Email"
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs mb-1 md:text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
              placeholder="Password"
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs mb-1 md:text-white">Re-Type Password</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
              placeholder="Re-type password"
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}

          <div className="mb-3">
            <label className="block text-xs mb-1 md:text-white">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
            />
          </div>

          <button
            onClick={handleSignUp}
            className={`w-full px-4 py-3 mt-4 text-sm font-semibold rounded-md transition-transform duration-300 ease-in-out ${
              email && password && password2 && dob && storeName
                ? "bg-[#2F2F2F] text-white hover:scale-105 hover:bg-[#404040]"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!email || !password || !password2 || !dob || !storeName}
          >
            Sign Up
          </button>

          <div className="my-3 text-center text-xs text-gray-400">- or -</div>

          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold bg-white text-black rounded-md transition-transform duration-300 ease-in-out hover:scale-105 border border-gray-300"
          >
            <FcGoogle className="mr-2 text-lg" /> Sign up with Google
          </button>

          <p className="mt-3 text-[10px] text-center md:text-white">
            By continuing, you agree to OnTheRocks <br />
            <span className="underline cursor-pointer">Terms of Service</span> and acknowledge you’ve read <br />
            our <span className="underline cursor-pointer">Privacy Policy</span>. Notice at collection.
          </p>

          <p className="mt-3 text-xs text-center md:text-white">
            Already a member?{" "}
            <button onClick={toggleForm} className="text-yellow-400 hover:underline">
              Log in
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

PartnerWithStoreRegister.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default PartnerWithStoreRegister;
