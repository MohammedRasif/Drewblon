import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for active state
import image from "../../image/Frame 11.png";

function Navbar() {
  return (
    <div className="flex items-center justify-between container mx-auto py-2 poppins">
      <div>
        <img src={image} alt="Logo" />
      </div>
      <div className="flex items-center space-x-4">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-[15px] font-semibold transition-all duration-300 hover:text-blue-500 hover:underline hover:underline-offset-4 ${
              isActive ? "text-gray-800" : "text-gray-600"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `text-[15px] font-semibold transition-all duration-300 hover:text-blue-500 hover:underline hover:underline-offset-4 ${
              isActive ? "text-gray-800" : "text-gray-600"
            }`
          }
        >
          Pricing
        </NavLink>
      </div>

      <div className="space-x-4">
        <button className=" text-black   py-2 px-3 rounded-md hover:bg-blue-600 transition-colors duration-300">
          Sign in
        </button>
        <button className="bg-[#407BFF] text-white py-2 px-3 rounded-md hover:bg-blue-600 transition-colors duration-300">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Navbar;