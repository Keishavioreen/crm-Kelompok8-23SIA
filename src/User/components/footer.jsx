import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#67A8D5] text-white pt-10 pb-6">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo dan Deskripsi */}
        <div className="space-y-4">
          <div className="w-40">
            {/* Ganti dengan logo SVG kamu */}
            <svg width="408" height="248" viewBox="0 0 408 248" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG asli di sini */}
              <circle cx="50" cy="50" r="40" fill="#fff" />
            </svg>
          </div>
          <p className="text-sm">Century - Politeknik Caltex Riau</p>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">
              <FaLinkedinIn size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Siapa Kami */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Siapa Kami</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/tentang" className="hover:underline hover:text-gray-200 transition">Tentang Century</a></li>
            <li><a href="/kontak" className="hover:underline hover:text-gray-200 transition">Kontak Kami</a></li>
            <li><a href="/berita" className="hover:underline hover:text-gray-200 transition">Berita Terbaru</a></li>
            <li><a href="/lokasi" className="hover:underline hover:text-gray-200 transition">Lokasi Toko</a></li>
          </ul>
        </div>

        {/* Kebijakan Kami */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Kebijakan Kami</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/refund" className="hover:underline hover:text-gray-200 transition">Kebijakan Pengembalian Dana</a></li>
            <li><a href="/pengiriman" className="hover:underline hover:text-gray-200 transition">Ketentuan Pengiriman</a></li>
            <li><a href="/privasi" className="hover:underline hover:text-gray-200 transition">Kebijakan Privasi</a></li>
            <li><a href="/syarat" className="hover:underline hover:text-gray-200 transition">Syarat &amp; Ketentuan</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white opacity-50 mt-8"></div>

      <p className="text-center text-sm mt-4 opacity-90">
        © 2025 <a href="/" className="hover:underline">Century</a>. All Rights Reserved.
      </p>
    </footer>
  );
}
