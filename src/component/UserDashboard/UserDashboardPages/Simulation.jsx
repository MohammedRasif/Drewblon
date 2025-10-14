import { FaStar, FaClock } from "react-icons/fa";
import SimulationTask from "./SimulationTask";

function Simulation() {
  const completedSimulations = [
    {
      id: 1,
      author: {
        name: "Ahmad Nur Fawaid",
        avatar:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/what-type-of-learner-is-your-child-min-scaled_mkm8a1.jpg",
        rating: 4.7,
        reviews: 94,
      },
      badge: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/cover_yrth1n.jpg",
      title: "Breaking Into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company.",
      completedDate: "12/7/2025",
    },
    {
      id: 2,
      author: {
        name: "Ahmad Nur Fawaid",
        avatar:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg",
        rating: 4.7,
        reviews: 94,
      },
      badge: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/shutterstock_1847661151.jpg.optimal_jdopzy.jpg",
      title: "Breaking Into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company.",
      completedDate: "12/7/2025",
    },
    {
      id: 3,
      author: {
        name: "Ahmad Nur Fawaid",
        avatar:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg",
        rating: 4.7,
        reviews: 94,
      },
      badge: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/day-picture-id1163588010_xjbdnc.jpg",
      title: "Breaking Into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company.",
      completedDate: "12/7/2025",
    },
  ];

  const inProgressSimulations = [
    {
      id: 1,
      author: {
        name: "Ahmad Nur Fawaid",
        avatar:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/upscale-face-1.jpg",
        rating: 4.7,
        reviews: 94,
      },
      badge: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822516/images_2_gsamts.jpg",
      title: "Breaking Into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company.",
      progress: 65,
      timeLeft: "2 days left",
    },
    {
      id: 2,
      author: {
        name: "Ahmad Nur Fawaid",
        avatar:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
        rating: 4.7,
        reviews: 94,
      },
      badge: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/1_2LywpPsQnnuRwQpDVrydAQ_cfd3ev.jpg",
      title: "Breaking Into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company.",
      progress: 45,
      timeLeft: "5 days left",
    },
    {
      id: 3,
      author: {
        name: "Ahmad Nur Fawaid",
        avatar:
          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/look-up.jpg",
        rating: 4.7,
        reviews: 94,
      },
      badge: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/better-learner-cover_zfyxqo.jpg",
      title: "Breaking Into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company.",
      progress: 80,
      timeLeft: "1 day left",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <SimulationTask />
      {/* Completed Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Completed</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            See all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedSimulations.map((sim) => (
            <div
              key={sim.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Author Info */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={sim.author.avatar || "/placeholder.svg"}
                    alt={sim.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {sim.author.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <FaStar className="text-yellow-400 w-3 h-3" />
                      <span>{sim.author.rating}</span>
                      <span className="text-gray-400">
                        ({sim.author.reviews})
                      </span>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  {sim.badge}
                </span>
              </div>

              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={sim.thumbnail || "/placeholder.svg"}
                  alt={sim.title}
                  className="w-full h-48 px-4.5   object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  {sim.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {sim.description}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  <span className="bg-gray-50 text-[#00A63E] font-semibold py-[1px] px-[5px] rounded-full">
                    Complete
                  </span>
                  on {sim.completedDate}
                </p>

                {/* Review Button */}
                <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In Progress Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">In Progress</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            See all
          </button> 
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inProgressSimulations.map((sim) => (
            <div
              key={sim.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Author Info */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={sim.author.avatar || "/placeholder.svg"}
                    alt={sim.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {sim.author.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <FaStar className="text-yellow-400 w-3 h-3" />
                      <span>{sim.author.rating}</span>
                      <span className="text-gray-400">
                        ({sim.author.reviews})
                      </span>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  {sim.badge}
                </span>
              </div>

              {/* Thumbnail with Time Badge */}
              <div className="relative">
                <img
                  src={sim.thumbnail || "/placeholder.svg"}
                  alt={sim.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-md">
                  {sim.timeLeft}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  {sim.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {sim.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#8EC5FF] h-2 rounded-full transition-all"
                      style={{ width: `${sim.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Continue Button */}
                <button className="w-full py-2 px-4 bg-[#3565FC] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  <FaClock className="w-4 h-4" />
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Simulation;
