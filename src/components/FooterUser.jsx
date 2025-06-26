import React from "react";

const FooterUser = () => {
  return (
    <footer className="bg-teal-600 text-white py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <img
            className="mb-4 w-32"
           src="/logo2.png" // Let Vite handle public folder asset
              alt="logo"
          />
          <p className="text-center md:text-left text-sm">Century - Politeknik Caltex Riau</p>
         
        </div>

        {/* Siapa Kami Section */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4">Tentang Kami</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Tentang Century</a></li>
            <li><a href="#" className="hover:underline">Kontak Kami</a></li>
            <li><a href="#" className="hover:underline">Berita Terbaru</a></li>
            <li><a href="#" className="hover:underline">Lokasi Toko</a></li>
          </ul>
        </div>

        {/* Kebijakan Kami Section */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4">Kebijakan Kami</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Kebijakan Pengembalian Dana</a></li>
            <li><a href="#" className="hover:underline">Ketentuan Pengiriman</a></li>
            <li><a href="#" className="hover:underline">Kebijakan Privasi</a></li>
            <li><a href="#" className="hover:underline">Syarat & Kondisi</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-teal-500 mt-8 pt-4 text-center">
        <p className="text-sm">&copy; 2025 Century. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default FooterUser;
