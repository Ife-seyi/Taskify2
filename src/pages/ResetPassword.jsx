import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  // const handleNext = async () => {
  //   if (!email || !email.includes("@")) {
  //     toast.error("Please enter a valid email address");
  //     return;
  //   }

  //   try {
  //     const generatedCode = Math.floor(
  //       100000 + Math.random() * 900000
  //     ).toString();

  //     // Encode email to use as a valid Firestore document ID
  //     const encodedEmail = email.replace(/\./g, "(dot)").replace(/@/g, "(at)");

  //     // Store code in Firestore
  //     await setDoc(doc(db, "resetCodes", encodedEmail), {
  //       email, // original email
  //       code: generatedCode,
  //       createdAt: serverTimestamp(),
  //     });

  //     toast.success(`Verification code sent to ${email}`);
  //     navigate("/verify-email", { state: { email } });
  //   } catch (error) {
  //     console.error("Firestore error:", error);
  //     toast.error("Something went wrong. Try again.");
  //   }
  // };

  const handleNext = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const generatedCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      const encodedEmail = email.replace(/\./g, "(dot)").replace(/@/g, "(at)");

      // Store code in Firestore
      await setDoc(doc(db, "resetCodes", encodedEmail), {
        email,
        code: generatedCode,
        createdAt: serverTimestamp(),
      });

      // ✅ Send verification email using Vercel API
      const response = await fetch(
        'https://taskify-ay7017a3j-ife-seyis-projects.vercel.app/api/sendCode',

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code: generatedCode }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send verification email");
      }

      toast.success(`Verification code sent to ${email}`);
      navigate("/verify-email", { state: { email } });
    } catch (error) {
      console.error("Error during reset process:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col h-full">
        <button onClick={handleBack} className="text-gray-700 text-2xl mb-4">
          <FaArrowLeft />
        </button>

        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Reset your password
          </h2>
          <p className="text-sm text-gray-500">Enter your email address</p>
        </div>

        <div className="mt-8">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="eg emmanuel@gmail.com"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-auto pt-10">
          <button
            onClick={handleNext}
            className="block w-full text-center bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-md font-semibold transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
