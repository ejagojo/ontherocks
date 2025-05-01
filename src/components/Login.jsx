import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, loginWithEmail } from "../services/firebase";
import { FcGoogle } from "react-icons/fc";
import LoadingSpinner from "./LoadingSpinner";
import { seedInventory } from "../services/seedInventory";
import { seedStores } from "../services/seedStore";
import { seedCocktailRecipes } from "../services/seedDrinks";

const LoginForm = ({ toggleForm }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setLoading(true);
    setError(null);
    loginWithEmail(email, password, navigate)
      .catch((err) => {
        console.error("Email/Password Login Error:", err);
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Seeding inventory...");
      // await seedStores();
      // await seedInventory();
      // await seedCocktailRecipes();
      console.log("Inventory seeded!");

      await signInWithGoogle(navigate);
      console.log("Google Sign-In success!");
    } catch (error) {
      console.error("handleGoogleLogin Error:", error);
      setError("Google sign-in failed. Please try again later.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="w-full max-w-[320px] md:max-w-[400px] p-4 border border-white rounded-lg bg-opacity-0 backdrop-blur-xs">
        <h2 className="text-lg font-semibold mb-4 text-center">Login</h2>
        {error && <p className="text-sm text-red-500 mb-3 text-center">{error}</p>}
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
        <div className="mb-3">
          <label className="block text-xs mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-black bg-white rounded-md focus:outline-none font-medium border border-gray-300"
            placeholder="Password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-3 mt-4 text-sm font-semibold text-white bg-[#2F2F2F] rounded-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-[#404040]"
        >
          Login
        </button>
        <div className="my-3 text-center text-xs text-gray-400">- or -</div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold bg-white text-black rounded-md transition-transform duration-300 ease-in-out hover:scale-105 border border-gray-300"
        >
          <FcGoogle className="mr-2 text-lg" /> Sign in with Google
        </button>
        <p className="mt-3 text-[10px] text-center">
          By continuing, you agree to OnTheRocks <br />
          <span className="underline cursor-pointer">Terms of Service</span> and acknowledge you’ve read <br />
          our <span className="underline cursor-pointer">Privacy Policy</span>. Notice at collection.
        </p>
        <p className="mt-3 text-xs text-center">
          New to OnTheRocks?{" "}
          <button onClick={toggleForm} className="text-yellow-400 hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </>
  );
};

LoginForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default LoginForm;
