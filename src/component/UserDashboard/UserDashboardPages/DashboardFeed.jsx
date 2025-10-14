"use client";
import { useState } from "react";

function DashboardFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [expandedPosts, setExpandedPosts] = useState(new Set());
  const [commentInputs, setCommentInputs] = useState({}); // New state for comment inputs
 
  const categories = [
    "All categories",
    "Business",
    "Engineering",
    "Art Entertainment and culture",
    "HealthCare",
    "Trades",
    "Science/Research",
    "Informational Tech",
    "Law/Legal",
    "Public Sector",
    "Exploration",
    "Life and Career Advice",
  ];

  const posts = [
    {
      id: 1,
      author: "Ahmad Nur Fawaid",
      role: "Chemistry Teacher",
      timeAgo: "15 minute ago",
      title: "Understanding College Application Deadlines",
      content:
        "Forming study groups for AP Chemistry exam preparation. Meeting weekly starting next Monday in Room 204. Bring your textbook and calculator.",
      fullContent:
        "Forming study groups for AP Chemistry exam preparation. Meeting weekly starting next Monday in Room 204. Bring your textbook and calculator. We will cover all major topics including atomic structure, chemical bonding, thermodynamics, and kinetics. Please bring your own materials and be prepared to participate actively in group discussions.",
      category: "Academic",
      comments: 7,
      likes: 12,
      hasImage: false,
      image: null,
    },
    {
      id: 2,
      author: "Ahmad Nur Fawaid",
      role: "Counselor Update",
      timeAgo: "15 minute ago",
      title: "AP Chemistry Study Group Formation",
      content:
        "A comprehensive guide to managing your college application timeline and avoiding common pitfalls. Learn about early decision, regular decision, and rolling admissions.",
      fullContent:
        "A comprehensive guide to managing your college application timeline and avoiding common pitfalls. Learn about early decision, regular decision, and rolling admissions. This guide covers everything from choosing the right schools to writing compelling essays and preparing for interviews. We'll also discuss financial aid options and scholarship opportunities.",
      category: "Career",
      comments: 7,
      likes: 12,
      hasImage: true,
      image:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg",
    },
    {
      id: 3,
      author: "Ahmad Nur Fawaid",
      role: "Counselor Update",
      timeAgo: "15 minute ago",
      title: "AP Chemistry Study Group Formation",
      content:
        "A comprehensive guide to managing your college application timeline and avoiding common pitfalls. Learn about early decision, regular decision, and rolling admissions.",
      fullContent:
        "A comprehensive guide to managing your college application timeline and avoiding common pitfalls. Learn about early decision, regular decision, and rolling admissions. This guide covers everything from choosing the right schools to writing compelling essays and preparing for interviews. We'll also discuss financial aid options and scholarship opportunities.",
      category: "Career",
      comments: 7,
      likes: 12,
      hasImage: true,
      image:
        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg",
    },
  ];

  const handleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleComments = (postId) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
        // Initialize comment input for this post
        setCommentInputs((prev) => ({
          ...prev,
          [postId]: "",
        }));
      }
      return newSet;
    });
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleSubmitComment = (postId) => {
    if (commentInputs[postId]?.trim()) {
      // Here you would typically send the comment to your backend
      console.log(`Comment for post ${postId}:`, commentInputs[postId]);
      setCommentInputs((prev) => ({
        ...prev,
        [postId]: "",
      }));

    }
  };

  const handleReadMore = (postId) => {
    setExpandedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All categories" ||
      post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 pr-5 pb-10">
      <div className="container mx-auto">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-white border border-gray-200 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-400"
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
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg px-6 pt-6 pb-3 shadow-sm border border-gray-100"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{post.author}</h3>
                    <p className="text-sm text-gray-500">{post.role}</p>
                    <p className="text-xs text-gray-400">{post.timeAgo}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[14px] font-medium ${
                    post.category === "Academic"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {post.category}
                </span>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {expandedPosts.has(post.id)
                        ? post.fullContent
                        : post.content}
                      {post.content.length > 150 && (
                        <button
                          onClick={() => handleReadMore(post.id)}
                          className="text-blue-600 hover:text-blue-700 ml-1"
                        >
                          {expandedPosts.has(post.id)
                            ? "read less"
                            : "read more"}
                        </button>
                      )}
                    </p>
                  </div>
                  {post.hasImage && (
                    <div className="flex-shrink-0 -mt-10">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="w-40 h-36 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-end pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleComments(post.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-all duration-200"
                  >
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
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="text-sm">{post.comments} Comments</span>
                  </button>
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-all duration-200 cursor-pointer ${
                      likedPosts.has(post.id)
                        ? "text-[#3565FC] p-2 rounded-full"
                        : "text-gray-500 hover:text-gray-700 p-2 hover:rounded-full"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 transition-all duration-200 ${
                        likedPosts.has(post.id)
                          ? "fill-[#3565FC] stroke-[#3565FC]"
                          : "fill-none"
                      }`}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="text-sm">
                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)} Likes
                    </span>
                  </button>
                </div>
                <button
                  onClick={() => handleSave(post.id)}
                  className={`transition-all duration-200 ${
                    savedPosts.has(post.id)
                      ? "text-[#3565FC] p-2 rounded-full"
                      : "text-gray-400 hover:text-[#3565FC] p-2 hover:rounded-full"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 transition-all duration-200 ${
                      savedPosts.has(post.id)
                        ? "fill-[#3565FC] stroke-[#3565FC]"
                        : "fill-none"
                    }`}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
              </div>
              {/* Comments Section - Now always rendered but controlled via max-height */}
              <div
                className={`
                  overflow-hidden 
                  transition-all duration-500 ease-in-out
                  ${
                    expandedComments.has(post.id)
                      ? "max-h-[1000px] opacity-100 mt-4 pt-4 border-t border-gray-100"
                      : "max-h-0 opacity-0 mt-0 pt-0 border-t-0"
                  }
                `}
                style={{
                  transitionProperty: "max-height, opacity, margin-top, padding-top, border-top-width",
                }}
              >
                {/* Existing Comments */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        JD
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        John Doe
                      </p>
                      <p className="text-sm text-gray-600">
                        Great post! Very helpful information.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        2 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        SM
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Sarah Miller
                      </p>
                      <p className="text-sm text-gray-600">
                        Thanks for sharing this! Looking forward to joining
                        the study group.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        5 minutes ago
                      </p>
                    </div>
                  </div>
                </div>

                {/* New Comment Input */}
                <div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                      <span className="text-xs font-medium text-gray-600">
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            handleCommentChange(post.id, e.target.value)
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSubmitComment(post.id);
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3565FC] focus:border-transparent"
                        />
                        <button
                          onClick={() => handleSubmitComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            commentInputs[post.id]?.trim()
                              ? "bg-[#3565FC] text-white hover:bg-[#2954d4]"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No posts found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardFeed;