"use client";

import { useState } from "react";
import DashbaordProfile from "./DashbaordProfile";
import DashbaordInterst from "./DashbaordInterst";
import DashboardSubscritpion from "./DashboardSubscritpion";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";

function DashboardProfileEdit() {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal Information" },
    { id: "interests", label: "Interests" },
    { id: "subscription", label: "Subscription" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div>
            <DashbaordProfile />
          </div>
        );
      case "interests":
        return (
          <div>
            <DashbaordInterst />
          </div>
        );
      case "subscription":
        return (
          <div>
            <DashboardSubscritpion />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="flex gap-5 container mx-auto py-4">
        {/* Sidebar */}
        <div className="w-1/6">
          <div className="flex ">
            <NavLink to="/dashboard">
            <BiArrowBack  size={24} className="mt-[24px] hover:text-[#615FFF]"/>
          </NavLink>
          <div className=" rounded-lg p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-[14px] font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-4/5">{renderContent()}</div>
      </div>
    </div>
  );
}

export default DashboardProfileEdit;
