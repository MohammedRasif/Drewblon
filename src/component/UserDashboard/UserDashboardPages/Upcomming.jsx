"use client";

import { useState } from "react";
import { ToastContainer } from "react-toastify";

function Upcomming({
  showUpcommingLiveSctrimAllData = {},
  showFilterData = {},
  registerMeeting,
  cencelMeeting,
  selectedDate,
  setSelectedDate,
  formatDateForAPI,
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState({});

  const allLivestreams = showUpcommingLiveSctrimAllData?.results || [];

  const upcomingTalksForDate = showFilterData?.upcoming_talks_for_date || [];
  const todayScheduledLivestreams =
    showFilterData?.today_scheduled_livestreams || [];
  const upcomingRegisteredTalks =
    showFilterData?.upcoming_registered_talks || [];
  const baseUrl = "https://noncircuitous-lauryn-pseudosocialistic.ngrok-free.dev"
  // Get dates that have events from all livestreams
  const getDatesWithEvents = () => {
    const dates = new Set();
    allLivestreams.forEach((stream) => {
      dates.add(stream.date);
    });
    return dates;
  };

  const datesWithEvents = getDatesWithEvents();

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const hasEvent = (day) => {
    const checkDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const dateStr = formatDateForAPI(checkDate);
    return datesWithEvents.has(dateStr);
  };

  const isSelectedDate = (day) => {
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleDateClick = (day) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setSelectedDate(newDate);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  // Handle registration/cancellation
  const handleRegisterToggle = async (id, isRegistered) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
    try {
      if (isRegistered) {
        await cencelMeeting(id).unwrap();
      } else {
        await registerMeeting(id).unwrap();
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Handle join meeting
  const handleJoinMeeting = (meetingLink) => {
    if (meetingLink) {
      window.open(meetingLink, "_blank");
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const headers = weekDays.map((day, index) => (
      <div
        key={`header-${index}`}
        className="text-center text-xs font-medium text-gray-500 py-2"
      >
        {day}
      </div>
    ));

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isSelectedDate(day);
      const hasEventDot = hasEvent(day);

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`p-2 text-center text-sm cursor-pointer rounded-lg relative transition-colors
            ${
              isSelected
                ? "bg-blue-600 text-white font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }
          `}
        >
          {day}
          {hasEventDot && (
            <div
              className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full
              ${isSelected ? "bg-white" : "bg-blue-600"}
            `}
            ></div>
          )}
        </div>
      );
    }

    return (
      <div className="">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-sm font-semibold text-gray-800">
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {headers}
          {days}
        </div>
      </div>
    );
  };

  const LivestreamCard = ({ stream, isLarge = false }) => {
    const isRegistered = stream.is_registered || false;
    const isLoadingAction = loading[stream.id] || false;

    if (isLarge) {
      return (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="relative">
            <img
              src={stream.thumbnail || "/placeholder.svg"}
              alt={stream.title}
              className="w-full h-48 object-cover"
            />
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  {stream.counselor_photo ? (
                    <img
                      src={stream.counselor_photo}
                      alt={stream.counselor_name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-medium text-gray-600">
                      {stream.counselor_name?.charAt(0) || "?"}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {stream.counselor_name || stream.counselor || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {stream.date} at {formatTime(stream.time)}
                  </p>
                </div>
              </div>
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                {stream.category_name || stream.category}
              </span>
            </div>

            <h3 className="text-base font-semibold text-gray-800 mb-2">
              {stream.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {stream.caption || "No description available"}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {stream.registration_count || 0}/
                  {stream.participant_limit || 0} registered
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {stream.date}
                </span>
              </div>
            </div>

            <div className="mt-4 flex space-x-3">
              {isRegistered ? (
                <>
                  <button
                    onClick={() => handleJoinMeeting(stream.meeting_link)}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Join meeting
                  </button>

                  <button
                    onClick={() => handleRegisterToggle(stream.id, true)}
                    disabled={isLoadingAction}
                    className="w-full text-red-600 py-2.5 rounded-lg font-medium text-sm hover:bg-red-50 transition-colors border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoadingAction ? "Processing..." : "Cancel registration"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleRegisterToggle(stream.id, false)}
                  disabled={isLoadingAction}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingAction ? "Processing..." : "Register"}
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Small card for sidebar
    return (
      <div className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
        <img
          src={`${baseUrl}${stream.thumbnail}`}
          alt={stream.title}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-800 mb-1 truncate">
            {stream.title}
          </h4>
          <p className="text-xs text-gray-600 line-clamp-2">
            {stream.caption || "No description available"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {formatTime(stream.time)}
          </p>
        </div>
      </div>
    );
  };

  const renderEmptyState = (sectionName) => (
    <div className="text-center py-8">
      <p className="text-gray-500 text-sm">{`No ${sectionName.toLowerCase()} available for ${formatDate(
        selectedDate
      )}.`}</p>
    </div>
  );

  return (
    <div className="flex gap-6 bg-gray-50 min-h-screen">
      {/* Left side - All Livestream cards */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allLivestreams.length > 0 ? (
            allLivestreams.map((stream) => (
              <LivestreamCard key={stream.id} stream={stream} isLarge={true} />
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500">No upcoming livestreams available</p>
            </div>
          )}
        </div>
      </div>

      {/* Right side - Calendar and filtered lists */}
      <div className="w-80 flex-shrink-0">
        {/* Calendar */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200 -mt-46">
          {renderCalendar()}
        </div>

        {/* Upcoming talks for selected date */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Reminders</h3>
          {upcomingTalksForDate.length > 0 ? (
            <div className="space-y-2">
              {upcomingTalksForDate.map((stream) => (
                <LivestreamCard
                  key={stream.id}
                  stream={stream}
                  isLarge={false}
                />
              ))}
            </div>
          ) : (
            renderEmptyState("Reminders")
          )}
        </div>

        {/* Today Livestreams */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Today Livestreams
          </h3>
          {todayScheduledLivestreams.length > 0 ? (
            <div className="space-y-2">
              {todayScheduledLivestreams.map((stream) => (
                <LivestreamCard
                  key={stream.id}
                  stream={stream}
                  isLarge={false}
                />
              ))}
            </div>
          ) : (
            renderEmptyState("Today Livestreams")
          )}
        </div>

        {/* Registered Livestreams */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Registered Livestreams
          </h3>
          {upcomingRegisteredTalks.length > 0 ? (
            <div className="space-y-2">
              {upcomingRegisteredTalks.map((stream) => (
                <LivestreamCard
                  key={stream.id}
                  stream={stream}
                  isLarge={false}
                />
              ))}
            </div>
          ) : (
            renderEmptyState("Registered Livestreams")
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Upcomming;
