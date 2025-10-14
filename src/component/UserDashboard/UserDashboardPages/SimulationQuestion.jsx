import { IoChevronBack, IoCheckmark } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

function SimulationQuestion() {
  // Generate questions 1-10
  const questions = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    isCompleted: i === 0, // First question is completed
    title: "Teacher Sim",
  }));

  return (
    <div className="min-h-screen  p-6">
      {/* Header */}
      <div className="mb-6">
        <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
          <IoChevronBack className="w-5 h-5" />
          <span className="text-lg font-medium">Accounting</span>
        </button>
      </div>

      {/* Category Card */}
      <div className="mb-8 w-fit">
        <div className="relative w-[340px] h-[220px] rounded-xl overflow-hidden group cursor-pointer">
          <img
            src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/day-picture-id1163588010_xjbdnc.jpg"
            alt="Accounting"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-3 right-3">
            <h3 className="text-white font-semibold text-[24px]">Accounting</h3>
            <p className="text-white/90 text-[14px] mb-1">Level 1 to 10</p>
            <div className="absolute bottom- left-0 right-0 h-[8px] bg-white rounded-full ">
              <div
                className="h-full bg-blue-500 rounded-xl"
                style={{ width: "60%" }} // 👉 এখানে fixed width দিচ্ছি
              />
            </div>
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-[#F5F5F5] rounded-lg  p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            {question.isCompleted ? (
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                  <IoCheckmark className="w-6 h-6 text-white" />
                </div>
                <p className="text-[24px] font-medium text-gray-700 mb-2">
                  Completed
                </p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="w-3.5 h-3.5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p className="text-[30px]  mb-1">{question.title}</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {question.id}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimulationQuestion;
