// import { useParams } from "react-router-dom";

// function DashboardVideoDetails() {
//   const params = useParams();
//   console.log("Params:", params); 
//   const { id } = params;
//   return (
//     <div>
//       <h1>Video Details for ID: {id || "No ID found"}</h1>
//     </div>
//   );
// }

// export default DashboardVideoDetails;

import React from 'react'

"use client"

import { useState, useRef } from "react"

function DashboardVideoDetails() {
  const [activeLesson, setActiveLesson] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  const lessons = [
    {
      id: 1,
      title: "Typography",
      subtitle: "Completed",
      date: "May, 20",
      status: "completed",
      videoUrl: "/videos/typography-lesson.mp4",
      thumbnail: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/day-picture-id1163588010_xjbdnc.jpg",
    },
    {
      id: 2,
      title: "Component",
      subtitle: "Due in 3 days",
      date: "3:18",
      status: "in-progress",
      videoUrl: "/videos/component-lesson.mp4",
      thumbnail: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/blog_V0otReuP_lnjvpf.jpg",
    },
    {
      id: 3,
      title: "Auto Layout",
      subtitle: "",
      date: "May, 20",
      status: "locked",
      videoUrl: "/videos/auto-layout-lesson.mp4",
      thumbnail: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822516/images_2_gsamts.jpg",
    },
    {
      id: 4,
      title: "Variant",
      subtitle: "",
      date: "May, 20",
      status: "locked",
      videoUrl: "/videos/variant-lesson.mp4",
      thumbnail: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/images_mj5hiu.jpg",
    },
  ]

  const suggestedVideos = [
    {
      id: 1,
      title: "Web & UI Design Using Figma",
      subtitle: "Beside Cooper at Web company",
      thumbnail: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822516/images_2_gsamts.jpg",
      participants: ["https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg", "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/upscale-face-1.jpg", "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg"],
      participantCount: 7,
    },
    {
      id: 2,
      title: "Web & UI Design Using Figma",
      subtitle: "Beside Cooper at Web company",
      thumbnail: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/1_2LywpPsQnnuRwQpDVrydAQ_cfd3ev.jpg",
      participants: ["https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg", "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/upscale-face-1.jpg", "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg"],
      participantCount: 7,
    },
    {
      id: 3,
      title: "Web & UI Design Using Figma",
      subtitle: "Beside Cooper at Web company",
      thumbnail: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/cover_yrth1n.jpg",
      participants: ["https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg", "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/upscale-face-1.jpg", "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg"],
      participantCount: 7,
    },
  ]

  const currentLesson = lessons[activeLesson]

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * duration
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleLessonClick = (index) => {
    if (lessons[index].status !== "locked") {
      setActiveLesson(index)
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pr-5 pb-5">
      <div className="container mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Side - Video Player */}
          <div className="lg:col-span-2 bg-white shadow-md p-4 rounded-md">
            {/* Video Container */}
            <div ref={containerRef} className=" rounded-lg  mb-4">
              <div className="relative aspect-video bg-gray-900 group">
                {/* Video Element (hidden, using thumbnail instead) */}
                <img
                  src={currentLesson.thumbnail || "/placeholder.svg"}
                  alt={currentLesson.title}
                  className="w-full h-full object-cover"
                />

                {/* Play Button Overlay */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                  >
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Progress Bar */}
                  <div
                    className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Play/Pause */}
                      <button onClick={togglePlay} className="text-white hover:text-blue-400 transition-colors">
                        {isPlaying ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      {/* Time */}
                      <span className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(duration || 180)}
                      </span>

                      {/* Volume */}
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                        </svg>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Fullscreen */}
                    <button onClick={toggleFullscreen} className="text-white hover:text-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 mb-1">Web & UI Design Using Figma</h1>
                  <p className="text-sm text-gray-500">Beside Cooper at web company</p>
                </div>
                <button className="px-4 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                  Follow
                </button>
              </div>

              {/* Participants */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img
                    src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822517/what-type-of-learner-is-your-child-min-scaled_mkm8a1.jpg"
                    alt="Participant"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg"
                    alt="Participant"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg"
                    alt="Participant"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                </div>
                <span className="text-sm text-gray-500">+ 7 Participants</span>
              </div>
            </div>
          </div>

          {/* Right Side - Lesson Exercise */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900">Lesson Exercise</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">See all</button>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Learning journey with our comprehensive lesson exercise routines
              </p>

              {/* Lesson List */}
              <div className="space-y-3">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    onClick={() => handleLessonClick(index)}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                      activeLesson === index
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                    } ${lesson.status === "locked" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-sm font-medium text-gray-500 w-4">{lesson.id}</span>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{lesson.title}</h3>
                        <p className="text-xs text-gray-500">{lesson.subtitle || lesson.date}</p>
                      </div>
                    </div>

                    {/* Status Icon */}
                    <div className="ml-3">
                      {lesson.status === "completed" && (
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      {lesson.status === "in-progress" && (
                        <span className="text-sm font-medium text-blue-600">{lesson.date}</span>
                      )}
                      {lesson.status === "locked" && (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggested</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-200">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{video.subtitle}</p>

                  {/* Participants */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {video.participants.map((avatar, idx) => (
                        <img
                          key={idx}
                          src={avatar || "/placeholder.svg"}
                          alt="Participant"
                          className="w-7 h-7 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">+ {video.participantCount} Participants</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardVideoDetails

