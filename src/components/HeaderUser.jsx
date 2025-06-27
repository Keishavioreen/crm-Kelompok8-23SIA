import React from "react";

const HeaderUser = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Layer 1: Logo, Search Bar, Akun, Keranjang */}
      <div className="py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              className="block w-32 h-auto"
              src="/logo2.png" // Let Vite handle public folder asset
              alt="logo"
            />
          </div>

          {/* Search Bar */}
          <div className="flex-grow mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products"
                className="w-full py-2 px-4 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 11a4 4 0 100-8 4 4 0 000 8zm2 4h5l5 5"
                />
              </svg>
            </div>
          </div>

          {/* Akun dan Keranjang */}
          <div className="flex items-center space-x-4">
            {/* Keranjang */}
            <a href="/Keranjang" className="text-gray-900 hover:text-blue-600 transition flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="ml-2">Keranjang</span>
            </a>
             {/* Akun */}
            <a href="/Akun" className="text-gray-900 hover:text-blue-600 transition">
              Akun
            </a>
          </div>
        </div>
      </div>

      {/* Layer 2: Produk, Tentang Kami, Kontak */}
      <div className="bg-teal-600 py-3">
        <div className="max-w-7xl mx-auto flex justify-center space-x-8 text-white">
          <a href="#" className="hover:text-blue-300 transition">
            Home
          </a>
          <a href="#" className="hover:text-blue-300 transition">
            Produk
          </a>
          <a href="/TentangKami" className="hover:text-blue-300 transition">
          </a>
          <a href="/Produk" className="hover:text-blue-300 transition">
            Produk
          </a>
          <a href="/FaqUser" className="hover:text-blue-300 transition">
            FAQ
          </a>
          <a href="#" className="hover:text-blue-300 transition">
            Tentang Kami
          </a>
          <a href="/Kontak" className="hover:text-blue-300 transition">
            Kontak
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
