import React, { useState } from "react";
import { useAnalytics } from "../context/AnalyticsContext";

export default function KelolaAnalytics() {
  const { analyticsData, addRecord, deleteRecord, updateRecord } = useAnalytics();

  const [formData, setFormData] = useState({
    rating: "",
    responseTime: "",
    complaintsResolved: "",
    month: ""
  });

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.month || !formData.rating || !formData.responseTime || !formData.complaintsResolved) {
      alert("Harap isi semua field!");
      return;
    }

    const newRecord = {
      ...formData,
      rating: Number(formData.rating),
      complaintsResolved: Number(formData.complaintsResolved),
      id: editingId ?? Date.now()
    };

    if (editingId) {
      updateRecord(newRecord);
    } else {
      addRecord(newRecord);
    }

    // Reset form
    setFormData({
      rating: "",
      responseTime: "",
      complaintsResolved: "",
      month: ""
    });
    setEditingId(null);
  };

  const handleEdit = (record) => {
    setFormData({
      rating: record.rating,
      responseTime: record.responseTime,
      complaintsResolved: record.complaintsResolved,
      month: record.month
    });
    setEditingId(record.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      deleteRecord(id);
    }
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
          {editingId ? "Simpan Perubahan" : "Tambah Data"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6">Data Saat Ini</h2>
      <ul className="mt-2 space-y-2">
        {analyticsData.map((item) => (
          <li key={item.id} className="bg-gray-100 p-3 rounded flex justify-between items-start gap-4">
            <div className="text-sm">
              <p><strong>Bulan:</strong> {item.month}</p>
              <p><strong>Rating:</strong> {item.rating}</p>
              <p><strong>Waktu Respon:</strong> {item.responseTime}</p>
              <p><strong>Keluhan Terselesaikan:</strong> {item.complaintsResolved}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 hover:underline text-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:underline text-sm"
              >
                🗑️ Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
