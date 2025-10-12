import { PiGraduationCapFill } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi";
import { MdOndemandVideo } from "react-icons/md";

function About() {
  return (
    <div className="px-6 md:px-12 lg:px-20 lg:pb-20 lg:pt-96 poppins">
      {/* Main content section */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left section */}
          <div>
            <div className="flex items-center space-x-3 md:space-x-5 pb-3">
              <hr className="w-8 md:w-10 h-1 bg-gray-800" />
              <span className="text-xs md:text-sm opacity-70">About us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium text-[#000000] leading-tight">
              Track Your Growth.
              <br />
              Compete. Improve.
            </h1>
          </div>

          {/* Right section */}
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              We believe every student deserves the right guidance, resources,
              and opportunities to shape their future with confidence. Our
              platform is built to bridge the gap between education and career
              readiness by giving students access to practical tools, real-world
              insights, and expert support.
            </p>
            <p>
              From interactive career simulations and on-demand videos to live
              talks with industry professionals and real-time counselor updates,
              we bring everything a student needs into one simple and engaging
              experience. Schools can empower their students through
              personalized content, livestreams, and counselor posts, while
              individuals can explore their interests at their own pace with
              equal access to features.
            </p>
          </div>
        </div>

        {/* Statistics section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Partner Schools */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FFEDB6] flex items-center justify-center flex-shrink-0 lg:mt-3">
              <PiGraduationCapFill className="w-9 h-9 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-[40px] font-bold text-gray-900 text-center">
                500+
              </h3>
              <p className="text-gray-600 text-[16px]">Partner Schools</p>
            </div>
          </div>

          {/* Active Students */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[#D1E8FF] flex items-center justify-center flex-shrink-0 lg:mt-3">
              <HiUserGroup className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-[40px] font-bold text-gray-900 text-center">
                2M+
              </h3>
              <p className="text-gray-600 text-sm">Active Students</p>
            </div>
          </div>

          {/* Live Sessions Hosted */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FFEDB6] flex items-center justify-center flex-shrink-0 lg:mt-3">
              <MdOndemandVideo className="w-9 h-9 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-[40px] font-bold text-gray-900 text-center">
                1,200+
              </h3>
              <p className="text-gray-600 text-sm">Live Sessions Hosted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
