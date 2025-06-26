import React from "react";
import { useLocation } from "react-router-dom";
import { Search, User } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const generateBreadcrumb = () => {
    const path = location.pathname;
    const parts = path.split("/").filter(Boolean); // Pisahkan dan buang bagian kosong
    if (parts.length === 0) return "Dashboard"; // Jika root, beri nama "Dashboard"
    return parts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalize setiap bagian
      .join(" / "); // Gabungkan dengan pemisah
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b sticky top-0 z-10 ">
      <div className="text-sm text-gray-500">
        Pages / <span className="text-gray-900 font-semibold">{generateBreadcrumb()}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Type here..."
            className="px-4 py-2 pl-10 text-sm border rounded-full focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        <div className="flex items-center gap-2 text-sm cursor-pointer text-gray-700 hover:text-purple-700">
          <User className="w-4 h-4" />
          Sign In
        </div>
      </div>
    </header>
  );
};

export default Header;
