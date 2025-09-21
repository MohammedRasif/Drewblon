"use client"

import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import UserDashboardSidebar from "../UserDashboardSidebar/UserDashboardSidebar"
import UserDashboardNavbar from "../UserDashboardNavbar/UserDashboardNavbar"

const UserDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Initial check
    checkIfMobile()

    // Set sidebar closed by default on mobile
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen relative">
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#FAFAFA]   p-2 rounded-md"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-[#FAFAFA] bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`bg-[#FAFAFA]  h-full fixed z-50 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full lg:translate-x-0 lg:w-16"
        }`}
      >
        <div className="h-full flex flex-col justify-between overflow-hidden">
          {/* Sidebar Content */}
          <UserDashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-col w-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-72" : "lg:ml-16"
        }`}
      >
        {/* Navbar - Fixed & Only Navbar BG White */}
        <div
          className="fixed top-0 z-30  bg-[#FAFAFA]  w-full  "
          style={{
            left: isMobile ? "0" : isSidebarOpen ? "288px" : "64px",
            width: isMobile ? "100%" : isSidebarOpen ? "calc(100% - 288px)" : "calc(100% - 64px)",
            paddingLeft: isMobile ? "60px" : "0", // Add padding for mobile menu button
          }}
        >
          <UserDashboardNavbar />
        </div>

        {/* Outlet (Main Content) */}
        <div className="h-full pt-16 overflow-auto bg-[#FAFAFA] ">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default UserDashboardLayout
