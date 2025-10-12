import React from "react";
import image from "../../image/image 1876.png";
import image1 from "../../image/image 1878.png";
import image2 from "../../image/image 1879.png";
import image3 from "../../image/Pattern.png";
import image4 from "../../image/image 1880.png";
import Successd from "./Successd";

function Banner() {
  return (
    <div>
      <div className="poppins relative  flex flex-col items-center justify-center">
        <div className="text-center py-8 sm:py-12 md:py-20 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
            Learn from the Experts
          </h1>
          <p className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-center mt-4">
            Hear directly from industry leaders and professionals about their
            career journeys, wisdom, and real insights about thriving in their
            fields.
          </p>
        </div>
        <img
          src={image1}
          className="absolute left-0 lg:mt-20 mt-10 sm:top-12 md:top-0 w-20 sm:w-24 md:w-32 lg:w-40 z-10"
          alt="Decorative image 1"
        />
        <div className="relative w-full  mx-auto">
          <img
            src={image}
            className="relative z-30 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[1000px] mx-auto"
            alt="Main banner"
          />
          <img
            src={image2}
            className="absolute top-1/6 left-4 sm:left-8 md:left-16 lg:left-1/6 w-16 sm:w-20 md:w-24 lg:w-96 z-10"
            alt="Decorative image 2"
          />
          <img
            src={image3}
            className="absolute top-1/20 right-4 sm:right-8 md:right-16 lg:right-1/5 w-24 sm:w-28 md:w-32 lg:w-40 z-10"
            alt="Pattern image"
          />
          <img
            src={image4}
            className="absolute bottom-72 right-0 w-10 sm:w-20 md:w-24 lg:w-32 z-10"
            alt="Decorative image 3"
          />
        </div>
      </div>
      <div className="absolute w-full top-[77vh] z-50 hidden md:block">
        <Successd />
      </div>
    </div>
  );
}

export default Banner;
