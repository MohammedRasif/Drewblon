"use client";

import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useShowAllVideoDetailsQuery,
  useShowSuggestedVideQuery,
} from "../../../redux/features/baseApi";

function DashboardVideoDetails() {
  const { id } = useParams(); 
  const [activeLesson, setActiveLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const { data: playlistData, isLoading: playlistLoading } =
    useShowAllVideoDetailsQuery(id);
  const { data: suggestTopic, isLoading: suggestLoading } =
    useShowSuggestedVideQuery();

  const videos = playlistData?.videos || [];
  const currentVideo = videos[activeLesson];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleLessonClick = (index) => {
    setActiveLesson(index);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  if (playlistLoading) {
    return (
      <div className="min-h-screen pr-5 pb-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="aspect-video bg-gray-200 animate-pulse rounded-lg mb-4" />
              <div className="h-8 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3" />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-200 animate-pulse rounded-lg h-96" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pr-5 pb-5">
      <div className="container mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Side - Video Player */}
          <div className="lg:col-span-2 bg-white shadow-md p-4 rounded-md">
            {/* Video Container */}
            <div ref={containerRef} className="rounded-lg mb-4">
              <div className="relative aspect-video bg-gray-900 group">
                {/* Video Element */}
                {currentVideo?.video_file ? (
                  <video
                    ref={videoRef}
                    src={currentVideo.video_file}
                    className="w-full h-full object-cover"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onClick={togglePlay}
                  />
                ) : (
                  <img
                    src={
                      currentVideo?.thumbnail ||
                      "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/day-picture-id1163588010_xjbdnc.jpg"
                    }
                    alt={currentVideo?.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Play Button Overlay */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                  >
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
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
                      style={{
                        width: `${(currentTime / duration) * 100 || 0}%`,
                      }}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        {isPlaying ? (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      <span className="text-white text-sm">
                        {formatTime(currentTime)} /{" "}
                        {formatTime(duration || currentVideo?.duration || 0)}
                      </span>

                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
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

                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 mb-1">
                    {playlistData?.title || "Video Playlist"}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {playlistData?.description || playlistData?.topic_name}
                  </p>
                </div>
                <button className="px-4 py-1.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                  Follow
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{playlistData?.video_count || 0} videos</span>
                <span>{currentVideo?.views || 0} views</span>
              </div>
            </div>
          </div>

          {/* Right Side - Video List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  Playlist Videos
                </h2>
                <span className="text-sm text-gray-500">
                  {videos.length} videos
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                {playlistData?.description || "Video collection"}
              </p>

              {/* Video List */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    onClick={() => handleLessonClick(index)}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      activeLesson === index
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                    }`}
                  >
                    <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                      <img
                        src={
                          video.thumbnail ||
                          "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759812746/day-picture-id1163588010_xjbdnc.jpg"
                        }
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      {video.duration && (
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {Math.floor(video.duration / 60)}:
                          {(video.duration % 60).toString().padStart(2, "0")}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {video.views || 0} views
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Suggested Playlists
          </h2>
          {suggestLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="aspect-video bg-gray-200 animate-pulse" />
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestTopic?.map((playlist) => (
                <Link
                  to={`/dashboard/details/${playlist.id}`}
                  key={playlist.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-200">
                    <img
                      src={
                        playlist.thumbnail ||
                        playlist.videos?.[0]?.thumbnail ||
                        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1759822516/images_2_gsamts.jpg"
                      }
                      alt={playlist.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {playlist.video_count} videos
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                      {playlist.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                      {playlist.description || playlist.topic_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {playlist.topic_name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardVideoDetails;