import { FaVideo } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useShowProfileInformationQuery, useShowProfileLeaderBoradQuery, useShowProfileOverViewQuery } from "../../../redux/features/baseApi";

const Dashboard = () => {

  const {data: showProfileOverview} = useShowProfileOverViewQuery()
  console.log(showProfileOverview)
  const {data: showProfileInfromation} = useShowProfileInformationQuery()
  console.log(showProfileInfromation)
  const {data: shwoProfileLeaderBoard} = useShowProfileLeaderBoradQuery()
  console.log(shwoProfileLeaderBoard)

  const stats = showProfileOverview?.stats || {};
  const userInfo = showProfileInfromation?.user || {};
  const leaderboardRankings = shwoProfileLeaderBoard?.rankings || [];
  const currentUserRank = shwoProfileLeaderBoard?.current_user_rank || 0;

  const overviewStats = [
    {
      label: "Learning time",
      value: stats.learning_time || "0h 0m",
      bgColor: "bg-[#F0F9FF]",
      iconColor: "text-blue-600",
      icon: "📚",
    },
    {
      label: "Complete video",
      value: stats.completed_videos || 0,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      icon: "▶️",
    },
    {
      label: "Total point",
      value: stats.total_points || 0,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      icon: "🎯",
    },
    {
      label: "Rank",
      value: stats.rank || 0,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      icon: "🏆",
    },
  ];

  const baseUrl = "https://noncircuitous-lauryn-pseudosocialistic.ngrok-free.dev"
  const careerInterests = userInfo.career_interest || [];
  
  const extracurricularActivities = userInfo.extracurricular_activities || [];
  console.log({extracurricularActivities})

  const getTagColor = (index) => {
    const colors = [
      "bg-green-100 text-green-700",
      "bg-purple-100 text-purple-700",
      "bg-pink-100 text-pink-700",
      "bg-orange-100 text-orange-700",
      "bg-blue-100 text-blue-700",
    ];
    return colors[index % colors.length];
  };

  // Top 3 leaders from API
  const top3Leaders = leaderboardRankings.slice(0, 3);

  return (
    <div className=" pr-5 pb-8">
      <div className="container mx-auto space-y-6">
        {/* Overview Section */}
        <div className=" rounded-lg  ">
          <h2 className="text-[24px] font-bold text-gray-800 mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {overviewStats.map((stat, index) => (
              <div
                key={index.id}
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
                src={`${baseUrl}${userInfo.profile_picture}`}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-gray-900 text-[20px]">
                  {userInfo.name || "User"}
                </h3>
                <p className="text-[16px] text-gray-500">
                  {userInfo.email || "email@example.com"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className=" font-medium text-gray-700 mb-1">School</p>
              <p className=" text-gray-900 font-semibold">
                {userInfo.educational_institution?.name || "Not specified"} - {userInfo.state || "N/A"}
              </p>
            </div>

            <div>
              <p className=" font-medium text-gray-700 mb-1">Grade</p>
              <p className=" text-gray-900 font-semibold">
                {userInfo.grade || "Not specified"}
              </p>
            </div>

            <div>
              <p className=" font-medium text-gray-700 mb-1">Passing Year</p>
              <p className=" text-gray-900 font-semibold">
                {userInfo.passing_year || "Not specified"}
              </p>
            </div>

            {careerInterests.length > 0 && (
              <div>
                <p className=" font-medium text-gray-700 mb-2">
                  Career Interests
                </p>
                <div className="flex flex-wrap gap-5">
                  {careerInterests.map((interest, index) => (
                    <span
                      key={interest.id || index}
                      className={`px-3 py-1 rounded-full text-md font-medium ${getTagColor(index)}`}
                    >
                      {interest.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {extracurricularActivities.length > 0 && (
              <div>
                <p className=" font-medium text-gray-700 mb-2">
                  Extracurricular Activities
                </p>
                <div className="flex flex-wrap gap-5">
                  {extracurricularActivities.map((activity, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-md font-medium ${getTagColor(index)}`}
                    >
                      {activity.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Leader board Section */}
        <div className="">
          <h2 className="text-[20px] font-bold text-gray-900 mb-6">
            Leader board
          </h2>

          {/* Top 3 Leaders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {top3Leaders.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="relative inline-block mb-3">
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {leader.name?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-500 ">
                    <span className="text-sm font-bold text-white">
                      {leader.rank}
                    </span>
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 text-[20px]">
                  {leader.name || "Anonymous"}
                </h4>
                <p className="text-[14px] text-gray-500 mb-1">
                  {leader.completed_video} videos Completed
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[16px] text-gray-600">Learning time</p>
                  <p className="text-[20px] font-bold text-gray-800">
                    {leader.learning_time}
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
                {leaderboardRankings.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`bg-white ${row.rank === currentUserRank ? 'bg-blue-50' : ''}`}
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {row.rank}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {row.name?.charAt(0) || "?"}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {row.name || "Anonymous"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {row.state || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MdAccessTimeFilled />
                        <span>{row.learning_time}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <FaVideo />
                        <span>{row.completed_video} videos</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span>{row.total_point}</span>
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