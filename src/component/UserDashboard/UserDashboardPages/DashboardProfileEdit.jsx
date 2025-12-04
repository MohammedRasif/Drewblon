"use client";
import { useState } from "react";
import DashbaordProfile from "./DashbaordProfile";
import DashboardSubscritpion from "./DashboardSubscritpion";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import {
  useShowProfileInformationQuery,
  useUpdateProfileInpormationMutation,
} from "../../../redux/features/baseApi";
import DashboardInterest from "./DashbaordInterst";

function DashboardProfileEdit() {
  const [activeTab, setActiveTab] = useState("personal");

  const { data: profileData, isLoading } = useShowProfileInformationQuery();
  const [updateProfileInpormation, { isLoading: isUpdating }] =
    useUpdateProfileInpormationMutation();

  const tabs = [
    { id: "personal", label: "Personal Information" },
    { id: "interests", label: "Interests" },
    { id: "subscription", label: "Subscription" },
  ];

  const renderContent = () => {
    if (isLoading) return <div className="p-8 text-center">Loading...</div>;

    const user = profileData?.user || {};

    switch (activeTab) {
      case "personal":
        return <DashbaordProfile user={user} />;
      case "interests":
        return (
          <DashboardInterest
            user={user}
            updateProfile={updateProfileInpormation}
            isUpdating={isUpdating}
          />
        );
      case "subscription":
        return <DashboardSubscritpion />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex gap-8 container mx-auto py-8">
        {/* Sidebar */}
        <div className="w-1/5">
          <div className="flex items-start gap-4">
            <NavLink to="/dashboard">
              <BiArrowBack
                size={28}
                className="mt-6 hover:text-[#615FFF] transition"
              />
            </NavLink>

            <div className="p-4 w-full">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
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
        <div className="w-4/5 bg-white rounded-xl shadow-sm p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default DashboardProfileEdit;
