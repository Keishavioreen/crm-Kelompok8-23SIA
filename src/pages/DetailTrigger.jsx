import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase"; // Pastikan file konfigurasi Supabase benar

const DetailTrigger = () => {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const [notification, setNotification] = useState(null); // State untuk menyimpan data
  const [loading, setLoading] = useState(true); // State untuk loading

  // Fungsi untuk mengambil data dari tabel campaign
  const fetchNotification = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("campaign")
        .select("judul, template_chat")
        .eq("id", id)
        .single(); // Mengambil data berdasarkan ID

      if (error) throw error;
      setNotification(data);
    } catch (error) {
      console.error("Error fetching notification:", error.message);
      setNotification(null); // Set null jika terjadi error
    } finally {
      setLoading(false);
    }
  };

  // Ambil data saat komponen dimuat
  useEffect(() => {
    fetchNotification();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600">Memuat...</h1>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-teal-600">{notification.judul}</h1>
          <p className="text-gray-600 mt-2">{notification.template_chat}</p>
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
