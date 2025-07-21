import React, { useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PrediksiLoyalitas = () => {
  const [formData, setFormData] = useState({
    nama: "",
    point: "",
    history_transaksi: "",
    total_belanja: "",
    frekuensi_kunjungan: "",
  });

  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trimStart() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://0a2812bf2e16.ngrok-free.app/predict", {
        ...formData,
        point: parseInt(formData.point),
        history_transaksi: parseInt(formData.history_transaksi),
        total_belanja: parseInt(formData.total_belanja),
        frekuensi_kunjungan: parseInt(formData.frekuensi_kunjungan),
      });
      setHasil(response.data);
    } catch (error) {
      console.error("Gagal mendapatkan data:", error);
      setHasil(null);
    } finally {
      setLoading(false);
    }
  };

  // Pie Chart Data
  const dataPie = hasil?.klasifikasi // sebelumnya: hasil?.classification_report
  ? Object.entries(hasil.klasifikasi)
      .filter(([key]) => !["accuracy", "macro avg", "weighted avg"].includes(key))
      .map(([key, value]) => ({
        name: key,
        value: value.support,
      }))
  : [];


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#007676]">
        Prediksi Loyalitas Pelanggan
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 bg-white p-6 rounded shadow">
        <input type="text" name="nama" value={formData.nama} placeholder="Nama Pelanggan" onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="point" value={formData.point} placeholder="Point" onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="history_transaksi" value={formData.history_transaksi} placeholder="History Transaksi" onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="total_belanja" value={formData.total_belanja} placeholder="Total Belanja (Rp)" onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="frekuensi_kunjungan" value={formData.frekuensi_kunjungan} placeholder="Frekuensi Kunjungan" onChange={handleChange} required className="border p-2 rounded" />
        <button type="submit" disabled={loading} className="py-2 px-4 rounded transition text-white bg-[#007676]">
          {loading ? "Memproses..." : "Prediksi Sekarang"}
        </button>
      </form>

      {hasil && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-[#007676] mb-2">Hasil Prediksi</h2>
          <div className="p-4 bg-white border rounded shadow mb-4">
            <p><strong>Nama:</strong> {hasil.nama}</p>
            <p><strong>Status Loyalitas:</strong> {hasil.status_loyalitas}</p>
            <p><strong>Akurasi Model:</strong> {hasil.akurasi_model}%</p>
          </div>

          {dataPie.length > 0 && (
            <div className="mt-6 bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-4 text-center">Distribusi Support per Kelas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={300}>
                  <Pie
                    data={dataPie}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {dataPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {hasil === null && !loading && (
        <div className="mt-4 text-red-600 font-medium">
          Gagal mendapatkan prediksi. Periksa input dan koneksi server.
        </div>
      )}
    </div>
  );
};

export default PrediksiLoyalitas;
