import React, { useState } from "react";
import { useAnalytics } from "../context/AnalyticsContext";

export default function KelolaAnalytics() {
  const { analyticsData, addRecord, deleteRecord } = useAnalytics();

  const [formData, setFormData] = useState({
    rating: "",
    responseTime: "",
    complaintsResolved: "",
    month: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecord(formData);
    setFormData({
      rating: "",
      responseTime: "",
      complaintsResolved: "",
      month: ""
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kelola Data Analytics</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          name="month"
          placeholder="Bulan (ex: Juni)"
          value={formData.month}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating Layanan (1-5)"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="responseTime"
          placeholder="Waktu Tanggapan (ex: 20 menit)"
          value={formData.responseTime}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="complaintsResolved"
          placeholder="Jumlah Keluhan Terselesaikan"
          value={formData.complaintsResolved}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Tambah Data
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6">Data Saat Ini</h2>
      <ul className="mt-2 space-y-2">
        {analyticsData.map((item) => (
          <li key={item.id} className="bg-gray-100 p-3 rounded flex justify-between">
            <div>
              <p><strong>Bulan:</strong> {item.month}</p>
              <p><strong>Rating:</strong> {item.rating}</p>
              <p><strong>Waktu Respon:</strong> {item.responseTime}</p>
              <p><strong>Keluhan Terselesaikan:</strong> {item.complaintsResolved}</p>
            </div>
            <button
              onClick={() => deleteRecord(item.id)}
              className="text-red-500 hover:underline"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
