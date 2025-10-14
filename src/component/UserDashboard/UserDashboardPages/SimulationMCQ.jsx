"use client";

import { useState, useEffect } from "react";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";

function SimulationMCQ({ isOpen, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(0);

  // Quiz questions data
  const questions = [
    {
      scenario:
        "You walk to the front of the classroom and can feel the different energies — a mix of excitement, curiosity, and chatter. A few students are clearly testing boundaries, while others are looking to you for direction. This is your first chance to set the tone for the year.",
      question: "What's the best move to begin class?",
      options: [
        "Greet students warmly and clearly introduce your class expectations",
        "Immediately call out the loudest student in front of everyone",
        "Start with no rules and 'see how things go'",
        "Wait in silence until the class quiets itself",
      ],
      correctAnswer: 0,
    },
    {
      scenario:
        "During a group activity, you notice one student is dominating the conversation while others remain silent. The group dynamic seems unbalanced and some students appear disengaged.",
      question: "How should you address this situation?",
      options: [
        "Ignore it and let the students work it out themselves",
        "Publicly call out the dominant student for talking too much",
        "Privately encourage quieter students to share their ideas",
        "Restructure the activity to ensure equal participation",
      ],
      correctAnswer: 3,
    },
    {
      scenario:
        "A student submits an assignment that is clearly below their usual standard. You suspect they may be dealing with personal issues but they haven't mentioned anything to you.",
      question: "What's the most appropriate response?",
      options: [
        "Give them the grade they earned without comment",
        "Announce to the class that late work won't be accepted",
        "Have a private conversation to check in on their wellbeing",
        "Immediately contact their parents about the poor work",
      ],
      correctAnswer: 2,
    },
  ];

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
      setQuizCompleted(false);
      setCompletedQuestions(0);
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
          setQuizCompleted(true);
        }
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showResult, currentQuestion, quizCompleted, questions.length]);

  const handleAnswerSelect = (index) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const correct =
        selectedAnswer === questions[currentQuestion].correctAnswer;
      setIsCorrect(correct);
      setShowResult(true);
    }
  };

  const handleComplete = () => {
    onClose();
  };

  if (!isOpen) return null;

  const currentQ = questions[currentQuestion];

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
          {/* Progress Bar 1 - Segmented */}
          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={`progress-1-${index}`}
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
          {/* Scenario */}
          <p className="text-gray-700 leading-relaxed">{currentQ.scenario}</p>

          {/* Question */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === currentQ.correctAnswer;
                const showAsWrong = showResult && isSelected && !isCorrect;
                const showAsCorrect = showResult && isCorrectAnswer;

                return (
                  <label
                    key={index}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      showAsWrong
                        ? "border-red-500 bg-red-50"
                        : showAsCorrect
                        ? "border-green-500 bg-green-50"
                        : isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <input
                      type="radio"
                      name="answer"
                      checked={isSelected}
                      onChange={() => handleAnswerSelect(index)}
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
                      {option}
                    </span>
                    {showAsCorrect && (
                      <IoCheckmarkCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Correct Answer Display */}
          {showResult && !isCorrect && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900 mb-2">
                Correct Answer:
              </p>
              <div className="flex items-start gap-2">
                <IoCheckmarkCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-green-700">
                  {currentQ.options[currentQ.correctAnswer]}
                </p>
              </div>
            </div>
          )}

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
              disabled={selectedAnswer === null}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                selectedAnswer !== null
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimulationMCQ;
