"use client";
import { useState } from "react";

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const monthlyPricing = {
    individual: 23,
    school: 23,
  };

  const yearlyPricing = {
    individual: 19, // 15% discount
    school: 19,
  };

  const currentPricing = isYearly ? yearlyPricing : monthlyPricing;

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
            Unlock your full potential
            <br />
            with complete access
          </h1>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`text-lg ${
                !isYearly ? "text-gray-900 font-medium" : "text-gray-500"
              }`}
            >
              Bill Monthly
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-purple-600 rounded-full transition-all duration-300 ease-in-out focus:outline-none"
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                  isYearly ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>

            <div className="flex items-center gap-2">
              <span
                className={`text-lg ${
                  isYearly ? "text-gray-900 font-medium" : "text-gray-500"
                }`}
              >
                Bill Annually
              </span>
              <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm font-medium">
                Save 15%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Individual Plan */}
          <div className="bg-blue-100 hover:bg-blue-200 rounded-2xl p-8 relative">
            <div className="mb-6">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  ${currentPricing.individual}
                </span>
                <span className="text-gray-600">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Individual Plan
              </h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-semibold">Everything in Starter</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-semibold">
                  Leaderboard + progress tracking
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-semibold">
                  Full access to podcasts & livestreams
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-semibold">
                  Advanced analytics for students
                </span>
              </div>
            </div>

            <button className="w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              Start Plan
            </button>
          </div>

          {/* School Plan */}
          <div className=" bg-blue-100 hover:bg-blue-200 rounded-2xl p-8 relative ">
            <div className="mb-6">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold">
                  ${currentPricing.school}
                </span>
                <span className="">/{isYearly ? "year" : "month"}</span>
              </div>
              <h3 className="text-xl font-semibold">School Plan</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-semibold">Everything in Individual</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-semibold">Post guidance counselor updates</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-semibold">Full access to podcasts & livestreams</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-semibold">Keep students informed in real time</span>
              </div>
            </div>

            <button className="w-full bg-white  font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              Start Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
