import React, { useState } from "react";
import image from "../../image/Frame 1707483197.png";
import { useContactUsMutation } from "../../redux/features/baseApi";

function Discover() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    organization_name: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState("");
  const [contactUs, { isLoading }] = useContactUsMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("");

    try {
      await contactUs(formData).unwrap();
      setSubmitStatus("success");
      setFormData({
        full_name: "",
        email: "",
        organization_name: "",
        message: "",
      });
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(""), 5000);
    } catch (error) {
      setSubmitStatus("error");
      console.error("Contact form error:", error);
    }
  };
  return (
    <div id="contact" className="   relative overflow-hidden">
      <img src={image} className="w-full  absolute" alt="" />

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

          {submitStatus === "success" && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              Failed to send message. Please try again.
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Row 1: Full Name and Email */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 p-3 rounded-lg border-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 p-3 rounded-lg border-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Row 2: School/Organization Name */}
            <div>
              <input
                type="text"
                name="organization_name"
                placeholder="School/Organization Name"
                value={formData.organization_name}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 p-3 rounded-lg border-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Row 3: Message */}
            <div>
              <textarea
                name="message"
                placeholder="Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 p-3 rounded-lg border-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            {/* Row 4: Send Message Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer sm:w-auto bg-[#3565FC] hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-md"
              >
                {isLoading ? "Sending..." : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Discover;
