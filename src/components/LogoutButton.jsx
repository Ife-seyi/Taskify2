import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi"; // Optional: Logout icon

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out. Try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-2 flex items-center gap-2 bg-teal-500 text-white px-5 py-2.5 rounded-xl shadow hover:bg-teal-600 active:scale-95 transition-transform duration-200 text-sm md:text-base"
    >
      <FiLogOut className="text-lg" />
      Logout
    </button>
  );
};

export default LogoutButton;
