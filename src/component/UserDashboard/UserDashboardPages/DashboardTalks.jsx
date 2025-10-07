import React, { useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import { RiVoiceprintLine } from "react-icons/ri";
import { motion } from "framer-motion";
import RecordedTalks from "./RecordedTalks";
import Upcomming from "./Upcomming";

function DashboardTalks() {
  const [activeTab, setActiveTab] = useState("recorded");
  const [selectedCategory, setSelectedCategory] = useState("All categories");

  const categories = [
    "All categories",
    "Business",
    "Engineering",
    "Art Entertainment and culture",
    "HealthCare",
    "Trades",
    "Science/Research",
    "Informational Tech",
    "Law/Legal",
    "Public Sector",
    "Exploration",
    "Life and Career Advice",
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const buttonVariants = {
    active: {
      backgroundColor: "#2563eb",
      color: "#ffffff",
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    inactive: {
      backgroundColor: "#e5e7eb",
      color: "#000000",
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Expert Talks
          </h1>
          <p className="text-gray-600 text-base mb-6">
            Learn from industry professionals and academic experts through live
            sessions
            <br />
            and recorded talks
          </p>

          {/* Toggle Buttons */}
          <div className="flex gap-3 mb-8">
            <motion.button
              variants={buttonVariants}
              animate={activeTab === "recorded" ? "active" : "inactive"}
              onClick={() => handleTabChange("recorded")}
              className="flex items-center gap-1 px-6 py-3 rounded-full font-medium text-[16px] shadow-md"
              whileHover={{ scale: activeTab === "recorded" ? 1.02 : 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <MdKeyboardVoice size={20} />
              Recorded Talks
            </motion.button>
            <motion.button
              variants={buttonVariants}
              animate={activeTab === "upcoming" ? "active" : "inactive"}
              onClick={() => handleTabChange("upcoming")}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-[16px] shadow-md"
              whileHover={{ scale: activeTab === "upcoming" ? 1.02 : 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <RiVoiceprintLine size={20} />
              Upcoming Livestreams
            </motion.button>
          </div>

          {/* Content based on active tab */}
          {activeTab === "recorded" ? (
            <>
              {/* Category Pills - Wrap to fit without scroll */}
              <div className="flex flex-wrap gap-2 pb-5">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors flex-shrink-0 ${
                      category === selectedCategory
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Talks Grid */}
              <div className="">
                <RecordedTalks selectedCategory={selectedCategory} />
              </div>
            </>
          ) : (
            <div className="">
              <Upcomming/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardTalks;