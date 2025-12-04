"use client";

import { useState, useEffect } from "react";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";
import {
  useShowSimulationCategoryAllQuestionQuery,
  useSimulationQuestionSubmitMutation,
} from "../../../redux/features/baseApi";

function SimulationMCQ({ isOpen, onClose, selectedLevel, categoryId, taskId }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [answers, setAnswers] = useState([]);

  const { data: questionsData, isLoading } = useShowSimulationCategoryAllQuestionQuery(
    {
      taskId,
      categoryId,
      simLevel: selectedLevel,
    },
    {
      skip: !isOpen || !taskId || !categoryId || !selectedLevel,
    }
  );

  const [submitMCQ, { isLoading: isSubmitting }] = useSimulationQuestionSubmitMutation();

  const questions = questionsData?.questions || [];

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
      setQuizCompleted(false);
      setCompletedQuestions(0);
      setAnswers([]);
    }
  }, [isOpen]);

  // Auto-advance to next question after 3 seconds
  useEffect(() => {
    if (showResult && !quizCompleted) {
      const timer = setTimeout(() => {
        setCompletedQuestions((prev) => prev + 1);

        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
          setIsCorrect(false);
        } else {
          // Submit all answers when quiz is complete
          handleFinalSubmit();
        }
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showResult, currentQuestion, quizCompleted, questions.length]);

  const handleAnswerSelect = (option) => {
    if (!showResult) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const currentQ = questions[currentQuestion];
      
      // Store the answer
      setAnswers((prev) => [
        ...prev,
        {
          question_id: currentQ.id,
          selected_option: selectedAnswer,
        },
      ]);

      // For demo purposes, we'll show if it's correct
      // In real scenario, you might not know until final submit
      setIsCorrect(true); // You can add logic to check if answer is correct
      setShowResult(true);
    }
  };

  const handleFinalSubmit = async () => {
    try {
      const response = await submitMCQ({
        taskId,
        categoryId,
        simLevel: selectedLevel,
        answers: [...answers, {
          question_id: questions[currentQuestion].id,
          selected_option: selectedAnswer,
        }],
      }).unwrap();

      // Show completion with results
      setQuizCompleted(true);
      
      // You can show a success message with response data
      console.log("Quiz completed:", response);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }
  };

  const handleComplete = () => {
    onClose();
    // Optionally refetch the questions to update the UI
    window.location.reload();
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
          <div className="text-center">
            <p className="text-gray-700 mb-4">No questions available for this level.</p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const options = [
    { label: "A", text: currentQ.option_a },
    { label: "B", text: currentQ.option_b },
    { label: "C", text: currentQ.option_c },
    { label: "D", text: currentQ.option_d },
  ];

  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 pt-4 space-y-2">
          {/* Progress Bar - Segmented */}
          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={`progress-${index}`}
                className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full transition-all duration-700 ease-out ${
                    index < completedQuestions
                      ? "bg-gray-900"
                      : index === currentQuestion && showResult
                      ? "bg-gray-900"
                      : "bg-gray-200"
                  }`}
                  style={{
                    width:
                      index < completedQuestions
                        ? "100%"
                        : index === currentQuestion && showResult
                        ? "100%"
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Question */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {currentQ.text}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {options.map((option) => {
                const isSelected = selectedAnswer === option.label;
                const showAsCorrect = showResult && isCorrect && isSelected;
                const showAsWrong = showResult && !isCorrect && isSelected;

                return (
                  <label
                    key={option.label}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      showAsWrong
                        ? "border-red-500 bg-red-50"
                        : showAsCorrect
                        ? "border-green-500 bg-green-50"
                        : isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleAnswerSelect(option.label)}
                  >
                    <input
                      type="radio"
                      name="answer"
                      checked={isSelected}
                      onChange={() => handleAnswerSelect(option.label)}
                      className="mt-1 w-4 h-4 text-blue-600"
                      disabled={showResult}
                    />
                    <span
                      className={`flex-1 ${
                        showAsWrong
                          ? "text-red-600"
                          : showAsCorrect
                          ? "text-green-700"
                          : "text-gray-700"
                      }`}
                    >
                      {option.text}
                    </span>
                    {showAsCorrect && (
                      <IoCheckmarkCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Success Message */}
          {showResult && isCorrect && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <IoCheckmarkCircle className="w-6 h-6 text-green-600" />
                <p className="font-semibold text-green-700">
                  Correct! Well done.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          {quizCompleted ? (
            <button
              onClick={handleComplete}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Complete Quiz
            </button>
          ) : showResult ? (
            <button
              disabled
              className="px-6 py-2.5 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
            >
              Next (Auto-advancing...)
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || isSubmitting}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                selectedAnswer !== null && !isSubmitting
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimulationMCQ;