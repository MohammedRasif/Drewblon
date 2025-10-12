import React from "react";
import { BiBarChart, BiUser, BiRightArrowAlt, BiUserVoice } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { TbVectorBezier2 } from "react-icons/tb";

function Successd() {
  return (
    <div className="bg-[#2B7FFF] text-white p-10 rounded-t-4xl font-sans py-20">
      <div className="container mx-auto">
        <div className="mb-10">
          <div>
            <hr className="w-8 md:w-10 h-1 "/>
            <span className="text-[18px] opacity-70">Features</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-[48px] mt-2 max-w-full md:max-w-md md:w-1/2">
              Everything You Need to Succeed
            </h1>
            <p className="text-[16px] max-w-full md:max-w-xl mt-4 md:mt-2 md:w-1/2 text-gray-200">
              Gain valuable insights from industry leaders through on-demand
              videos and interactive live sessions. Learn real-world skills,
              explore different career paths, and get practical advice tailored
              to students preparing for their future.
            </p>
          </div>
        </div>
        <div className="flex justify-around gap-5">
          <div className="text-center max-w-xs">
            <div className="bg-[#D1E8FF] rounded-full p-2 inline-block text-[#3B3A40]">
              <GoGraph  size={32} />
            </div>
            <h3 className="text-[24px] mt-3 font-semibold">Explore Careers</h3>
            <p className="text-sm leading-5 mt-2 text-gray-200">
              Use a modern platform for students to explore career options,
              learn from experts, and prepare for the future.
            </p>
          </div>
          <div className="text-center max-w-xs">
            <div className="bg-[#FFEDB6] rounded-full p-2 inline-block text-[#3B3A40]">
              <BiUserVoice className="pl-[1px]" size={35} />
            </div>
            <h3 className="text-[24px] mt-3 font-semibold">Expert Talks</h3>
            <p className="text-sm leading-5 mt-2 text-gray-200">
              Learn from industry professionals and academic experts. Join live
              sessions or access our extensive recorded library.
            </p>
          </div>
          <div className="text-center max-w-xs">
            <div className="bg-[#D1E8FF] rounded-full p-2 inline-block text-[#3B3A40]">
              <TbVectorBezier2  size={35} />
            </div>
            <h3 className="text-[24px] mt-3 font-semibold">Career Guidance</h3>
            <p className="text-sm leading-5 mt-2 text-gray-200">
              Stay informed with personalized guidance from expert counselors.
              Get timely updates on opportunities and career pathways.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Successd;