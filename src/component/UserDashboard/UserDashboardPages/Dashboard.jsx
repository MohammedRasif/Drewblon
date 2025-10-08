import { FaVideo } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  // Sample data matching the image
  const overviewStats = [
    {
      label: "Learning time",
      value: "20 h",
      bgColor: "bg-[#F0F9FF]",
      iconColor: "text-blue-600",
      icon: "📚",
    },
    {
      label: "Complete video",
      value: "25",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      icon: "▶️",
    },
    {
      label: "Total point",
      value: "1215",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      icon: "🎯",
    },
    {
      label: "Rank",
      value: "299",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      icon: "🏆",
    },
  ];

  const careerInterests = [
    { name: "Business", color: "bg-green-100 text-green-700" },
    { name: "Engineering", color: "bg-purple-100 text-purple-700" },
    { name: "Healthcare", color: "bg-pink-100 text-pink-700" },
    { name: "Trades", color: "bg-pink-100 text-pink-700" },
  ];

  const extracurricularActivities = [
    { name: "Business", color: "bg-orange-100 text-orange-700" },
    { name: "Engineering", color: "bg-green-100 text-green-700" },
  ];

  const leaderboardData = [
    {
      rank: 1,
      name: "Ronald Jones",
      avatar:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/bike.jpg",
      score: "USA",
      learningTime: "82 Hours",
      completedVideo: "105 videos",
      totalPoint: "1215",
    },
    {
      rank: 2,
      name: "Sarah Wilson",
      avatar:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg",
      score: "Canada",
      learningTime: "75 Hours",
      completedVideo: "98 videos",
      totalPoint: "1180",
    },
    {
      rank: 3,
      name: "Emma Davis",
      avatar:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
      score: "Australia",
      learningTime: "65 Hours",
      completedVideo: "88 videos",
      totalPoint: "1120",
    },
  ];

  return (
    <div className=" pr-5 pb-8">
      <div className="container mx-auto space-y-6">
        {/* Overview Section */}
        <div className=" rounded-lg  ">
          <h2 className="text-[24px] font-bold text-gray-800 mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {overviewStats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} rounded-3xl p-4 pl-10 flex items-center space-x-3 `}
              >
                <div>
                  <div className="flex items-center space-x-3">
                    <div className={`${stat.iconColor}`}>
                      <span className="text-3xl flex items-center justify-center">
                        {stat.icon}
                      </span>
                    </div>
                    <p className="text-[20px] font-bold text-gray-800">
                      {stat.label}
                    </p>
                  </div>
                  <p className="text-[32px] font-bold text-gray-900 pl-2">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Information Section */}
        <h2 className="text-[24px] font-bold text-gray-800 mb-4">
          Profile Information
        </h2>
        <div className=" p-6 bg-white rounded-3xl border border-gray-200">
          <div className="flex  justify-between mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/landscapes/girl-urban-view.jpg"
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="font-bold text-gray-900 text-[20px]">Jhon</h3>
                <p className="text-[16px] text-gray-500">vn@gmail.com</p>
              </div>
            </div>
            {/* <NavLink to="">
              <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </NavLink> */}
          </div>

          <div className="space-y-4">
            <div>
              <p className=" font-medium text-gray-700 mb-1">School</p>
              <p className=" text-gray-900 font-semibold">
                Lincoln Elementary School - Chicago, IL
              </p>
            </div>

            <div>
              <p className=" font-medium text-gray-700 mb-2">
                Career Interests
              </p>
              <div className="flex flex-wrap gap-5">
                {careerInterests.map((interest, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-md font-medium ${interest.color}`}
                  >
                    {interest.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className=" font-medium text-gray-700 mb-2">
                Extracurricular Activities
              </p>
              <div className="flex flex-wrap gap-5">
                {extracurricularActivities.map((activity, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-md font-medium ${activity.color}`}
                  >
                    {activity.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leader board Section */}
        <div className="">
          <h2 className="text-[20px] font-bold text-gray-900 mb-6">
            Leader board
          </h2>

          {/* Top 3 Leaders */}
          {/* Top 3 Leaders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {leaderboardData.slice(0, 3).map((leader, index) => (
              <div
                key={leader.name}
                className="bg-white rounded-3xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="relative inline-block mb-3">
                  <img
                    src={leader.avatar || "/diverse-person-portrait.png"}
                    alt={leader.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-500 ">
                    <span className="text-sm font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 text-[20px]">
                  {leader.name}
                </h4>
                <p className="text-[14px] text-gray-500 mb-1">
                  {leader.completedVideo} Completed
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[16px] text-gray-600">Learning time</p>
                  <p className="text-[20px] font-bold text-gray-800">
                    {leader.learningTime}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard Table */}
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full ">
              <thead className="bg-[#E5E5E5]">
                <tr className="rounded-full">
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700">
                    #
                  </th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700">
                    Names
                  </th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700">
                    Score
                  </th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700">
                    Learning Time
                  </th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700">
                    Completed video
                  </th>
                  <th className="text-left py-3 px-4 text-[14px] font-medium text-gray-700">
                    Total point
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((row, index) => (
                  <tr key={index} className="bg-white ">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {row.rank}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={row.avatar || "/placeholder.svg"}
                          alt={row.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {row.score}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MdAccessTimeFilled />

                        <span>{row.learningTime}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <FaVideo />

                        <span>{row.completedVideo}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span>{row.totalPoint}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
