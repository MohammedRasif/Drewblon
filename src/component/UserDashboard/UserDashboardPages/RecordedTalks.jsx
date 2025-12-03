import React, { useState } from "react";

function RecordedTalks({ talks, selectedCategory, isLoading }) {
  const [playingId, setPlayingId] = useState(null);

  // Filter talks by selected category
  const filteredTalks =
    selectedCategory === "All categories"
      ? talks
      : talks.filter((talk) => talk.category_name === selectedCategory);

  // Format duration (you can calculate from video if needed later)
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Base URL for media (adjust if needed)
  const MEDIA_URL = "http://10.10.13.60:8002/" || "http://yourdomain.com";

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading talks...</div>
    );
  }

  if (filteredTalks.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          No talks found
        </h3>
        <p className="text-gray-600">
          No recorded talks in "
          <span className="font-medium">{selectedCategory}</span>" category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredTalks.map((talk) => {
        const videoUrl = `${MEDIA_URL}${talk.talk_file}`;
        const thumbnailUrl = talk.thumbnail
          ? `${MEDIA_URL}${talk.thumbnail}`
          : "/placeholder-video.jpg";

        const isPlaying = playingId === talk.id;

        return (
          <div
            key={talk.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-video bg-black">
              {isPlaying ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={thumbnailUrl}
                    alt={talk.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    onClick={() => setPlayingId(talk.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer hover:bg-opacity-50 transition"
                  >
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transform hover:scale-110 transition">
                      <svg
                        className="w-10 h-10 text-white ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6 4l10 6-10 6V4z" />
                      </svg>
                    </div>
                  </div>
                </>
              )}

              <div className="absolute bottom-3 right-3 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                Video
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 truncate">
                  {talk.counselor_name}
                </h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                  {talk.category_name}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {talk.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {talk.caption || "No description available"}
              </p>

              {/* Play Button Below */}
              {!isPlaying && (
                <button
                  onClick={() => setPlayingId(talk.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                >
                  Play Video
                </button>
              )}

              {isPlaying && (
                <button
                  onClick={() => setPlayingId(null)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition"
                >
                  Show Thumbnail
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecordedTalks;
