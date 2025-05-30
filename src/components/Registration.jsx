import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, signUpWithEmail } from "../services/firebase";
import { FcGoogle } from "react-icons/fc";
import LoadingSpinner from "./LoadingSpinner";

const SignUpForm = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (new Date(dob) > new Date()) {
      setError("Date of birth cannot be in the future.");
      setLoading(false);
      return;
    }

    if (new Date(dob).getFullYear() >= 2004) {
      setError("You must be 21 or older to register.");
      setLoading(false);
      return;
    }

    setLoading(true);
    signUpWithEmail(email, password, navigate, firstName, lastName, dob)
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setError("Email already in use. Please log in or use a different email.");
        } else {
          setError(err.message);
        }
      })
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
      <div className="w-full max-w-[320px] md:max-w-[400px] p-4 border border-white rounded-lg bg-opacity-0 backdrop-blur-xs">
        <h2 className="text-lg font-semibold mb-4 text-center">Sign Up</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
              placeholder="Last Name"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
              placeholder="Password"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs mb-1">Re-Type Password</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
              placeholder="Re-type password"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
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
        <div className="my-3 text-center text-xs text-gray-400">- or -</div>
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold bg-white text-black rounded-md transition-transform duration-300 ease-in-out hover:scale-105 border border-gray-300"
        >
          <FcGoogle className="mr-2 text-lg" /> Sign up with Google
        </button>
        <p className="mt-3 text-[10px] text-center">
          By continuing, you agree to OnTheRocks <br />
          <span className="underline cursor-pointer">Terms of Service</span> and acknowledge you’ve read <br />
          our <span className="underline cursor-pointer">Privacy Policy</span>. Notice at collection.
        </p>
        <p className="mt-3 text-xs text-center">
          Already a member?{" "}
          <button onClick={toggleForm} className="text-yellow-400 hover:underline">
            Log in
          </button>
        </p>
      </div>
    </>
  );
};

SignUpForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default SignUpForm;
