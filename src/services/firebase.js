import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

// Google Sign-In Function
const signInWithGoogle = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-In Success:", result.user);
    navigate("/order"); // Redirect after successful login
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

// Email & Password Login Function
const loginWithEmail = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/order"); // Redirect after successful login
  } catch (error) {
    console.error("Login Error:", error.message);
  }
};

// Email & Password Signup Function
const signUpWithEmail = async (email, password, navigate) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/order"); // Redirect after successful signup
  } catch (error) {
    console.error("Signup Error:", error.message);
  }
};

export { app, auth, googleProvider, analytics, signInWithGoogle, loginWithEmail, signUpWithEmail };
