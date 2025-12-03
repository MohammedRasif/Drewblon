function AllSeeSimulation() {
  const courses = [
    {
      id: 1,
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1760418336/b075a41637a05c9217374a2e411f8a04d536e2da_x1m4np.jpg",
      author: "Ahmad Nur Fawaid",
      timeAgo: "47 m",
      category: "Academic",
      title: "Breaking into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company, including interview tips and career advice.",
      lesson: "3/6",
      progress: 46,
    },
    {
      id: 2,
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1760418336/067134af3ee4b96f623780d3c14577fca6342796_yzsy4q.jpg",
      author: "Ahmad Nur Fawaid",
      timeAgo: "22 Jun",
      category: "Academic",
      title: "Breaking into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company, including interview tips and career advice.",
      lesson: "3/6",
      progress: 46,
    },
    {
      id: 3,
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1760418336/d6108a299a1be19d19a2150aa953dc9a85a786e2_e8amqb.jpg",
      author: "Ahmad Nur Fawaid",
      timeAgo: "6 Y",
      category: "Academic",
      title: "Breaking into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company, including interview tips and career advice.",
      lesson: "3/6",
      progress: 46,
    },
    {
      id: 4,
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/lifelong-learning-success_vlpiej.webp",
      author: "Ahmad Nur Fawaid",
      timeAgo: "47 m",
      category: "Academic",
      title: "Breaking into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company, including interview tips and career advice.",
      lesson: "3/6",
      progress: 46,
    },
    {
      id: 5,
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/better-learner-cover_zfyxqo.jpg",
      author: "Ahmad Nur Fawaid",
      timeAgo: "22 Jun",
      category: "Academic",
      title: "Breaking into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company, including interview tips and career advice.",
      lesson: "3/8",
      progress: 46,
    },
    {
      id: 6,
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/1_2LywpPsQnnuRwQpDVrydAQ_cfd3ev.jpg",
      author: "Ahmad Nur Fawaid",
      timeAgo: "6 Y",
      category: "Academic",
      title: "Breaking into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company, including interview tips and career advice.",
      lesson: "3/6",
      progress: 46,
    },
  ];

  const categories = [
    "IT & Software",
    "Business",
    "Engineering",
    "Art Entertainment and culture",
    "Healthcare",
    "Trades",
    "Science/Research",
    "Information Tech",
    "Law/Legal",
    "Public Safety",
    "Exploration",
    "All Gvt Career Advice",
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header Stats */}
      <div className="container mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center  gap-20 bg-[#F0F9FF] px-4 py-2 rounded-2xl ">
              <div className="flex space-x-2">
                <div className="w-5.5 h-5.5 bg-blue-600 rounded flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-[14px] font-medium text-gray-700">
                  Learning time
                </span>
              </div>
              <span className="text-[28px] font-bold text-gray-900">2 h</span>
            </div>

            <div className="flex items-center  gap-20 bg-violet-100 px-4 py-2 rounded-2xl">
              <div className="flex space-x-2">
                <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Complete video
                </span>
              </div>
              <span className="text-[28px] font-bold text-gray-900">3</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
            <span className="text-sm font-medium text-gray-700">Today</span>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between  p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {course.author}
                    </div>
                    <div className="text-xs text-gray-500">
                      {course.timeAgo}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  {course.category}
                </span>
              </div>
              {/* Thumbnail */}
              <div className="relative px-4">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-6 bg-white px-2 py-1 rounded text-xs font-medium text-gray-700">
                  2 hours
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Author Info */}

                {/* Title */}
                <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {course.description}
                </p>

                {/* Progress */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    Lesson {course.lesson}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {course.progress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full bg-[#8EC5FF] rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                {/* Continue Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <span>Continue</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllSeeSimulation;
