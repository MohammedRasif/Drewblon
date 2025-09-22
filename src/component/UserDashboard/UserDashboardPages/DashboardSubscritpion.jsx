"use client";

import { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

function DashboardSubscription() {
  const [autoRenew, setAutoRenew] = useState(true);

  return (
    <div className="p-5">
      <div className="max-w-4xl ">
        <h1 className="text-[20px] font-semibold text-gray-900 mb-4">
          Subscription
        </h1>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Student Plan */}
          <div className="bg-[#F0F0F0] rounded-lg border border-gray-200 p-6 relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Student</h3>
                <p className="text-sm text-gray-500">
                  8 month 12 days remaining
                </p>
              </div>

              <div className="absolute top-1 right-1 text-[#615FFF] ">
                <IoIosCheckmarkCircle size={24} />
              </div>

              <div className="text-right">
                <p className="text-xl font-semibold text-gray-900">$10/month</p>
              </div>
            </div>
            <button className=" mt-4 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Cancel subscription
            </button>
          </div>

          {/* School Plan */}
          <div className="bg-gradient-to-r from-[#615FFF] to-purple-600 rounded-lg p-6 text-white relative">
            {/* Checkmark Icon */}

            <div className="mb-4">
              <h3 className="text-lg font-semibold">School</h3>
              <p className="text-sm opacity-90">8 month 12 days remaining</p>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <button className="flex px-5 py-2 bg-white text-blue-600 rounded-sm font-medium hover:bg-gray-50 transition-colors">
                Upgrade
              </button>
              <h1 className="flex-1   text-white  font-medium">
                Learn more about this plan
              </h1>
            </div>
          </div>
        </div>

        {/* Auto Renew Section */}
        <div className=" pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[20px] font-bold text-gray-900 mb-2">
                Enable auto renew
              </h3>
              <p className="text-sm text-gray-600 max-w-2xl">
                This option, if checked, will render your productive
                subscription, if the current plan expires. However, this might
                prevent you from
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex-shrink-0">
              <button
                onClick={() => setAutoRenew(!autoRenew)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  autoRenew ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoRenew ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSubscription;
