import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col h-full">
        <button onClick={handleBack} className="text-gray-700 text-2xl mb-4">
          <FaArrowLeft />
        </button>

        {/* Headings */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Create new password
          </h2>
          <p className="text-sm text-gray-500">
            Create a strong password to secure your account.
          </p>
        </div>

        {/* inputs */}
        <div className="mt-8">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Enter new password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••••"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />

          <div className="mt-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••••"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>

        {/* create new password button */}
        <div className="mt-10">
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
          >
            Create password
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
