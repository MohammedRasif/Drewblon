"use client";

import { useState } from "react";
import Image from "../../image/adfadf.png";

function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

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
          {/* Header Navigation */}
          {/* <div className="flex items-center justify-between mb-12">
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            <div className="text-right">
              <div className="text-sm text-gray-500">Step 2 of 3</div>
              <div className="text-sm font-medium text-gray-700">
                Forgot Password
              </div>
            </div>
          </div> */}

          {/* Main Content */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Check your Mail
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              We,ve sent a 6-digit confirmation code to{" "}
              <span className="font-semibold text-gray-900">
                username@gmail.com
              </span>{" "}
              Make sure you enter correct code.
            </p>
          </div>

          {/* Verification Code Inputs */}
          <div className="flex gap-3 mb-8">
            {verificationCode.map((digit, index) => (
              <input
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
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors mb-6 cursor-pointer">
            Verify
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

export default EmailVerification;
