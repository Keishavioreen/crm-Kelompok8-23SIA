import React from "react";
import { useParams } from "react-router-dom";

const notifications = [
  { 
    id: "1", 
    title: "Selamat Bergabung!", 
    message: "Halo! Selamat bergabung di platform kami. Sebagai hadiah selamat datang, nikmati diskon spesial untuk pembelian pertama Anda. Yuk, mulai belanja sekarang!" 
  },
  { 
    id: "2", 
    title: "Selamat Ulang Tahun!", 
    message: "Happy Birthday! Di hari istimewa ini, kami memberikan voucher spesial senilai Rp 50.000 untuk Anda. Gunakan kode: ULTAH50 saat checkout. Berlaku hingga hari ini!" 
  },
  { 
    id: "3", 
    title: "Produk Baru!", 
    message: "Kabar baik! Produk-produk terbaru kami sudah tersedia. Ayo cek koleksi kami dan temukan apa yang Anda butuhkan dengan promo menarik!" 
  },
  { 
    id: "4", 
    title: "Voucher Eksklusif!", 
    message: "Spesial untuk Anda! Belanja minimal Rp 50.000 dan dapatkan voucher Rp 10.000 yang bisa digunakan untuk semua produk. Gunakan kode: VOUCHER10 sebelum checkout. Jangan sampai ketinggalan, ya!" 
  },
  { 
    id: "5", 
    title: "Promo Akhir Bulan!", 
    message: "Hore! Nikmati diskon hingga 30% untuk kategori favorit Anda. Buruan sebelum kehabisan, karena promo hanya berlaku hingga akhir bulan ini!" 
  },
  { 
    id: "6", 
    title: "Flash Sale!", 
    message: "Waktunya belanja hemat! Flash sale hari ini hanya berlangsung selama 24 jam. Jangan lewatkan penawaran terbatas kami dengan harga terbaik." 
  }
];

const DetailTrigger = () => {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const notification = notifications.find((notif) => notif.id === id);

  if (!notification) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Notifikasi Tidak Ditemukan</h1>
          <p className="text-gray-600 mt-4">Maaf, notifikasi yang Anda cari tidak tersedia.</p>
          <a href="/" className="mt-6 inline-block text-teal-600 hover:underline">
            Kembali ke Beranda
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-150 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-teal-600">{notification.title}</h1>
          <p className="text-gray-600 mt-2">{notification.message}</p>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => alert("Voucher berhasil disalin!")}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 transition-all duration-200"
          >
            Salin Kode Voucher
          </button>
          <a
            href="/Produk"
            className="text-teal-600 hover:text-teal-800 underline text-sm"
          >
            Lihat Produk Kami
          </a>
        </div>

       
      </div>
    </div>
  );
};

export default DetailTrigger;
