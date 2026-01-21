"use client";

import { useState, useRef, useEffect } from "react";
import { GoChevronDown } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom"; // ← useNavigate যোগ করা হয়েছে
import { useShowProfileInformationQuery } from "../../../redux/features/baseApi";

const UserDashboardNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // ← এটা যোগ করো

  const {
    data: profileInfo,
    isLoading,
    // refetch, // যদি দরকার না হয় তাহলে কমেন্ট করে রাখতে পারো
  } = useShowProfileInformationQuery();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // টোকেন গুলো মুছে ফেলা
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    
    // ড্রপডাউন বন্ধ করা
    setIsDropdownOpen(false);
    
    // লগইন পেজে নিয়ে যাওয়া
    navigate("/login");
    
    // অপশনাল: পেজ রিফ্রেশ করতে চাইলে (কিছু ক্ষেত্রে দরকার হয়)
    // window.location.href = "/login";
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center justify-end py-[7px] gap-6 w-full pr-10">
      {/* User Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
          onClick={toggleDropdown}
        >
          <img
            src={
              profileInfo?.user?.profile_picture
                ? `${profileInfo.user.profile_picture}`
                : "/default-avatar.png"
            }
            className="rounded-full h-8 w-8 object-cover"
            alt="Profile"
          />

          <span className="text-gray-800 font-medium">
            {profileInfo?.user?.name ?? "Loading..."}
          </span>

          <GoChevronDown
            className={`text-gray-600 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="py-2">
              <NavLink to="/dashboard/EditProfile">
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Settings
                </button>
              </NavLink>

              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-semibold transition-colors cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardNavbar;