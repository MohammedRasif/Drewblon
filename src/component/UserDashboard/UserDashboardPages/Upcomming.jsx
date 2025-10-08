"use client";

import { useState } from "react";

function Upcomming() {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 29)); // Set to a date with data for demo
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1)); // Set to December 2025 for demo

  // Sample data for livestreams
  const livestreams = [
    {
      id: 1,
      title: "Breaking Into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company, including interview tips and career advice.",
      author: "Ahmad Nur Fawaid",
      category: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/better-learner-cover_zfyxqo.jpg",
      duration: "2-3 hrs",
      date: new Date(2025, 11, 29, 14, 30),
      status: "registered",
      type: "today",
    },
    {
      id: 2,
      title: "Breaking Into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company, including interview tips and career advice.",
      author: "Ahmad Nur Fawaid",
      category: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/1_yjcdof.jpg",
      duration: "2-3 hrs",
      date: new Date(2025, 11, 29, 16, 0),
      status: "available",
      type: "today",
    },
    {
      id: 3,
      title: "Youth Leadership Summit",
      description: "Empowering young leaders and entrepreneurs.",
      author: "Ahmad Nur Fawaid",
      category: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/day-picture-id1163588010_xjbdnc.jpg",
      duration: "2 hrs",
      date: new Date(2025, 11, 30, 10, 0),
      status: "reminder",
      type: "reminder",
    },
    {
      id: 4,
      title: "Cultural Fest & Talent Show",
      description: "Celebrating diverse cultures and showcasing music, art...",
      author: "Ahmad Nur Fawaid",
      category: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/blog_V0otReuP_lnjvpf.jpg",
      duration: "3 hrs",
      date: new Date(2025, 11, 30, 15, 0),
      status: "reminder",
      type: "reminder",
    },
    {
      id: 5,
      title: "Breaking Into Tech: A Software Engineer's Journey",
      description:
        "Learn about the path from computer science student to working at a top tech company, including interview tips and career advice.",
      author: "Ahmad Nur Fawaid",
      category: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/what-type-of-learner-is-your-child-min-scaled_mkm8a1.jpg",
      duration: "2-3 hrs",
      date: new Date(2025, 11, 28, 9, 0),
      status: "registered",
      type: "registered",
    },
    {
      id: 6,
      title: "Community Volunteering",
      description: "A day dedicated to social work and community service.",
      author: "Ahmad Nur Fawaid",
      category: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/life-long-learner_vekkdy.jpg",
      duration: "4 hrs",
      date: new Date(2025, 11, 31, 11, 0),
      status: "registered",
      type: "registered",
    },
    {
      id: 7,
      title: "Book Swap & Literary Discussion",
      description: "Exchange books and discover new favorite reads.",
      author: "Ahmad Nur Fawaid",
      category: "Academic",
      thumbnail:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822518/screen-shot-2017-10-07-at-10-56-52-am_sjomrm.png",
      duration: "2 hrs",
      date: new Date(2025, 11, 31, 14, 0),
      status: "registered",
      type: "registered",
    },
  ];

  // Helper function to check if two dates are the same (ignoring time)
  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Get dates that have events
  const getDatesWithEvents = () => {
    const dates = new Set();
    livestreams.forEach((stream) => {
      const dateStr = `${stream.date.getFullYear()}-${String(
        stream.date.getMonth() + 1
      ).padStart(2, "0")}-${String(stream.date.getDate()).padStart(2, "0")}`;
      dates.add(dateStr);
    });
    return dates;
  };

  const datesWithEvents = getDatesWithEvents();

  // Get all livestreams (no filter, always all)
  const getAllLivestreams = () => {
    return livestreams;
  };

  // Get reminders for selected date
  const getRemindersForDate = () => {
    return livestreams.filter(
      (stream) =>
        stream.type === "reminder" && isSameDate(stream.date, selectedDate)
    );
  };

  // Get today's livestreams (only if selected date is today)
  const getTodayLivestreamsForDate = () => {
    // For demo, treat selectedDate as "today" if it matches any data date
    return livestreams.filter(
      (stream) =>
        stream.type === "today" && isSameDate(stream.date, selectedDate)
    );
  };

  // Get registered livestreams for selected date
  const getRegisteredLivestreamsForDate = () => {
    return livestreams.filter(
      (stream) =>
        stream.type === "registered" && isSameDate(stream.date, selectedDate)
    );
  };

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

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const hasEvent = (day) => {
    const checkDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const dateStr = `${checkDate.getFullYear()}-${String(
      checkDate.getMonth() + 1
    ).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;
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

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Render week day headers
    const headers = weekDays.map((day, index) => (
      <div
        key={`header-${index}`}
        className="text-center text-xs font-medium text-gray-500 py-2"
      >
        {day}
      </div>
    ));

    // Render empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Render days of the month
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
        {/* Calendar header */}
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

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {headers}
          {days}
        </div>
      </div>
    );
  };

  const LivestreamCard = ({ stream, isLarge = false }) => {
    if (isLarge) {
      return (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          {/* Thumbnail */}
          <div className="relative">
            <img
              src={stream.thumbnail || "/placeholder.svg"}
              alt={stream.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Author info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {stream.author}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(stream.date)} at {formatTime(stream.date)}
                  </p>
                </div>
              </div>
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                {stream.category}
              </span>
            </div>

            {/* Title and description */}
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              {stream.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{stream.description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {stream.duration}
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
                  {formatDate(stream.date)}
                </span>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-4 flex space-x-3">
              <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors cursor-pointer">
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

              <button className="w-full text-red-600 py-2.5 rounded-lg font-medium text-sm hover:bg-red-50 transition-colors border cursor-pointer">
                Cancel registration
              </button>
            </div>
          </div>
        </div>
      );
    }
    // Small card for sidebar
    return (
      <div className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
        <img
          src={stream.thumbnail || "/placeholder.svg"}
          alt={stream.title}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-800 mb-1 truncate">
            {stream.title}
          </h4>
          <p className="text-xs text-gray-600 line-clamp-2">
            {stream.description}
          </p>
        </div>
      </div>
    );
  };

  const allLivestreams = getAllLivestreams();
  const remindersForDate = getRemindersForDate();
  const todayLivestreamsForDate = getTodayLivestreamsForDate();
  const registeredLivestreamsForDate = getRegisteredLivestreamsForDate();

  const renderEmptyState = (sectionName) => (
    <div className="text-center py-8">
      <p className="text-gray-500 text-sm">{`No ${sectionName.toLowerCase()} available for ${formatDate(
        selectedDate
      )}.`}</p>
    </div>
  );

  return (
    <div className="flex gap-6  bg-gray-50 min-h-screen">
      {/* Left side - All Livestream cards (no filter) */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allLivestreams.map((stream) => (
            <LivestreamCard key={stream.id} stream={stream} isLarge={true} />
          ))}
        </div>
      </div>

      {/* Right side - Calendar and filtered lists for selected date */}
      <div className="w-80 flex-shrink-0">
        {/* Calendar */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200 -mt-46">
          {renderCalendar()}
        </div>

        {/* Reminders for selected date */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Reminders</h3>
          {remindersForDate.length > 0 ? (
            <div className="space-y-2">
              {remindersForDate.map((stream) => (
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

        {/* Today Livestreams for selected date */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Today Livestreams
          </h3>
          {todayLivestreamsForDate.length > 0 ? (
            <div className="space-y-2">
              {todayLivestreamsForDate.map((stream) => (
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

        {/* Registered Livestreams for selected date */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Registered Livestreams
          </h3>
          {registeredLivestreamsForDate.length > 0 ? (
            <div className="space-y-2">
              {registeredLivestreamsForDate.map((stream) => (
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
    </div>
  );
}

export default Upcomming;
