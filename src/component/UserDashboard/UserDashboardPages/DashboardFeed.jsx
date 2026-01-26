"use client";
import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import {
  useShowFeedDataQuery,
  useShowListFeedDataQuery,
} from "../../../redux/features/baseApi";

function DashboardFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [showAll, setShowAll] = useState(false);

  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [expandedPosts, setExpandedPosts] = useState(new Set());
  const [commentInputs, setCommentInputs] = useState({});

  const { data: categoryData = {}, isLoading: catLoading } =
    useShowListFeedDataQuery();
  const { data: feedResponse = {}, isLoading: postLoading } =
    useShowFeedDataQuery();
  const VISIBLE_COUNT = 10;

  const categories = useMemo(() => {
    const categoryList = categoryData?.results || [];

    const catNames = Array.isArray(categoryList)
      ? categoryList.map((cat) => cat?.name).filter(Boolean)
      : [];

    return ["All categories", ...catNames];
  }, [categoryData]);

  const convertSourcesToLinks = (text = "") => {
    return text.replace(
      /source:\s*(https?:\/\/[^\s]+)/gi,
      (match, url) => `[source: ${url}](${url})`,
    );
  };

  const posts = useMemo(() => {
    const rawPosts = feedResponse?.results || [];

    return rawPosts.map((post) => ({
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

  const visibleCategories = showAll
    ? categories
    : categories.slice(0, VISIBLE_COUNT);

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
          <div className="flex  justify-between">
            <div className="flex flex-wrap gap-3">
              {visibleCategories.map((category) => (
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

            <div>
              {/* See All Button */}
              {categories.length > VISIBLE_COUNT && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="rounded-full cursor-pointer text-sm font-medium text-blue-600 whitespace-nowrap"
                >
                  {showAll ? "Show Less..." : "See All..."}
                </button>
              )}
            </div>
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
                      <div className="text-gray-700 leading-relaxed text-sm prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            h1: ({ node, ...props }) => (
                              <h1
                                className="text-2xl font-bold my-3 text-gray-900"
                                {...props}
                              />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2
                                className="text-xl font-bold my-2.5 text-gray-900"
                                {...props}
                              />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3
                                className="text-lg font-bold my-2 text-gray-900"
                                {...props}
                              />
                            ),
                            p: ({ node, ...props }) => (
                              <p className="my-2 text-gray-700" {...props} />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul
                                className="list-disc list-inside my-2 text-gray-700 space-y-1"
                                {...props}
                              />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol
                                className="list-decimal list-inside my-2 text-gray-700 space-y-1"
                                {...props}
                              />
                            ),
                            li: ({ node, ...props }) => (
                              <li className="text-gray-700" {...props} />
                            ),
                            a: ({ node, ...props }) => (
                              <a
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                              />
                            ),
                            a: ({ node, ...props }) => (
                              <a
                                {...props}
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            ),
                            code: ({ node, inline, ...props }) =>
                              inline ? (
                                <code
                                  className="bg-gray-100 px-2 py-1 rounded text-red-600 font-mono text-xs"
                                  {...props}
                                />
                              ) : (
                                <code
                                  className="bg-gray-100 p-3 rounded block my-2 text-gray-800 font-mono text-xs overflow-x-auto"
                                  {...props}
                                />
                              ),
                            blockquote: ({ node, ...props }) => (
                              <blockquote
                                className="border-l-4 border-gray-300 pl-4 my-2 italic text-gray-600"
                                {...props}
                              />
                            ),
                            hr: ({ node, ...props }) => (
                              <hr className="my-3 border-gray-300" {...props} />
                            ),
                          }}
                        >
                          {convertSourcesToLinks(
                            expandedPosts.has(post.id)
                              ? post.fullContent
                              : post.content,
                          )}
                        </ReactMarkdown>
                      </div>
                      {post.fullContent.length > 200 && (
                        <button
                          onClick={() => handleReadMore(post.id)}
                          className="text-blue-600 font-medium mt-3 hover:underline"
                        >
                          {expandedPosts.has(post.id)
                            ? "Show less"
                            : "Read more"}
                        </button>
                      )}
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
