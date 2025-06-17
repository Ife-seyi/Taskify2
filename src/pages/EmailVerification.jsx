import React, { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const EmailVerification = () => {
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    toast.error("Email not found. Please restart the reset process.");
    navigate("/resetpassword");
  }

  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);

    const enteredCode = inputsRef.current.map((input) => input?.value).join("");

    if (enteredCode.length !== 6) {
      toast.error("Please enter the full 6-digit code");
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(db, "resetCodes", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const correctCode = docSnap.data().code;

        if (enteredCode === correctCode) {
          toast.success("Code verified successfully");
          navigate("/create-new-password", { state: { email } });
        } else {
          toast.error("Incorrect code. Please try again.");
        }
      } else {
        toast.error("No verification code found. Please restart the process.");
        navigate("/resetpassword");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }

    setLoading(false);
  };



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col min-h-[80vh]">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-700 text-2xl mb-4"
        >
          <FaArrowLeft />
        </button>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Verify your email
          </h2>
          <p className="text-sm text-gray-500">
            Enter the 6-digit code sent to your email.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mt-10">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              ref={(el) => (inputsRef.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleBackspace(e, i)}
              className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-auto pt-10">
          <button
            type="button"
            onClick={handleVerify}
            disabled={loading}
            className={`w-full ${
              loading ? "bg-teal-300" : "bg-teal-500 hover:bg-teal-600"
            } text-white py-3 rounded-md font-semibold transition flex items-center justify-center`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </div>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
