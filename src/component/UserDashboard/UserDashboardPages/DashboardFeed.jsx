"use client";
import { useState, useMemo } from "react";
import {
  useShowFeedDataQuery,
  useShowListFeedDataQuery,
} from "../../../redux/features/baseApi";

function DashboardFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [expandedPosts, setExpandedPosts] = useState(new Set());
  const [commentInputs, setCommentInputs] = useState({});

  const { data: categoryData = [], isLoading: catLoading } =
    useShowListFeedDataQuery();
  const { data: feedResponse = {}, isLoading: postLoading } =
    useShowFeedDataQuery();

  const categories = useMemo(() => {
    const cats = Array.isArray(categoryData) ? categoryData : [];

    const catNames = cats
      .map((cat) => cat?.name) 
      .filter(Boolean); 

    return ["All categories", ...catNames];
  }, [categoryData]);

  const posts = useMemo(() => {
    const results = Array.isArray(feedResponse?.results)
      ? feedResponse.results
      : [];

    return results.map((post) => ({
      id: post.id,
      author: post.author_name,
      role: post.author_title || "Member",
      timeAgo: post.time_ago,
      title: post.title,
      content:
        post.content?.length > 200
          ? post.content.substring(0, 200) + "..."
          : post.content || "",
      fullContent: post.content || "",
      category: post.category_name || "Uncategorized",
      categoryId: post.category,
      comments: post.comment_count || 0,
      likes: post.like_count || 0,
      hasImage: post.images?.length > 0 && !!post.images[0]?.image,
      image: post.images?.[0]?.image || null,
      videos: post.videos || [],
      files: post.files || [],
      isLiked: post.is_liked || false,
    }));
  }, [feedResponse]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All categories" ||
        post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  const handleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });
  };

  const handleSave = (postId) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
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
        setCommentInputs((prev) => ({ ...prev, [postId]: prev[postId] || "" }));
      }
      return newSet;
    });
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleSubmitComment = (postId) => {
    if (commentInputs[postId]?.trim()) {
      console.log("New comment:", commentInputs[postId]);
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    }
  };

  const handleReadMore = (postId) => {
    setExpandedPosts((prev) => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });
  };

  if (catLoading || postLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-blue-600"></div>
        </div>
        <p className="ml-6 text-lg text-gray-600 font-medium">
          Loading feed...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pr-5 pb-10 min-h-screen">
      <div className="container mx-auto ">
        {/* Search Bar */}
        <div className="relative mb-6 mt-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 pr-12 bg-white border border-gray-200 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute right-5 top-1/2 -translate-y-1/2"
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

        {/* Category Filters */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No posts found for "
              {selectedCategory === "All categories"
                ? "your search"
                : selectedCategory}
              "
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {post.author}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {post.role} • {post.timeAgo}
                        </p>
                      </div>
                      <div className="space-x-3">
                        {post.videos?.length > 0 && (
                          <a
                            href={post.videos[0].video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-1.5 bg-green-600 text-gray-100 text-xs font-medium rounded-full hover:bg-green-700 transition-colors cursor-pointer"
                          >
                            Video
                          </a>
                        )}

                        {post.files?.length > 0 && (
                          <a
                            href={post.files[0].file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-1.5 bg-green-600 text-gray-100 text-xs font-medium rounded-full hover:bg-green-700 transition-colors cursor-pointer"
                          >
                            File (
                            {post.files[0].file_name
                              ?.split(".")
                              .pop()
                              ?.toUpperCase() || "File"}
                            )
                          </a>
                        )}
                      </div>
                    </div>

                    <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post Body */}
                <div className="px-6 pb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h2>

                  <div className="flex gap-6">
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {expandedPosts.has(post.id)
                          ? post.fullContent
                          : post.content}
                        {post.fullContent.length > 200 && (
                          <button
                            onClick={() => handleReadMore(post.id)}
                            className="text-blue-600 font-medium ml-2 hover:underline"
                          >
                            {expandedPosts.has(post.id)
                              ? "Show less"
                              : "Read more"}
                          </button>
                        )}
                      </p>
                    </div>
                    {post.hasImage && (
                      <div className="flex-shrink-0">
                        <img
                          src={post.image}
                          alt="post"
                          className="w-48 h-40 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Comments Section */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    expandedComments.has(post.id)
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 py-4 border-t border-gray-100 space-y-4">
                    <div className="text-sm text-gray-500 italic">
                      No comments yet. Be the first!
                    </div>

                    <div className="flex gap-3 mt-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 flex gap-3">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            handleCommentChange(post.id, e.target.value)
                          }
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSubmitComment(post.id)
                          }
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleSubmitComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                          className={`px-6 py-2 rounded-full font-medium transition ${
                            commentInputs[post.id]?.trim()
                              ? "bg-blue-600 text-white hover:bg-blue-700"
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardFeed;
