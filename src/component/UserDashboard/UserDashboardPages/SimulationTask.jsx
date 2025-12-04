"use client";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useShowSimulationQuery } from "../../../redux/features/baseApi";

function SimulationTask() {
  const [showAll, setShowAll] = useState(false);
  const { data: simulation, isLoading } = useShowSimulationQuery();

  const displayedCategories = showAll 
    ? simulation 
    : simulation?.slice(0, 4);

  if (isLoading) {
    return (
      <div className="w-full pb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Simulation Task
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 rounded-xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Simulation Task
        </h2>
        {simulation && simulation.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            {showAll ? "See less" : "See all"}
          </button>
        )}
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedCategories?.map((category) => (
          <NavLink
            to={`/dashboard/simulation/${category.id}`}
            key={category.id}
          >
            <div className="relative h-48 rounded-xl overflow-hidden cursor-pointer group">
              {/* Background Image */}
              <img
                src={
                  category.cover_image ||
                  "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1751196563/b170870007dfa419295d949814474ab2_t_qm2pcq.jpg"
                }
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Category Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg">
                  {category.title}
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  {category.category_count} categories
                </p>
              </div>

              {/* Progress indicator if completed > 0 */}
              {category.completed > 0 && (
                <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
                  {Math.round(category.completed)}%
                </div>
              )}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SimulationTask;