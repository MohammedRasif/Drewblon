import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function DashbaordProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="rounded-lg p-4 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-[20px] font-semibold text-gray-900">
            Personal Information
          </h1>
        </div>
        <button className="bg-[#3565FC] hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium text-[16px] cursor-pointer">
          Update
        </button>
      </div>

      {/* Profile Picture Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-gray-200">
          <img
            src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-5">
          <button className="bg-[#3565FC] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-[14px] font-medium cursor-pointer">
            Change picture
          </button>
          <button className="text-red-500 hover:text-red-600 text-[14px] font-medium border px-4 py-2 rounded-lg cursor-pointer">
            Delete picture
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2">
              First name
            </label>
            <input
              type="text"
              defaultValue="Jhon"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2">
              Last name
            </label>
            <input
              type="text"
              defaultValue="Hnh"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Education Institute */}
        <div>
          <label className="block text-[14px] font-medium text-gray-700 mb-2">
            Name of education institute
          </label>
          <h1 className="text-[16px] text-[#525252]">Brack school</h1>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[14px] font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <h1 className="text-[16px] text-[#525252]">ed@gmail.com</h1>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <IoMdCheckmarkCircleOutline size={24} className="text-green-600" />

            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Change password
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm new password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashbaordProfile;
