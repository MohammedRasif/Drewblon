"use client";

import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useShowVideoTopicDataQuery,
  useShowVideoTopicQuery,
} from "../../../redux/features/baseApi";

function DashboardVideos() {
  const { id } = useParams(); 
  const [activeCategory, setActiveCategory] = useState("All topics");
  const [selectedTopicId, setSelectedTopicId] = useState();
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const baseUrl = "https://noncircuitous-lauryn-pseudosocialistic.ngrok-free.dev"
  const {
    data: videoCategory,
    isLoading: categoryLoading,
    error: categoryError,
  } = useShowVideoTopicQuery(id);

  const {
    data: videoTopic,
    isLoading: topicLoading,
    error: topicError,
  } = useShowVideoTopicDataQuery(id);

  const categories = useMemo(() => {
    const cats = ["All topics"];
    if (videoCategory?.results) {
      videoCategory.results.forEach((topic) => {
        if (topic.name && !cats.includes(topic.name)) {
          cats.push(topic.name);
        }
      });
    }
    return cats;
  }, [videoCategory]);

  // Handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    if (category === "All topics") {
      setSelectedTopicId(null);
      setSelectedCategoryId(null);
    } else {
      const topic = videoCategory?.results?.find(
        (t) => t.name === category
      );
      if (topic) {
        setSelectedTopicId(topic.id);
        setSelectedCategoryId(topic.category); 
      }
    }
  };

  // Get playlists to display
  const getPlaylists = () => {
  if (activeCategory === "All topics") {
    if (!videoTopic?.topics) return [];

    return videoTopic.topics.flatMap(
      (topic) => topic.playlists || []
    );
  }
  if (!videoTopic?.topics) return [];
  const selectedTopic = videoTopic.topics.find(
    (t) => t.name === activeCategory
  );
  return selectedTopic?.playlists || [];
};


  const playlists = getPlaylists();

  const newPlaylists = useMemo(() => {
    return playlists.slice(0, 3);
  }, [playlists]);

  const popularPlaylists = useMemo(() => {
    return playlists.slice(3, 6);
  }, [playlists]);

  // Loading state
  if (categoryLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-blue-600"></div>
          {/* <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-500 opacity-75"></div> */}
        </div>
        <p className="ml-6 text-lg text-gray-600 font-medium">
          Loading ...
        </p>
      </div>
    );
  }

  // Error state
  if (categoryError) {
    return (
      <div className="bg-gray-50 pr-5 pb-10 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold mb-2">Error loading videos</p>
          <p className="text-sm">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pr-5 pb-10">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state for topic data */}
      {topicLoading && selectedTopicId && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-600">Loading playlists...</p>
        </div>
      )}

      {/* Error state for topic data */}
      {topicError && selectedTopicId && (
        <div className="text-center py-12 text-red-600">
          <p>Error loading playlists</p>
        </div>
      )}

      {/* New Section */}
      {!topicLoading && newPlaylists.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">New</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              See all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newPlaylists.map((playlist) => (
              <Link
                to={`/dashboard/details/${playlist.id}`}
                key={playlist.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative aspect-video">
                  <img
                    src={`${baseUrl}${playlist.image}`}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {playlist.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {playlist.description || "No description"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {playlist.video_count} Videos
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(playlist.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Popular Section */}
      {!topicLoading && popularPlaylists.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Popular</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              See all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPlaylists.map((playlist) => (
              <Link
                to={`/dashboard/details/${playlist.id}`}
                key={playlist.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative aspect-video">
                  <img
                    src={`${baseUrl}${playlist.image}`}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {playlist.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {playlist.description || "No description"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {playlist.video_count} Videos
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(playlist.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}



      {/* Empty state */}
      {!topicLoading &&
        !categoryLoading &&
        playlists.length === 0 &&
        activeCategory !== "All topics" && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No playlists available in this category
            </p>
          </div>
        )}
    </div>
  );
}

export default DashboardVideos;