import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";
import image from "../../image/Frame 11.png";
import { useShowProfileInformationQuery } from "../../redux/features/baseApi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const BASE_URL = "https://cowbird-central-crawdad.ngrok-free.app";
  const {
    data: profileInfo,
    isLoading,
    refetch,
  } = useShowProfileInformationQuery(undefined, {
    skip: !token,
  });

  const user = profileInfo?.user;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsProfileOpen(false);
    navigate("/login");
  };

  // Remove automatic refetch on mount (RTK does first fetch automatically)
  // Only refetch when menu opens IF token exists
  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
    if (!isProfileOpen && token) {
      refetch();
    }
  };

  // close dropdown on click outside
  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex items-center justify-between container mx-auto py-4 poppins relative z-50">
      {/* Logo */}
      <div>
        <img src={image} className="h-18" alt="Logo" />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-[18px] font-semibold ${
              isActive ? "text-gray-900" : "text-gray-600"
            }`
          }
        >
          About
        </NavLink>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Desktop: Profile */}
        <div className="hidden md:block relative profile-dropdown">
          {isLoading ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <img
                src={
                  user.profile_picture
                    ? `${BASE_URL}${user.profile_picture}`
                    : "https://via.placeholder.com/40"
                }
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
              <span className="font-medium text-gray-800">{user.name}</span>
              <HiChevronDown
                className={`transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          ) : (
            <NavLink to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-[#407BFF] text-white px-6 py-2.5 rounded-lg font-medium"
              >
                Sign in
              </motion.button>
            </NavLink>
          )}

          {/* Desktop Dropdown */}
          <AnimatePresence>
            {isProfileOpen && user && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
              >
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsProfileOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-3xl text-gray-800"
        >
          {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-2xl z-50 p-6 flex flex-col"
          >
            <button onClick={toggleMenu} className="self-end mb-8 text-3xl">
              <HiX />
            </button>

            <NavLink
              to="/about"
              onClick={toggleMenu}
              className="text-lg font-medium text-gray-700 py-3"
            >
              About
            </NavLink>

            {/* Mobile: Profile */}
            {!isLoading && user ? (
              <div className="mt-6 border-t pt-6">
                <div className="flex items-center space-x-3 mb-6">
                  <img
                    src={
                      user.profile_picture
                        ? `${import.meta.env.VITE_API_URL}${
                            user.profile_picture
                          }`
                        : "https://via.placeholder.com/40"
                    }
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <NavLink
                  to="/dashboard"
                  onClick={toggleMenu}
                  className="block py-3 text-blue-600 font-medium"
                >
                  Dashboard
                </NavLink>

                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left py-3 text-red-600 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                onClick={toggleMenu}
                className="mt-8 bg-[#407BFF] text-white text-center py-3 rounded-lg font-medium"
              >
                Sign in
              </NavLink>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}
    </div>
  );
};

export default Navbar;
