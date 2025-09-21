"use client";

import { useState } from "react";
import Image from "../../image/rafiki.png";
import { NavLink } from "react-router-dom";

function ForgetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4 cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
