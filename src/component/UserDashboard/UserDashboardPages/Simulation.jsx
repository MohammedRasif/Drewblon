import { FaStar, FaClock } from "react-icons/fa";
import SimulationTask from "./SimulationTask";
import { useNavigate } from "react-router-dom";
import {
  useShowCompetedQuery,
  useShowInProgressQuery,
} from "../../../redux/features/baseApi";
import { format } from "date-fns";
import { useState } from "react";

function Simulation() {
  const navigate = useNavigate();
  const { data: compete } = useShowCompetedQuery();
  const { data: progress } = useShowInProgressQuery();

  const completedSimulations = compete?.results || [];
  const inProgressSimulations = progress?.results || [];

  // State to track if "See all" is clicked for each section
  const [showAllCompleted, setShowAllCompleted] = useState(false);
  const [showAllInProgress, setShowAllInProgress] = useState(false);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MM/d/yyyy");
    } catch {
      return "N/A";
    }
  };

  const handleCardClick = (id) => {
    navigate(`/dashboard/details/${id}`);
  };

  // Show only first 3 unless "See all" is active
  const displayedCompleted = showAllCompleted
    ? completedSimulations
    : completedSimulations.slice(0, 3);

  const displayedInProgress = showAllInProgress
    ? inProgressSimulations
    : inProgressSimulations.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <SimulationTask />

      {/* Completed Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Completed</h2>
          {completedSimulations.length > 3 && (
            <button
              onClick={() => setShowAllCompleted(!showAllCompleted)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              {showAllCompleted ? "Show less" : "See all"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCompleted.length > 0 ? (
            displayedCompleted.map((sim) => (
              <div
                key={sim.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCardClick(sim.id)}
              >
                {/* Author Info */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-dashed border-gray-300" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {sim.category_name || "Unknown"}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <FaStar className="text-yellow-400 w-3 h-3" />
                        <span>4.7</span>
                        <span className="text-gray-400">(94)</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {sim.topic_name || "Academic"}
                  </span>
                </div>

                {/* Thumbnail */}
                <div className="relative">
                  <img
                    src={
                      sim.thumbnail?.startsWith("/media")
                        ? `https://your-backend-domain.com${sim.thumbnail}`
                        : sim.thumbnail || "/placeholder.svg"
                    }
                    alt={sim.title}
                    className="w-full h-48 object-cover px-4.5"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-2">
                    {sim.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {sim.playlist_name || "No description available"}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    <span className="bg-gray-50 text-[#00A63E] font-semibold py-[1px] px-[5px] rounded-full">
                      Complete
                    </span>{" "}
                    on {formatDate(sim.completed_at)}
                  </p>

                  <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Review
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No completed simulations yet.
            </p>
          )}
        </div>
      </div>

      {/* In Progress Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">In Progress</h2>
          {inProgressSimulations.length > 3 && (
            <button
              onClick={() => setShowAllInProgress(!showAllInProgress)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              {showAllInProgress ? "Show less" : "See all"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedInProgress.length > 0 ? (
            displayedInProgress.map((sim) => (
              <div
                key={sim.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCardClick(sim.id)}
              >
                {/* Author Info */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-dashed border-gray-300" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {sim.category_name || "Unknown"}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <FaStar className="text-yellow-400 w-3 h-3" />
                        <span>4.7</span>
                        <span className="text-gray-400">(94)</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {sim.topic_name || "Academic"}
                  </span>
                </div>

                {/* Thumbnail with Time Badge */}
                <div className="relative">
                  <img
                    src={
                      sim.thumbnail?.startsWith("/media")
                        ? `https://your-backend-domain.com${sim.thumbnail}`
                        : sim.thumbnail || "/placeholder.svg"
                    }
                    alt={sim.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-md">
                    {sim.remaining_time
                      ? `${Math.ceil(sim.remaining_time / 60)} min left`
                      : "Time left"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="text-base font-semibold text-gray-900 mb-2">
                    {sim.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {sim.playlist_name || "Continue your learning journey"}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#8EC5FF] h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(sim.watch_percentage || 0, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full py-2 px-4 bg-[#3565FC] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <FaClock className="w-4 h-4" />
                    Continue
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No simulations in progress.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Simulation;