"use client";
import { IoChevronBack } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function SimulationTaskDetails() {
  const categoryData = {
    title: "Business",
    progress: 10,
    heroImage:
      "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/what-type-of-learner-is-your-child-min-scaled_mkm8a1.jpg",
    subcategories: [
      {
        id: 1,
        name: "Accounting",
        image:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/1_2LywpPsQnnuRwQpDVrydAQ_cfd3ev.jpg",
        progress: 25,
      },
      {
        id: 2,
        name: "Marketing",
        image:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/1_yjcdof.jpg",
        progress: 0,
      },
      {
        id: 3,
        name: "Economics",
        image:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/day-picture-id1163588010_xjbdnc.jpg",
        progress: 0,
      },
      {
        id: 4,
        name: "Supply Chain",
        image:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/shutterstock_1847661151.jpg.optimal_jdopzy.jpg",
        progress: 0,
      },
      {
        id: 5,
        name: "Finance",
        image:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1760418336/067134af3ee4b96f623780d3c14577fca6342796_yzsy4q.jpg",
        progress: 0,
      },
      {
        id: 6,
        name: "Risk Compliance",
        image:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1760418336/6829c41bbaf9b7c592c7c376b701b859afc0bdd4_x6g8we.jpg",
        progress: 0,
      },
      {
        id: 7,
        name: "Entrepreneurship",
        image:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1760418336/b075a41637a05c9217374a2e411f8a04d536e2da_x1m4np.jpg",
        progress: 0,
      },
      {
        id: 8,
        name: "Financial Services",
        image:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/lifelong-learning-success_vlpiej.webp",
        progress: 0,
      },
    ],
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <IoChevronBack className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">
          {categoryData.title}
        </h1>
      </div>

      {/* Hero Card */}
      <div className="mb-8">
        <div className="relative w-[50vh] h-56 rounded-2xl overflow-hidden group cursor-pointer">
          <img
            src={categoryData.heroImage || "/placeholder.svg"}
            alt={categoryData.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t bg-black/40 via-black/20 to-transparent" />

          {/* Progress Circle */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90 ">
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Progress Circle */}
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  stroke="#3B82F6"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 30}`}
                  strokeDashoffset={`${
                    2 *
                    Math.PI *
                    30 *
                    (1 - Math.min(categoryData.progress, 100) / 100)
                  }`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-in-out shadow-lg"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-base font-semibold font-sans">
                  {Math.min(categoryData.progress, 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Category Label */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <h2 className="text-white text-xl font-semibold">
              {categoryData.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryData.subcategories.map((subcategory) => (
            <NavLink
              to={`/dashboard/simulationQuestion/${subcategory.id}`}
              key={subcategory.id}
            >
              <div
                key={subcategory.id}
                className="relative h-46 rounded-xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={subcategory.image || "/placeholder.svg"}
                  alt={subcategory.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Category Name */}
                <div className="absolute bottom-12 left-5 right-3">
                  <h3 className="text-white text-[24px] font-semibold">
                    {subcategory.name}
                  </h3>
                </div>

                <div className="absolute bottom-7 pr-2 left-5 right-3 flex justify-between text-xs text-white opacity-90">
                  <div>Level:3/10</div>
                  <div>48%</div>
                </div>

                {/* Progress Bar (only if progress > 0) */}
                {subcategory.progress > 0 && (
                  <div className="absolute bottom-3 left-0 right-0 h-[8px] bg-white rounded-full mx-5">
                    <div
                      className="h-full bg-blue-500 transition-all rounded-xl duration-300"
                      style={{ width: `${subcategory.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SimulationTaskDetails;
