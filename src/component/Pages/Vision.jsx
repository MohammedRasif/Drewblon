import React from "react";
// Assuming the path to your image is correct
import image from "../../image/image 1881.png";

function Vision() {
  return (
    // Outer container with light gray background and padding
    <div className="bg-gray-50 py-12 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      {/* Inner content container */}
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        
        {/* Left Content Area (Text) */}
        <div className="md:w-1/2 md:pr-12 lg:pr-20 mb-10 md:mb-0">
          
          {/* Mission Header */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-0.5 bg-gray-300"></div>
            <p className="text-sm font-medium text-gray-700 uppercase tracking-wider">
              Our Mission
            </p>
          </div>

          {/* Vision Title */}
          <h2 className="text-4xl md:text-5xl font-medium text-[#000000] leading-tight lg:pb-3">
            Our Vision for <br /> Students
          </h2>

          {/* Main Description */}
          <p className="text-base sm:text-lg text-gray-600 mb-8">
            We aim to bridge the gap between education and career readiness. By
            combining technology, expert insights, and counselor support, we help
            students unlock their potential and prepare for the future.
          </p>

          {/* List of Key Points */}
          <ul className="space-y-4">
            {[
              "Learning experiences tailored to each student's career interests.",
              "Resources available to all students, regardless of school or background.",
              "Real-world insights, simulations, and expert talks to build readiness.",
              "Direct updates and mentoring from counselors and teachers.",
            ].map((item, index) => (
              <li key={index} className="flex items-start text-gray-700 text-base">
                {/* Green Checkmark Icon (using inline SVG for simplicity/consistency) */}
                <svg
                  className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                {/* List Item Text */}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content Area (Image) */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={image}
            alt="Abstract graphic representing vision and technology"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
          />
        </div>

      </div>
    </div>
  );
}

export default Vision;