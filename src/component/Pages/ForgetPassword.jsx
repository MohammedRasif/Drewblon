"use client";

import { useState } from "react";
import Image from "../../image/rafiki.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../redux/features/authentication";
import { toast } from "react-toastify";

function ForgetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    try {
      const result = await forgetPassword({ email }).unwrap();

      toast.success(
        result?.message || "Check your email! We sent a reset link."
      );

      localStorage.setItem("reset_email", email);

      navigate("/verification");
    } catch (error) {
      const errorMsg =
        error?.data?.detail ||
        error?.data?.email?.[0] ||
        error?.data?.message ||
        "Something went wrong. Try again.";

      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-1/2">
        <img
          className="w-1/2 mx-auto"
          src={Image}
          alt="Login illustration"
          width={400}
          height={400}
        />
      </div>

      {/* input and order details */}
      <div className="w-1/2 px-12">
        <div className="max-w-md">
          {/* Header */}
          <div className="mb-8">
            {/* <h1 className="text-4xl font-bold text-gray-900 mb-2">Hello,</h1> */}
            <h2 className="text-4xl font-bold text-gray-900 pb-4">
              Forgot Password
            </h2>
            <p className="text-gray-500 text-lg font-semibold  leading-relaxed">
              Enter the email of your account and we will send the email to
              reset your password.
            </p>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-4 flex items-center justify-center ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v-4a12 12 0 00-12 12z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
