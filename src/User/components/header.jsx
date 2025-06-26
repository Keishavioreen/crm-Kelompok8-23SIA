// src/components/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell, ShoppingCart, User } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full shadow-md">
      {/* Top section */}
      <div className="bg-white flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-[#00838f] flex items-center space-x-2">
          <img src="/logo-century.png" alt="Century Logo" className="h-8" />
          <span>Century</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-6 max-w-xl">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full px-5 py-2 rounded-full border text-sm focus:outline-none"
          />
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-4 text-[#0277bd]">
          <Bell className="w-5 h-5" />
          <div className="text-sm">EN ▼</div>
          <User className="w-5 h-5" />
          <span className="text-sm hidden sm:inline">Akun</span>

          {/* Hamburger Menu for Mobile */}
          <button onClick={toggleMenu} className="sm:hidden">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#00838f] text-white px-6 sm:flex justify-between items-center py-2 hidden">
        <div className="flex space-x-6 font-medium text-sm">
          <Link to="/" className="hover:text-[#4dd0e1] transition">Home</Link>
          <Link to="/produk" className="hover:text-[#4dd0e1] transition">Produk</Link>
          <Link to="/faq" className="hover:text-[#4dd0e1] transition">FAQ</Link>
          <Link to="/tentang-kami" className="hover:text-[#4dd0e1] transition">Tentang Kami</Link>
          <Link to="/kontak" className="hover:text-[#4dd0e1] transition">Kontak</Link>
        </div>
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5" />
          <Link to="/keranjang" className="hover:text-[#4dd0e1] text-sm">Keranjang</Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-[#00838f] text-white px-6 py-3 sm:hidden space-y-2 text-sm">
          <Link to="/" className="block hover:text-[#4dd0e1]">Home</Link>
          <Link to="/produk" className="block hover:text-[#4dd0e1]">Produk</Link>
          <Link to="/faq" className="block hover:text-[#4dd0e1]">FAQ</Link>
          <Link to="/tentang-kami" className="block hover:text-[#4dd0e1]">Tentang Kami</Link>
          <Link to="/kontak" className="block hover:text-[#4dd0e1]">Kontak</Link>
          <Link to="/keranjang" className="block hover:text-[#4dd0e1]">🛒 Keranjang</Link>
        </div>
      )}
    </header>
  );
}
