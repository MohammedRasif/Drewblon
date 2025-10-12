import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Hamburger and close icons
import image from "../../image/Frame 11.png";

// Animation variants for NavLink
const linkVariants = {
  initial: { scale: 1, opacity: 1 },
  hover: {
    scale: 1.1,
    color: "#3B82F6",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// Animation variants for buttons
const buttonVariants = {
  initial: { scale: 1, opacity: 1 },
  hover: {
    scale: 1.05,
    backgroundColor: "#2563EB",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// Animation for underline effect
const underlineVariants = {
  initial: { width: 0 },
  hover: {
    width: "100%",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// Animation for side menu
const menuVariants = {
  hidden: {
    x: "100%", // Start off-screen to the right
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  visible: {
    x: 0, // Slide in to view
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-between container mx-auto py-4 poppins relative z-60">
      {/* Logo */}
      <div>
        <img src={image} className="h-10" alt="Logo" />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `relative text-[18px] font-semibold ${
              isActive ? "text-gray-800" : "text-gray-600"
            }`
          }
        >
          {({ isActive }) => (
            <motion.div
              variants={linkVariants}
              initial="initial"
              whileHover="hover"
              className="inline-block"
            >
              About
              <motion.div
                variants={underlineVariants}
                initial="initial"
                whileHover="hover"
                className="absolute bottom-0 left-0 h-[2px] bg-blue-500"
              />
            </motion.div>
          )}
        </NavLink>
        {/* <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `relative text-[18px] font-semibold ${
              isActive ? "text-gray-800" : "text-gray-600"
            }`
          }
        >
          {({ isActive }) => (
            <motion.div
              variants={linkVariants}
              initial="initial"
              whileHover="hover"
              className="inline-block"
            >
              Pricing
              <motion.div
                variants={underlineVariants}
                initial="initial"
                whileHover="hover"
                className="absolute bottom-0 left-0 h-[2px] bg-blue-500"
              />
            </motion.div>
          )}
        </NavLink> */}
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex space-x-4">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          className="text-black py-2 px-3 rounded-md lg:text-[18px]"
        >
          Sign in
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          className="bg-[#407BFF] text-white py-2 px-3 rounded-md lg:text-[18px]"
        >
          Sign up
        </motion.button>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className="text-3xl text-gray-800"
        >
          {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
        </motion.button>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 md:hidden flex flex-col items-start p-6 space-y-4"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="self-end text-3xl text-gray-800"
            >
              <HiX />
            </motion.button>
            <NavLink
              to="/about"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `text-[18px] font-semibold ${
                  isActive ? "text-gray-800" : "text-gray-600"
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                  className="inline-block"
                >
                  About
                  <motion.div
                    variants={underlineVariants}
                    initial="initial"
                    whileHover="hover"
                    className="absolute bottom-0 left-0 h-[2px] bg-blue-500"
                  />
                </motion.div>
              )}
            </NavLink>
            <NavLink
              to="/pricing"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `text-[18px] font-semibold ${
                  isActive ? "text-gray-800" : "text-gray-600"
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                  className="inline-block"
                >
                  Pricing
                  <motion.div
                    variants={underlineVariants}
                    initial="initial"
                    whileHover="hover"
                    className="absolute bottom-0 left-0 h-[2px] bg-blue-500"
                  />
                </motion.div>
              )}
            </NavLink>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              onClick={toggleMenu}
              className="text-black py-2 px-3 rounded-md w-full text-left"
            >
              Sign in
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              onClick={toggleMenu}
              className="bg-[#407BFF] text-white py-2 px-3 rounded-md w-full text-left"
            >
              Sign up
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
