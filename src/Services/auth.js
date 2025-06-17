// src/services/auth.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signUp = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

import { signInWithEmailAndPassword } from "firebase/auth";

export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../firebase";

export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};
