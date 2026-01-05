import { IoChevronBack, IoCheckmark } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SimulationMCQ from "./SimulationMCQ";
import { useShowSimulationCategoryQuestionQuery } from "../../../redux/features/baseApi";

function SimulationQuestion() {
  const { id } = useParams(); 
  const taskId = localStorage.getItem("SimulationCategory");
  
  const { data: questionData, isLoading } = useShowSimulationCategoryQuestionQuery({
    taskId,
    categoryId: id
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Convert teacher_sim_levels object to array
  const levels = questionData?.teacher_sim_levels 
    ? Object.entries(questionData.teacher_sim_levels).map(([level, data]) => ({
        id: parseInt(level),
        ...data
      }))
    : [];

  const handleCardClick = (level) => {
    setSelectedLevel(level);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedLevel(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="mb-6">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="w-[340px] h-[220px] bg-gray-200 animate-pulse rounded-xl mb-14" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-32 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
          <span className="text-[24px] font-medium">
            {questionData?.category_name}
          </span>
        </button>
      </div>

      {/* Category Card */}
      <div className="mb-14 w-fit">
        <div className="relative w-[340px] h-[220px] rounded-xl overflow-hidden group cursor-pointer">
          <img
            src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1751196563/b170870007dfa419295d949814474ab2_t_qm2pcq.jpg"
            alt={questionData?.category_name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-3 right-3">
            <h3 className="text-white font-semibold text-[24px]">
              {questionData?.category_name}
            </h3>
            <p className="text-white/90 text-[14px] mb-1">
              Level 1 to {levels.length}
            </p>
            <div className="absolute -bottom-2 left-0 right-0 h-[8px] bg-white rounded-full">
              <div
                className="h-full bg-blue-500 rounded-xl"
                style={{
                  width: `${
                    (levels.filter((l) => l.completed).length / levels.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {levels.map((level) => (
  <div
    key={level.id}
    className="bg-[#F5F5F5] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
    onClick={() => handleCardClick(level.id)}
  >
    <div className="flex flex-col items-center justify-center min-h-[140px]">
      {level.is_completed ? (
        <>
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mb-2">
            <IoCheckmark className="w-6 h-6 text-white" />
          </div>
          <p className="text-[24px] font-medium text-gray-700 mb-2">
            Completed
          </p>
        </>
      ) : (
        <p className="text-2xl font-semibold text-gray-800 mb-4">
          {level.id}
        </p>
      )}

      {/* Stars display */}
      <div className="flex gap-0.5">
        {[...Array(3)].map((_, i) => {
          // Completed → show real stars
          // Not completed + stars > 0 → show real stars (rare case in your current data)
          // Not completed + stars === 0 → show gray stars
          const isActiveStar =
            level.is_completed ||
            (level.stars > 0 && i < level.stars);

          return (
            <FaStar
              key={i}
              className={`w-5 h-5 ${
                isActiveStar
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300 fill-current"
              }`}
            />
          );
        })}
      </div>

      {/* Optional: show progress if some questions answered but not completed */}
      {!level.is_completed && level.questions_answered > 0 && (
        <p className="text-xs text-gray-600 mt-3">
          {level.questions_answered} answered
        </p>
      )}
    </div>
  </div>
))}
      </div>

      {/* Popup with SimulationMCQ */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <SimulationMCQ
            isOpen={isPopupOpen}
            onClose={closePopup}
            selectedLevel={selectedLevel}
            categoryId={id}
            taskId={taskId}
          />
        </div>
      )}
    </div>
  );
}

export default SimulationQuestion;