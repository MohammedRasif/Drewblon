"use client";

import { useState } from "react";

function DashboardInterest() {
  const [careerInterests, setCareerInterests] = useState([
    "Business",
    "Engineering",
    "Healthcare",
    "Trades",
  ]);
  const [extracurricularActivities, setExtracurricularActivities] = useState([
    "Business",
    "Engineering",
    "Healthcare",
    "Trades",
  ]);
  const [showCareerOptions, setShowCareerOptions] = useState(false);
  const [showExtracurricularOptions, setShowExtracurricularOptions] =
    useState(false);

  const availableCareerOptions = [
    "Business",
    "Engineering",
    "Healthcare",
    "Trades",
    "Technology",
    "Finance",
    "Marketing",
    "Education",
    "Arts",
    "Science",
    "Law",
    "Media",
    "Sports",
    "Design",
  ];

  const availableExtracurricularOptions = [
    "Business",
    "Engineering",
    "Healthcare",
    "Trades",
    "Sports",
    "Music",
    "Drama",
    "Debate",
    "Volunteering",
    "Photography",
    "Writing",
    "Dance",
    "Art",
    "Coding",
  ];

  const interestColors = {
    Business: "bg-orange-100 text-orange-600 border-orange-200",
    Engineering: "bg-green-100 text-green-600 border-green-200",
    Healthcare: "bg-purple-100 text-purple-600 border-purple-200",
    Trades: "bg-pink-100 text-pink-600 border-pink-200",
    Technology: "bg-blue-100 text-blue-600 border-blue-200",
    Finance: "bg-yellow-100 text-yellow-600 border-yellow-200",
    Marketing: "bg-red-100 text-red-600 border-red-200",
    Education: "bg-indigo-100 text-indigo-600 border-indigo-200",
    Arts: "bg-purple-100 text-purple-600 border-purple-200",
    Science: "bg-teal-100 text-teal-600 border-teal-200",
    Law: "bg-gray-100 text-gray-600 border-gray-200",
    Media: "bg-cyan-100 text-cyan-600 border-cyan-200",
    Sports: "bg-green-100 text-green-600 border-green-200",
    Design: "bg-pink-100 text-pink-600 border-pink-200",
    Music: "bg-purple-100 text-purple-600 border-purple-200",
    Drama: "bg-red-100 text-red-600 border-red-200",
    Debate: "bg-blue-100 text-blue-600 border-blue-200",
    Volunteering: "bg-green-100 text-green-600 border-green-200",
    Photography: "bg-yellow-100 text-yellow-600 border-yellow-200",
    Writing: "bg-indigo-100 text-indigo-600 border-indigo-200",
    Dance: "bg-pink-100 text-pink-600 border-pink-200",
    Art: "bg-purple-100 text-purple-600 border-purple-200",
    Coding: "bg-blue-100 text-blue-600 border-blue-200",
  };

  const addCareerInterest = (interest) => {
    if (!careerInterests.includes(interest)) {
      setCareerInterests([...careerInterests, interest]);
    }
    setShowCareerOptions(false);
  };

  const removeCareerInterest = (interest) => {
    setCareerInterests(careerInterests.filter((item) => item !== interest));
  };

  const addExtracurricularActivity = (activity) => {
    if (!extracurricularActivities.includes(activity)) {
      setExtracurricularActivities([...extracurricularActivities, activity]);
    }
    setShowExtracurricularOptions(false);
  };

  const removeExtracurricularActivity = (activity) => {
    setExtracurricularActivities(
      extracurricularActivities.filter((item) => item !== activity)
    );
  };

  const handleSave = () => {
    console.log("Saving interests:", {
      careerInterests,
      extracurricularActivities,
    });
    alert("Interests saved successfully!");
  };

  return (
    <div className="">
      <div className="">
        <div className=" rounded-lg p-6 max-w-3xl">
          {/* Career Interests Section */}
          <div className="mb-8">
            <h2 className="text-[20px] font-semibold text-gray-900 mb-4">
              Career Interests
            </h2>

            {/* Interest Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {careerInterests.map((interest) => (
                <div
                  key={interest}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
                    interestColors[interest] ||
                    "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {interest}
                  <button
                    onClick={() => removeCareerInterest(interest)}
                    className="hover:bg-black hover:bg-opacity-10 rounded-full p-0.5"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Add Button and Options */}
            <div className="relative">
              <button
                onClick={() => setShowCareerOptions(!showCareerOptions)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add
              </button>

              {showCareerOptions && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 min-w-64">
                  <div className="grid grid-cols-2 gap-1">
                    {availableCareerOptions
                      .filter((option) => !careerInterests.includes(option))
                      .map((option) => (
                        <button
                          key={option}
                          onClick={() => addCareerInterest(option)}
                          className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          {option}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Extracurricular Activities Section */}
          <div className="mb-8">
            <h2 className="text-[20px] font-semibold text-gray-900 mb-4">
              Extracurricular Activities
            </h2>

            {/* Activity Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {extracurricularActivities.map((activity) => (
                <div
                  key={activity}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${
                    interestColors[activity] ||
                    "bg-gray-100 text-gray-600 border-gray-200"
                  }`}
                >
                  {activity}
                  <button
                    onClick={() => removeExtracurricularActivity(activity)}
                    className="hover:bg-black hover:bg-opacity-10 rounded-full p-0.5"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Add Button and Options */}
            <div className="relative">
              <button
                onClick={() =>
                  setShowExtracurricularOptions(!showExtracurricularOptions)
                }
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add
              </button>

              {showExtracurricularOptions && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 min-w-64">
                  <div className="grid grid-cols-2 gap-1">
                    {availableExtracurricularOptions
                      .filter(
                        (option) => !extracurricularActivities.includes(option)
                      )
                      .map((option) => (
                        <button
                          key={option}
                          onClick={() => addExtracurricularActivity(option)}
                          className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          {option}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-[#3565FC] hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardInterest;
