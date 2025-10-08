"use client";

import { useState } from "react";
import { Link } from "react-router-dom"; // Use react-router-dom's Link

function DashboardVideos() {
  const [activeCategory, setActiveCategory] = useState("All categories");

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

  const newVideos = [
    {
      id: 1,
      title: "Web & UI Design Using Figma",
      subtitle: "Beside Canggu at Web company",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/lifelong-learning-success_vlpiej.webp",
      participants: [
        {
          id: 1,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg",
        },
        {
          id: 2,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/upscale-face-1.jpg",
        },
        {
          id: 3,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg",
        },
      ],
      totalParticipants: 7,
    },
    {
      id: 2,
      title: "Web & UI Design Using Figma",
      subtitle: "Beside Canggu at Web company",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/life-long-learner_vekkdy.jpg",
      participants: [
        {
          id: 1,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
        },
        {
          id: 2,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529173/samples/two-ladies.jpg",
        },
        {
          id: 3,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529170/samples/people/bicycle.jpg",
        },
      ],
      totalParticipants: 7,
    },
    {
      id: 3,
      title: "Web & UI Design Using Figma",
      subtitle: "Beside Canggu at Web company",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/blog_V0otReuP_lnjvpf.jpg",
      participants: [
        {
          id: 1,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/landscapes/architecture-signs.jpg",
        },
        {
          id: 2,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/bike.jpg",
        },
        {
          id: 3,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/boy-snow-hoodie.jpg",
        },
      ],
      totalParticipants: 7,
    },
  ];

  const popularVideos = [
    {
      id: 4,
      title: "Web & UI Design Using Figma",
      subtitle: "Beside Canggu at Web company",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/1_yjcdof.jpg",
      participants: [
        {
          id: 1,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/jazz.jpg",
        },
        {
          id: 2,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/bike.jpg",
        },
        {
          id: 3,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
        },
      ],
      totalParticipants: 7,
    },
    {
      id: 5,
      title: "Web & UI Design Using Figma",
      subtitle: "Beside Canggu at Web company",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/better-learner-cover_zfyxqo.jpg",
      participants: [
        {
          id: 1,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/smiling-man.jpg",
        },
        {
          id: 2,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529168/samples/people/kitchen-bar.jpg",
        },
        {
          id: 3,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529168/samples/people/kitchen-bar.jpg",
        },
      ],
      totalParticipants: 7,
    },
    {
      id: 6,
      title: "Web & UI Design Using Figma",
      subtitle: "Beside Canggu at Web company",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/cover_yrth1n.jpg",
      participants: [
        {
          id: 1,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529167/samples/ecommerce/analog-classic.jpg",
        },
        {
          id: 2,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529168/samples/animals/reindeer.jpg",
        },
        {
          id: 3,
          avatar:
            "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/boy-snow-hoodie.jpg",
        },
      ],
      totalParticipants: 7,
    },
  ];

  return (
    <div className="bg-gray-50 pr-5 pb-10">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* New Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">New</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            See all
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newVideos.map((video) => (
            <Link
              to={`/dashboard/details/${video.id}`} // Use 'to' instead of 'href' for react-router-dom
              key={video.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{video.subtitle}</p>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {video.participants.map((participant) => (
                      <img
                        key={participant.id}
                        src={participant.avatar || "/placeholder.svg"}
                        alt="Participant"
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-gray-600">
                    + {video.totalParticipants} Participants
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Popular</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            See all
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularVideos.map((video) => (
            <Link
              to={`/dashboard/details/${video.id}`} // Use 'to' instead of 'href' for react-router-dom
              key={video.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{video.subtitle}</p>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {video.participants.map((participant) => (
                      <img
                        key={participant.id}
                        src={participant.avatar || "/placeholder.svg"}
                        alt="Participant"
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-gray-600">
                    + {video.totalParticipants} Participants
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardVideos;