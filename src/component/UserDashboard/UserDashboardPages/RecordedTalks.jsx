import React from "react";

function RecordedTalks({ selectedCategory }) {
  const talks = [
    {
      id: 1,
      category: "Engineering",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/shutterstock_1847661151.jpg.optimal_jdopzy.jpg",
      duration: "2 hours",
      author: "Ahmad Nur Fawaid",
      timestamp: "12 April at 09:28 PM",
      badge: "Academic",
      title: "Breaking Into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company,",
    },
    {
      id: 2,
      category: "Business",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/images_mj5hiu.jpg",
      duration: "2 hours",
      author: "Ahmad Nur Fawaid",
      timestamp: "12 April at 09:28 PM",
      badge: "Academic",
      title: "Breaking Into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company,",
    },
    {
      id: 3,
      category: "Science/Research",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/day-picture-id1163588010_xjbdnc.jpg",
      duration: "2 hours",
      author: "Ahmad Nur Fawaid",
      timestamp: "12 April at 09:28 PM",
      badge: "Academic",
      title: "Breaking Into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company,",
    },
  ];

  const filteredTalks =
    selectedCategory === "All categories"
      ? talks
      : talks.filter((talk) => talk.category === selectedCategory);

  if (filteredTalks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No talks available
        </h3>
        <p className="text-gray-600">
          There are no recorded talks in "{selectedCategory}" category at the
          moment. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTalks.map((talk) => (
        <div
          key={talk.id}
          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-3"
        >
          {/* Thumbnail */}
          <div className="relative aspect-video bg-gray-900 rounded-md">
            <img
              src={talk.thumbnail || "/placeholder.svg"}
              alt={talk.title}
              className="w-full h-full object-cover rounded-md"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-90">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 4l10 6-10 6V4z" />
                </svg>
              </div>
            </div>
            {/* Duration Badge */}
            <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeWidth="2" d="M12 6v6l4 2" />
              </svg>
              <span className="text-sm text-gray-700 font-medium">
                {talk.duration}
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="py-4">
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt={talk.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {talk.author}
                  </span>
                  <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full font-medium">
                    {talk.badge}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{talk.timestamp}</span>
              </div>
            </div>

            {/* Title and Description */}
            <h3 className="text-[20px] font-bold text-gray-900 mb-2 leading-tight">
              {talk.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {talk.description}
            </p>
          </div>
          <button className="w-full bg-[#1F43F1] text-white font-semibold py-[4px] rounded-md cursor-pointer">
            play
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecordedTalks;
