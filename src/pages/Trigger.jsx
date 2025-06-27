import React, { useState } from "react";
import { supabase } from "../supabase";

const Trigger = () => {
  const [formData, setFormData] = useState({
    judul: "",
    template_chat: "",
    segmentasi: "Silver", // Default value
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("campaign").insert({
        nama_campaign: "Default Campaign",
        judul: formData.judul,
        template_chat: formData.template_chat,
        jenis: "Personal", // Default value
        segmentasi: formData.segmentasi, // Pastikan sesuai constraint
        jadwal_pengiriman: new Date().toISOString(),
        status: "Aktif",
      });

      if (error) throw error;
      alert("Data berhasil ditambahkan ke tabel campaign!");
      setFormData({
        judul: "",
        template_chat: "",
        segmentasi: "Silver",
      });
    } catch (error) {
      console.error("Error adding data:", error.message);
      alert("Gagal menambahkan data. Silakan coba lagi.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="p-6 bg-white shadow">
        <h1 className="text-xl font-semibold text-gray-800">Automation</h1>
      </div>
      <div className="p-6">
        <form
          className="bg-white p-6 rounded shadow"
          onSubmit={handleSubmit}
        >
          {/* Judul */}
          <div className="mb-4">
            <label htmlFor="event-name" className="block text-sm font-medium text-gray-700">
              Nama Event
            </label>
            <input
              type="text"
              id="event-name"
              name="judul"
              value={formData.judul}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-tosca focus:border-tosca"
              placeholder="Event Ulang Tahun"
              required
            />
          </div>

          {/* Template Chat */}
          <div className="mb-6">
            <label htmlFor="template-chat" className="block text-sm font-medium text-gray-700">
              Template Chat
            </label>
            <textarea
              id="template-chat"
              name="template_chat"
              rows="6"
              value={formData.template_chat}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-tosca focus:border-tosca"
              placeholder="Selamat Ulang Tahun, [Nama Pelanggan]! 🎉\n\nHalo [Nama Pelanggan],\nSelamat Ulang Tahun! 🎉 Kami dari Apotek [Nama Apotek] ingin mengucapkan selamat ulang tahun dan semoga Anda selalu sehat, bahagia, dan sukses."
              required
            ></textarea>
          </div>

   
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-tosca text-white rounded-md hover:bg-tosca-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tosca"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Trigger;
