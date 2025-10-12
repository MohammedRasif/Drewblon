"use client";

import { useState } from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import image from "../../image/Frame 11.png";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    // Add subscription logic here
    setEmail("");
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <hr className="mt-20 text-gray-200" />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Social Icons Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div>
                <img src={image} className="h-10" alt="" />
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links Section */}
          <div>
            <h3 className="text-gray-900 font-semibold text-[20px] mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-gray-900 font-semibold text-[20px] mb-3">
              Newsletter
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Subscribe to receive new videos, simulations, and event reminders
              directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 ">
          <p className="text-gray-500 text-sm">© 2025 CareerQuest</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
