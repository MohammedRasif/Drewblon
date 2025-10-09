import React from "react";

// Assuming you have images for the avatars (replace with correct paths)
import ryanHolmesAvatar from "../../image/rafiki.png";
import image from "../../image/Vector (5).png";

function Education() {
  // Define a reusable component for the testimonial card
  const TestimonialCard = ({ quote, name, title }) => (
    <div className="bg-white p-8 rounded-xl border border-gray-300 flex-1 min-w-0">
      {/* Quotation Mark Icon */}
      <div className="pb-10">
        <img src={image} alt="" />
      </div>

      {/* Quote Text */}
      <p className="text-[24px] text-gray-700 mb-8 font-medium text-start">
        {quote}
      </p>

      {/* Author Info */}
      <div className="flex items-center">
        {/* Avatar */}
        <img
          // Note: You must update the 'ryanHolmesAvatar' path to your actual image path
          src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/look-up.jpg"
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />

        {/* Name and Title */}
        <div>
          <p className="font-semibold text-[18px] text-gray-900">{name}</p>
          <p className="text-[14px] text-gray-500 text-start">{title}</p>
        </div>
      </div>
    </div>
  );

  return (
    // Outer container with light gray background and padding
    <div className=" py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-[48px] font-semibold text-gray-800 mb-3">
          What Students & Educators Say
        </h2>

        {/* Subheading */}
        <p className="text-[20px] text-gray-500 mb-12 md:mb-16">
          Real stories from early users
        </p>

        {/* Testimonial Cards Container */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Student Testimonial */}
          <TestimonialCard
            quote="Watching career talks and tracking my progress made learning fun for the first time. I feel more confident about my future now."
            name="Ryan Holmes"
            title="Student"
          />

          {/* Educator Testimonial */}
          <TestimonialCard
            quote="This platform saves me time and gives students real-world insights. The analytics help me guide them better."
            name="Ryan Holmes"
            title="Teacher"
          />
        </div>
      </div>
    </div>
  );
}

export default Education;
