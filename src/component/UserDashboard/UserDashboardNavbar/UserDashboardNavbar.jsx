"use client";

import { useState, useRef, useEffect } from "react";
import { GoChevronDown } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const UserDashboardNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center justify-end py-[7px] gap-6  w-full  pr-10">
      {/* Notification Icon */}
      <IoNotificationsOutline className="text-gray-600 text-2xl font-bold cursor-pointer hover:text-gray-800" />

      {/* User Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
          onClick={toggleDropdown}
        >
          <img
            src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg"
            className="rounded-full h-8 w-8 object-cover"
            alt="Profile"
          />
          <span className="text-gray-800 font-medium">Ronald Jones</span>
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
                className="w-full text-left px-4 py-2 text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => {
                  setIsDropdownOpen(false);
                  // Add settings functionality here
                }}
              >
                Settings
              </button>
              </NavLink>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => {
                  setIsDropdownOpen(false);
                  // Add logout functionality here
                }}
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
