import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail, // 1. Import
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

/**
 * Create or update a user's document in Firestore.
 * @param {string} uid - Firebase Auth user UID
 * @param {object} data - Additional user data to store
 */
const createOrUpdateUserDoc = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    // If the doc doesn't exist, create it
    await setDoc(userRef, {
      ...data,
      createdAt: new Date().toISOString(),
    });
  } else {
    // Optionally merge if you want to keep existing fields
    // await setDoc(userRef, data, { merge: true });
  }
};

// Google Sign-In Function
const signInWithGoogle = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Create/update user doc in Firestore
    await createOrUpdateUserDoc(user.uid, {
      displayName: user.displayName || "",
      email: user.email || "",
      points: 100,
    });

    console.log("Google Sign-In Success:", user);
    navigate("/order"); // Redirect after successful login
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

// Email & Password Login
const loginWithEmail = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/order"); // Redirect after successful login
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

// Email & Password Signup
// Accept extra fields (firstName, lastName, dob) for Firestore
const signUpWithEmail = async (email, password, navigate, firstName, lastName, dob) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;
    const loyaltyPoints = 100;

    // Create a doc in Firestore with user details
    await createOrUpdateUserDoc(newUser.uid, {
      firstName,
      lastName,
      dob,
      email,
      loyaltyPoints
    });

    navigate("/order"); // Redirect after successful signup
  } catch (error) {
    console.error("Signup Error:", error.message);
    throw error;
  }
};

// 2.  function to handle sending a password-reset email
const resetPasswordEmail = async (email) => {
  try {
    // By default, the user will be taken to a Firebase-hosted page to reset their password.
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent!");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

export {
  app,
  auth,
  db,
  googleProvider,
  analytics,
  signInWithGoogle,
  loginWithEmail,
  signUpWithEmail,
  resetPasswordEmail, 
};
