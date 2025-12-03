"use client";

import { useState } from "react";
import Image from "../../image/adfadf.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useOtpVerifyMutation } from "../../redux/features/authentication";
import { toast } from "react-toastify";

function Verification() {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [verifyOtp, { isLoading }] = useOtpVerifyMutation();
  const navigate = useNavigate();
  const savedEmail = localStorage.getItem("reset_email") || "";
  const getOtpString = () => {
    return verificationCode.join("");
  };
  const handleVerify = async () => {
    const otp = getOtpString();
    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    if (!savedEmail) {
      toast.error("Email not found. Please try again from forgot password.");
      return;
    }
    try {
      const result = await verifyOtp({
        email: savedEmail,
        otp: otp,
      }).unwrap();
      toast.success(result?.message || "OTP verified successfully!");
      localStorage.setItem("access_token", result.access);
      localStorage.removeItem("reset_email");
      navigate("/reset-password");
    } catch (err) {
      toast.error(
        err?.data?.detail || err?.data?.otp?.[0] || "Invalid or expired OTP"
      );
    }
  };
  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(paste)) {
      setVerificationCode(paste.split(""));
      setTimeout(handleVerify, 300);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-1/2">
        <img
          className="w-1/2 mx-auto"
          src={Image}
          alt="Verification illustration"
          width={400}
          height={400}
        />
      </div>

      {/* input and order details */}
      <div className="w-1/2 px-12">
        <div className="max-w-md">
          {/* Main Content */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Check your Mail
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              We've sent a 6-digit confirmation code to{" "}
              <span className="font-semibold text-gray-900 break-all">
                {savedEmail || "your email"}
              </span>
              . Make sure you enter correct code.
            </p>
          </div>

          {/* Verification Code Inputs */}
          <div className="flex gap-3 mb-8">
            {verificationCode.map((digit, index) => (
              <input
                onPaste={handlePaste}
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-13 h-13 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder=""
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium text-lg transition-colors mb-6 flex items-center justify-center ${
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
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </button>

          {/* Resend Code */}
          {/* <p className="text-center text-gray-600">
            Didn't Recieve code? <button className="text-blue-600 hover:text-blue-800 font-medium">Resend Code</button>
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Verification;
