import React from 'react';
import image from "../../image/Frame 1707483197.png"
function Discover() {
  return (
    
    <div className="   relative overflow-hidden">
      <img src={image} className='w-full  absolute' alt="" />



      {/* Main Content Grid */}
      <div className="container py-16 md:py-24 lg:py-28  mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-10">
          <h1 className="lg:text-[48px] font-semibold text-gray-800 leading-tight mb-4 max-w-lg mx-auto lg:mx-0">
            Discover the Future of Career Guidance
          </h1>
          <p className="text-[24px] text-gray-700 max-w-lg mx-auto lg:mx-0">
            Have any questions? Want some help getting started?
          </p>
        </div>

        {/* Right Side: Contact Form Card */}
        <div className="w-full lg:w-1/2 bg-white p-8 md:p-10 rounded-xl shadow-2xl">
          <h2 className="text-[36px] font-semibold text-gray-800 mb-6">
            Get in Touch with us
          </h2>

          <form className="space-y-4">
            {/* Row 1: Full Name and Email */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-gray-100 p-3 rounded-lg border-none focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-100 p-3 rounded-lg border-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Row 2: School/Organization Name */}
            <div>
              <input
                type="text"
                placeholder="School/Organization Name"
                className="w-full bg-gray-100 p-3 rounded-lg border-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Row 3: Message */}
            <div>
              <textarea
                placeholder="Message"
                rows="4"
                className="w-full bg-gray-100 p-3 rounded-lg border-none resize-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            {/* Row 4: Send Message Button */}
            <div>
              <button
                type="submit"
                className="w-full cursor-pointer sm:w-auto bg-[#3565FC] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-md"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Discover;