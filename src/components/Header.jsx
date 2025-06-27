import React from "react";
import { useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const generateBreadcrumb = () => {
    const path = location.pathname;
    const parts = path.split("/").filter(Boolean);
    if (parts.length === 0) return "Dashboard";
    return parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" / ");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-tosca shadow-sm border-b sticky top-0 z-10">
      {/* Breadcrumb */}
      <div className="text-sm text-white">
        Pages / <span className="font-semibold">{generateBreadcrumb()}</span>
      </div>

      {/* Search and Notification */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Type here..."
            className="px-4 py-2 pl-10 text-sm rounded-full focus:outline-none bg-white text-black border border-gray-300"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>

        {/* Notification Bell */}
        <Bell className="w-5 h-5 text-white cursor-pointer hover:text-tosca-100 transition" />
      </div>
    </header>
  );
};

export default Header;
