"use client";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useShowVideoCategoryQuery } from "../../../redux/features/baseApi";

const DashboardVideoCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: videoCategory, isLoading } = useShowVideoCategoryQuery();
  const baseUrl = "https://noncircuitous-lauryn-pseudosocialistic.ngrok-free.dev";
  if (isLoading) {
    return (
      <div className="w-full bg-background p-8">
        <div className="container mx-auto">
          <div className="h-10 w-48 bg-gray-200 animate-pulse rounded mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="min-h-[240px] bg-gray-200 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background p-8">
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .category-card {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .category-card:nth-child(1) { animation-delay: 0.1s; }
        .category-card:nth-child(2) { animation-delay: 0.2s; }
        .category-card:nth-child(3) { animation-delay: 0.3s; }
        .category-card:nth-child(4) { animation-delay: 0.4s; }
        .category-card:nth-child(5) { animation-delay: 0.5s; }
        .category-card:nth-child(6) { animation-delay: 0.6s; }
        .category-card:nth-child(7) { animation-delay: 0.7s; }
        .category-card:nth-child(8) { animation-delay: 0.8s; }
      `}</style>

      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Video Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {videoCategory?.map((category) => (
            <NavLink
              key={category.id}
              to={`/dashboard/video/${category.id}`}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                category-card
                group relative overflow-hidden rounded-2xl cursor-pointer block
                transition-all duration-500 transform hover:scale-110 hover:-translate-y-2
                ${
                  selectedCategory === category.id
                    ? "ring-4 ring-blue-500 shadow-2xl shadow-blue-500/50"
                    : "shadow-lg hover:shadow-2xl"
                }
              `}
            >
              <div
                className="p-8 min-h-[240px] flex flex-col justify-end relative"
                style={{
                  backgroundImage: category.thumbnail
                    ? `url(${baseUrl}${category.thumbnail})`
                    : `url('https://images.unsplash.com/photo-1485579149c0-123123123?w=500&h=300&fit=crop')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500"></div>

                {/* Category Name */}
                <h3 className="text-2xl font-bold text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                  {category.name}
                </h3>

                {/* Topics Count */}
                <p className="text-sm text-white/80 relative z-10 mt-2">
                  {category.topics_count} topics
                </p>
              </div>

              {/* Enhanced Hover Shine Effect */}
              <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25 transition-transform duration-700 skew-x-12"></div>

              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardVideoCategory;
