"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import img from "../../../image/Frame 11.png";

const UserDashboardSidebar = () => {
  const [activeItem, setActiveItem] = useState("profile");
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      path: "/dashboard",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: "feed",
      label: "Feed",
      path: "/dashboard/feed",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
    },
    {
      id: "talks",
      label: "Talks",
      path: "/dashboard/talks",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: "videos",
      label: "Videos",
      path: "/dashboard/video",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: "simulation",
      label: "Simulation",
      path: "/dashboard/simulation",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const getActiveItemFromPath = () => {
    const currentPath = location.pathname;

    // If current path starts with /dashboard/details → videos active
    if (currentPath.startsWith("/dashboard/details")) {
      return "videos";
    }

    // If path starts with /dashboard/simulation → simulation active (handles /dashboard/simulation/4 etc.)
    if (currentPath.startsWith("/dashboard/simulation")) {
      return "simulation";
    }

    // Otherwise match exact path
    const foundItem = menuItems.find((item) => item.path === currentPath);
    return foundItem ? foundItem.id : "profile";
  };

  useEffect(() => {
    const newActiveItem = getActiveItemFromPath();
    if (newActiveItem !== activeItem) {
      setActiveItem(newActiveItem);
    }
  }, [location.pathname, activeItem]);

  const handleNavigation = (item) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  return (
    <div className="w-64 h-screen shadow-lg">
      {/* Logo Section */}
      <div className="flex justify-center items-center pt-5 pb-10">
        <img src={img} alt="Logo" className="h-8" />
      </div>

      {/* Navigation Menu */}
      <nav className="px-5 pl-8">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <div
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center px-4 py-3 rounded-md text-left transition-all duration-200 hover:cursor-pointer group ${
                  activeItem === item.id
                    ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleNavigation(item);
                  }
                }}
              >
                <span
                  className={`mr-3 transition-colors duration-200 ${
                    activeItem === item.id
                      ? "text-blue-600"
                      : "text-gray-700 group-hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`font-medium text-[16px] transition-colors duration-200 ${
                    activeItem === item.id
                      ? "text-blue-600"
                      : "text-gray-700 group-hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </span>
                {/* Active indicator */}
                {activeItem === item.id && (
                  <div className="ml-auto w-1 h-4 bg-blue-600 rounded-full"></div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserDashboardSidebar;
