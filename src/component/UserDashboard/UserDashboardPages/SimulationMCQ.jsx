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
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submissionResult, setSubmissionResult] = useState(null);

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
  
  // Check if this is a review mode (has correct_option) or quiz mode (no correct_option)
  const isReviewMode = questions.length > 0 && questions[0]?.correct_option !== undefined;

  useEffect(() => {
    if (isOpen) {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuizCompleted(false);
      setCompletedQuestions(0);
      setAnswers([]);
      setSubmissionResult(null);
    }
  }, [isOpen]);

  // Auto-advance in quiz mode only
  useEffect(() => {
    if (showResult && !quizCompleted && !isReviewMode) {
      const timer = setTimeout(() => {
        setCompletedQuestions((prev) => prev + 1);

        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          handleFinalSubmit();
        }
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showResult, currentQuestion, quizCompleted, questions.length, isReviewMode]);

  const handleAnswerSelect = (option) => {
    if (!showResult && !isReviewMode) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const currentQ = questions[currentQuestion];
      
      setAnswers((prev) => [
        ...prev,
        {
          question_id: currentQ.id,
          selected_option: selectedAnswer,
        },
      ]);

      setShowResult(true);
    }
  };

  const handleFinalSubmit = async () => {
    try {
      const allAnswers = [...answers, {
        question_id: questions[currentQuestion].id,
        selected_option: selectedAnswer,
      }];

      const response = await submitMCQ({
        taskId,
        categoryId,
        simLevel: selectedLevel,
        answers: allAnswers,
      }).unwrap();

      setSubmissionResult(response);
      setQuizCompleted(true);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Last question in review mode, just close
      onClose();
    }
  };

  const handleComplete = () => {
    onClose();
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

  // Quiz Completion Screen (only for quiz mode)
  if (quizCompleted && submissionResult && !isReviewMode) {
    return (
      <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Quiz Completed!
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Your Score
              </h3>
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {submissionResult.correct_answers} / {submissionResult.total_answers}
              </p>
              <p className="text-gray-600">
                {Math.round((submissionResult.correct_answers / submissionResult.total_answers) * 100)}% Correct
              </p>
            </div>

            <div className="text-center">
              <p className="text-gray-700">
                {submissionResult.message}
              </p>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleComplete}
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

  // Check if current answer is correct (only in quiz mode after submission)
  const isCurrentAnswerCorrect = !isReviewMode && showResult && selectedAnswer === currentQ.correct_option;

  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-[2px] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {isReviewMode ? "Review " : ""}Question {currentQuestion + 1} of {questions.length}
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
                    isReviewMode
                      ? index <= currentQuestion ? "bg-blue-600" : "bg-gray-200"
                      : index < completedQuestions
                      ? "bg-gray-900"
                      : index === currentQuestion && showResult
                      ? "bg-gray-900"
                      : "bg-gray-200"
                  }`}
                  style={{
                    width:
                      isReviewMode
                        ? index <= currentQuestion ? "100%" : "0%"
                        : index < completedQuestions
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
                const isCorrectOption = option.label === currentQ.correct_option;
                
                // In review mode, always show correct answer in green
                const showAsCorrect = isReviewMode ? isCorrectOption : (showResult && isCorrectOption);
                
                // In quiz mode, show wrong answer in red
                const showAsWrong = !isReviewMode && showResult && isSelected && !isCurrentAnswerCorrect;

                return (
                  <label
                    key={option.label}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
                      isReviewMode 
                        ? showAsCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                        : showAsWrong
                        ? "border-red-500 bg-red-50"
                        : showAsCorrect
                        ? "border-green-500 bg-green-50"
                        : isSelected
                        ? "border-blue-500 bg-blue-50 cursor-pointer"
                        : "border-gray-200 hover:border-gray-300 cursor-pointer"
                    }`}
                    onClick={() => handleAnswerSelect(option.label)}
                  >
                    {!isReviewMode && (
                      <input
                        type="radio"
                        name="answer"
                        checked={isSelected}
                        onChange={() => handleAnswerSelect(option.label)}
                        className="mt-1 w-4 h-4 text-blue-600"
                        disabled={showResult}
                      />
                    )}
                    <span
                      className={`flex-1 ${
                        showAsWrong
                          ? "text-red-600"
                          : showAsCorrect
                          ? "text-green-700 font-medium"
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

          {/* Explanation - Show in review mode or after submission in quiz mode */}
          {((isReviewMode || showResult) && currentQ.explanation) && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <IoCheckmarkCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-green-700 mb-1">
                    Correct Answer: {currentQ.correct_option}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          {isReviewMode ? (
            // Review mode - Only Next button
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {currentQuestion < questions.length - 1 ? "Next" : "Close"}
            </button>
          ) : (
            // Quiz mode - Submit or Auto-advancing
            showResult ? (
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
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default SimulationMCQ;