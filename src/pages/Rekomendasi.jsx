import React, { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Rekomendasi = () => {
  const [formData, setFormData] = useState({
    usia: "",
    jenis_kelamin: "",
    gejala: "",
    durasi_gejala: "",
    tingkat_keparahan: "",
    alergi_obat: "",
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
      const payload = {
        Usia: parseInt(formData.usia, 10),
        Jenis_Kelamin: formData.jenis_kelamin,
        Gejala: formData.gejala,
        Durasi_Gejala: formData.durasi_gejala,
        Tingkat_Keparahan: formData.tingkat_keparahan,
        Riwayat_Alergi: formData.alergi_obat,
      };
      const response = await axios.post(
        "https://44d61c20df6a.ngrok-free.app/predict",
        payload
      );
      setHasil(response.data);
    } catch (error) {
      setHasil(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center" style={{ color: "#007676" }}>
        Rekomendasi Obat
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 bg-white p-6 rounded shadow">
        <input type="number" name="usia" value={formData.usia} placeholder="Usia" onChange={handleChange} required className="border p-2 rounded" />
        <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Pilih Jenis Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
        <select name="gejala" value={formData.gejala} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Pilih Gejala</option>
          <option value="Batuk, Sesak Napas">Batuk, Sesak Napas</option>
          <option value="Demam, Sakit Kepala">Demam, Sakit Kepala</option>
          <option value="Gatal, Ruam Kulit">Gatal, Ruam Kulit</option>
          <option value="Nyeri Otot, Kelelahan">Nyeri Otot, Kelelahan</option>
          <option value="Sering Haus, Sering Buang Air">Sering Haus, Sering Buang Air</option>
        </select>
        <select name="durasi_gejala" value={formData.durasi_gejala} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Durasi Gejala</option>
          <option value="1-3 hari">1-3 hari</option>
          <option value="4-7 hari">4-7 hari</option>
          <option value="<1 hari">&lt;1 hari</option>
          <option value=">7 hari">&gt;7 hari</option>
        </select>
        <select name="tingkat_keparahan" value={formData.tingkat_keparahan} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Tingkat Keparahan</option>
          <option value="Ringan">Ringan</option>
          <option value="Sedang">Sedang</option>
          <option value="Berat">Berat</option>
        </select>
        <select name="alergi_obat" value={formData.alergi_obat} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Riwayat Alergi Obat</option>
          <option value="Ya">Ya</option>
          <option value="Tidak">Tidak</option>
        </select>
        <button type="submit" disabled={loading} className="py-2 px-4 rounded transition text-white" style={{ backgroundColor: "#007676" }}>
          {loading ? "Memproses..." : "Dapatkan Rekomendasi"}
        </button>
      </form>

      {/* Tampilkan Hasil Rekomendasi */}
      {hasil && hasil.rekomendasi_obat && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "#007676" }}>
            Rekomendasi Obat Utama
          </h2>
          <div className="border rounded shadow p-4 bg-white mb-4">
            <h3 className="text-lg font-bold mb-2" style={{ color: "#007676" }}>
              {hasil.rekomendasi_obat}
            </h3>
          </div>
          {/* Pie Chart Top 3 */}
          {hasil.top_3 && (
            <div className="my-8">
              <h3 className="text-lg font-semibold mb-2">
                Proporsi Probabilitas 3 Obat Teratas
              </h3>
              <Pie
                data={{
                  labels: hasil.top_3.map((item) => item.obat),
                  datasets: [
                    {
                      data: hasil.top_3.map((item) => item.probabilitas),
                      backgroundColor: ["#007676", "#2bbbad", "#b2dfdb"],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: { position: "bottom" },
                  },
                }}
              />
              <ul className="mt-4">
                {hasil.top_3.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.obat}:</strong> {parseFloat(item.probabilitas).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Penjelasan Sistem */}
          {hasil.explanation && (
            <div className="mb-4 p-4 bg-blue-100 border rounded">
              <strong>Penjelasan Sistem:</strong> {hasil.explanation}
            </div>
          )}
          {/* Detail Obat */}
          {hasil.detail && (
            <div className="bg-green-100 border rounded p-4">
              <h3 className="font-semibold mb-2" style={{ color: "#007676" }}>
                Detail Obat
              </h3>
              <p><strong>Deskripsi:</strong> {hasil.detail.deskripsi}</p>
              <p><strong>Dosis:</strong> {hasil.detail.dosis}</p>
              <p><strong>Efek Samping:</strong> {hasil.detail.efek_samping}</p>
            </div>
          )}
        </div>
      )}

      {/* ERROR handling */}
      {hasil === null && !loading && (
        <div className="mt-4 text-red-600 font-medium">
          Gagal mendapatkan rekomendasi. Pastikan semua data valid dan sesuai!
        </div>
      )}
    </div>
  );
};

export default Rekomendasi;
