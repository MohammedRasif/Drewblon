"use client";

import { useState } from "react";
import { NavLink } from "react-router-dom";

function SimulationTask() {
  const [showAll, setShowAll] = useState(false);

  const categories = [
    {
      id: 1,
      name: "Business",
      image:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1760418336/b075a41637a05c9217374a2e411f8a04d536e2da_x1m4np.jpg",
    },
    {
      id: 2,
      name: "Engineering",
      image:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/images_1_n963r1.jpg",
    },
    {
      id: 3,
      name: "HealthCare",
      image:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1760418336/d6108a299a1be19d19a2150aa953dc9a85a786e2_e8amqb.jpg",
    },
    {
      id: 4,
      name: "Trade",
      image:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1760418336/6829c41bbaf9b7c592c7c376b701b859afc0bdd4_x6g8we.jpg",
    },
    {
      id: 5,
      name: "Art Entertainment and culture",
      image:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/better-learner-cover_zfyxqo.jpg",
    },
    {
      id: 6,
      name: "Science/Research",
      image:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/1_2LywpPsQnnuRwQpDVrydAQ_cfd3ev.jpg",
    },
    {
      id: 7,
      name: "Informational Tech",
      image:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822516/images_2_gsamts.jpg",
    },
    {
      id: 8,
      name: "Law/Legal",
      image:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/day-picture-id1163588010_xjbdnc.jpg",
    },
  ];

  const displayedCategories = showAll ? categories : categories.slice(0, 4);

  return (
    <div className="w-full pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Simulation Task
        </h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          {showAll ? "See less" : "See all"}
        </button>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedCategories.map((category) => (
          <NavLink
            to={`/dashboard/simulation/${category.id}`}
            key={category.id}
          >
            <div
              key={category.id}
              className="relative h-48 rounded-xl overflow-hidden cursor-pointer group"
            >
              {/* Background Image */}
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Category Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg">
                  {category.name}
                </h3>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SimulationTask;
