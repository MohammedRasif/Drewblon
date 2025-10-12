import Marquee from "react-fast-marquee";
import image from "../../image/image 1884.png";
import { FaSlack } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";
import { GiKingJuMask } from "react-icons/gi";

function Improve() {
  return (
    <div className="poppins">
      {/* Main Section */}
      <div className="container mx-auto mt-10 md:mt-20  px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={image}
            alt="Growth illustration"
            className="w-full h-auto object-contain"
          />
        </div>
        {/* Text Section */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center space-x-3 md:space-x-5">
            <hr className="w-8 md:w-10 h-1 bg-gray-800" />
            <span className="text-xs md:text-sm opacity-70">Features</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-[#000000] leading-tight py-3 md:py-5">
            Track Your Growth. Compete. Improve.
          </h1>
          <p className="text-sm md:text-[17px] text-[#525252]">
            Measure your learning journey with real-time analytics. See how many
            simulations you’ve completed, videos you’ve watched, and points
            you’ve earned to keep track of your progress.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <p className="text-center py-8 md:py-12 lg:py-20 text-sm md:text-base lg:text-xl max-w-[90%] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto px-4">
        We’re on a mission to make career guidance and skill development
        accessible for every student. Already serving hundreds of students in
        our pilot programs, and growing every day.
      </p>

      {/* Marquee Section */}
      <div className="py-8 md:py-16">
        <Marquee speed={50} gradient={false} className="py-3 md:py-4">
          {[
            {
              icon: <FaSlack size={44} className="mr-2 md:mr-3" />,
              text: "Slack",
            },
            {
              icon: <FaSlack size={44} className="mr-2 md:mr-3" />,
              text: "HubSpot",
            },
            {
              icon: <FaRegSquareMinus size={44} className="mr-2 md:mr-3" />,
              text: "Square",
            },
            {
              icon: <GiKingJuMask size={44} className="mr-2 md:mr-3" />,
              text: "Service",
            },
            {
              icon: <FaSlack size={44} className="mr-2 md:mr-3" />,
              text: "Conji_ant",
            },
            {
              icon: <FaSlack size={44} className="mr-2 md:mr-3" />,
              text: "Grubhub",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-lg md:text-2xl lg:text-5xl font-semibold text-[#64626A] flex items-center space-x-2 md:space-x-3 mx-4 md:mx-8 lg:mx-10"
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Improve;
