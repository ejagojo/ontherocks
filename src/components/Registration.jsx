import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { signInWithGoogle, signUpWithEmail } from "../services/firebase";
import { FcGoogle } from "react-icons/fc"; // Google Icon

const SignUpForm = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");

  return (
    <div className="w-[500px] p-10 border border-white rounded-xl bg-opacity-0 backdrop-blur-xs">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 text-black bg-white rounded-lg focus:outline-none font-semibold italic"
          placeholder="Email"
        />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 text-black bg-white rounded-lg focus:outline-none font-semibold italic"
          placeholder="Password"
        />
      </div>

      {/* Date of Birth Input */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full px-4 py-3 text-black bg-white rounded-lg focus:outline-none font-semibold italic"
        />
      </div>

      {/* Sign Up Button */}
      <button
        onClick={() => signUpWithEmail(email, password, navigate)}
        className="w-full px-6 py-4 mt-6 text-lg font-semibold text-white bg-[#2F2F2F] rounded-full transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-[#404040]"
      >
        Sign Up
      </button>

      {/* Divider */}
      <div className="my-4 text-center text-sm text-gray-400">- or -</div>

      {/* Google Sign-Up Button */}
      <button
        onClick={() => signInWithGoogle(navigate)}
        className="w-full flex items-center justify-center px-6 py-4 mt-4 text-lg font-semibold bg-white text-black rounded-full transition-transform duration-300 ease-in-out hover:scale-105"
      >
        <FcGoogle className="mr-2 text-2xl" /> Sign up with Google
      </button>
      {/* Terms & Privacy Policy */}
      <p className="mt-4 text-xs text-center">
        By continuing, you agree to OnTheRocks <br />
        <span className="underline cursor-pointer">Terms of Service</span> and acknowledge you’ve read <br />
        our <span className="underline cursor-pointer">Privacy Policy</span>. Notice at collection.
      </p>

      {/* Switch to Login */}
      <p className="mt-4 text-sm text-center">
        Already a member?{" "}
        <button onClick={toggleForm} className="text-yellow-400 hover:underline">
          Log in
        </button>
      </p>
    </div>
  );
};

SignUpForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default SignUpForm;
