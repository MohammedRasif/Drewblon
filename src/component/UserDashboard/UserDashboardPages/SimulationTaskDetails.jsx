"use client";
import { IoChevronBack } from "react-icons/io5";
import { NavLink, useParams } from "react-router-dom";
import { useShowSimulationCategoryQuery } from "../../../redux/features/baseApi";
import { useEffect } from "react";

function SimulationTaskDetails() {
  const { id } = useParams();
  const { data: categoryData, isLoading } = useShowSimulationCategoryQuery(id);

  // Store task_id in localStorage when data is fetched
  useEffect(() => {
    if (categoryData?.task_id) {
      localStorage.setItem("SimulationCategory", categoryData.task_id);
    }
  }, [categoryData]);

  const handleBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <IoChevronBack className="w-5 h-5 text-gray-700" />
          </button>
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="w-[50vh] h-56 bg-gray-200 animate-pulse rounded-2xl mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

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
          {categoryData?.task_name}
        </h1>
      </div>

      {/* Hero Card */}
      <div className="mb-8">
        <div className="relative w-[50vh] h-56 rounded-2xl overflow-hidden group cursor-pointer">
          <img
            src={
              categoryData?.task_cover_image ||
              "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1751196563/b170870007dfa419295d949814474ab2_t_qm2pcq.jpg"
            }
            alt={categoryData?.task_name}
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
                    (1 - Math.min(categoryData?.completed || 0, 100) / 100)
                  }`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-in-out shadow-lg"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-base font-semibold font-sans">
                  {Math.round(categoryData?.completed || 0)}%
                </span>
              </div>
            </div>
          </div>

          {/* Category Label */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <h2 className="text-white text-xl font-semibold">
              {categoryData?.task_name}
            </h2>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryData?.categories?.map((subcategory) => (
            <NavLink
              to={`/dashboard/simulationQuestion/${subcategory.id}`}
              key={subcategory.id}
              onClick={() => {
                localStorage.setItem("task_id", categoryData.task_id);
              }}
            >
              <div className="relative h-46 rounded-xl overflow-hidden group cursor-pointer">
                <img
                  src={
                    subcategory.cover_image ||
                    "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1751196563/b170870007dfa419295d949814474ab2_t_qm2pcq.jpg"
                  }
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
                  <div>{subcategory.question_count} Questions</div>
                  <div>{Math.round(subcategory.completed)}%</div>
                </div>

                {/* Progress Bar (only if progress > 0) */}
                {subcategory.completed > 0 && (
                  <div className="absolute bottom-3 left-0 right-0 h-[8px] bg-white rounded-full mx-5">
                    <div
                      className="h-full bg-blue-500 transition-all rounded-xl duration-300"
                      style={{ width: `${subcategory.completed}%` }}
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