import React, { useState } from "react";
import { supabase } from "../supabase"; // Pastikan import sudah benar

const TambahCampaign = () => {
  const [formData, setFormData] = useState({
    nama_campaign: "",
    jenis: "Personal",
    segmentasi: [], // Sesuai tabel
    jadwal_pengiriman: "",
    status: "Aktif",
    judul: "",
    template_chat: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      segmentasi: checked
        ? [...prev.segmentasi, value]
        : prev.segmentasi.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("campaign").insert({
        nama_campaign: formData.nama_campaign,
        jenis: formData.jenis,
        segmentasi: formData.segmentasi.join(", "), // Gabungkan array menjadi string
        jadwal_pengiriman: formData.jadwal_pengiriman,
        status: formData.status,
        judul: formData.judul,
        template_chat: formData.template_chat,
      });

      if (error) throw error;
      alert("Campaign berhasil ditambahkan!");
      setFormData({
        nama_campaign: "",
        jenis: "Personal",
        segmentasi: [],
        jadwal_pengiriman: "",
        status: "Aktif",
         judul: "",
        template_chat: "",
      });
    } catch (error) {
      console.error("Error adding campaign:", error.message);
      alert("Gagal menambahkan campaign. Silakan coba lagi.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Tambah Campaign</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
        onSubmit={handleSubmit}
      >
        {/* Nama Campaign */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama Campaign
          </label>
          <input
            type="text"
            name="nama_campaign"
            value={formData.nama_campaign}
            onChange={handleInputChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* jenis */}
        <div>
          <label className="block text-sm font-medium text-gray-700">jenis</label>
          <select
            name="jenis"
            value={formData.jenis}
            onChange={handleInputChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
            required
          >
            <option value="Personal">Personal</option>
            <option value="Promosi">Promosi</option>
          </select>
        </div>

        {/* segmentasi */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            segmentasi
          </label>
          <div className="flex items-center gap-4 mt-2">
            {["Silver", "Gold", "Platinum","Select All"].map((segment) => (
              <label key={segment} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={segment}
                  checked={formData.segmentasi.includes(segment)}
                  onChange={handleCheckboxChange}
                />
                {segment}
              </label>
            ))}
          </div>
        </div>

        {/* Jadwal Pengiriman */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Jadwal Pengiriman
          </label>
          <input
            type="datetime-local"
            name="jadwal_pengiriman"
            value={formData.jadwal_pengiriman}
            onChange={handleInputChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg"
            required
          >
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </div>

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
        <div>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600"
            href="/Campaign"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahCampaign;
