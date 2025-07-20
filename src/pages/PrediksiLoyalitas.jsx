import React, { useState } from 'react';

const PrediksiLoyalitas = () => {
  const [formData, setFormData] = useState({
    nama_pelanggan: '',
    point: '',
    history_transaksi: '',
    total_belanja: '',
    frekuensi_kunjungan: '',
  });
  const [hasilPrediksi, setHasilPrediksi] = useState(null);
  const [errorPrediksi, setErrorPrediksi] = useState('');
  const [reportImg, setReportImg] = useState(null);
  const [errorImg, setErrorImg] = useState('');

  const backendURL = 'https://006dd5f418a2.ngrok-free.app'; // Ganti sesuai ngrok aktif

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Point: Number(formData.point) || 0,
      History_Transaksi: Number(formData.history_transaksi) || 0,
      Total_Belanja: Number(formData.total_belanja) || 0,
      Frekuensi_Kunjungan: Number(formData.frekuensi_kunjungan) || 0,
    };

    try {
      const response = await fetch(`${backendURL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setHasilPrediksi(data.Status_Loyalitas);
        setErrorPrediksi('');
        setReportImg(`${backendURL}/grafik`);
        setErrorImg('');
      } else {
        setHasilPrediksi(null);
        setErrorPrediksi(data.error || 'Kesalahan saat prediksi');
        setReportImg(null);
      }
    } catch {
      setHasilPrediksi(null);
      setErrorPrediksi('Gagal terhubung ke server!');
      setReportImg(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-teal-800">Prediksi Loyalitas Pelanggan</h2>

      <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-md shadow-md">
        <h3 className="font-semibold mb-4">Form Input Data Pelanggan</h3>
        <div>
          <label className="block mb-1 font-medium">Nama Pelanggan:</label>
          <input
            type="text"
            name="nama_pelanggan"
            value={formData.nama_pelanggan}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md bg-blue-50"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {['point', 'history_transaksi', 'total_belanja', 'frekuensi_kunjungan'].map((field, idx) => (
            <div key={idx}>
              <label className="block mb-1 font-medium">
                {field === 'point' && 'Point:'}
                {field === 'history_transaksi' && 'History Transaksi:'}
                {field === 'total_belanja' && 'Total Belanja (Rp):'}
                {field === 'frekuensi_kunjungan' && 'Frekuensi Kunjungan:'}
              </label>
              <input
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                min={0}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          ))}
        </div>
        <button type="submit" className="w-full py-2 mt-4 bg-teal-700 text-white font-semibold rounded-md hover:bg-teal-800">
          Prediksi Loyalitas
        </button>
      </form>

      {hasilPrediksi && (
        <div className="mt-6 p-4 bg-green-100 text-green-900 rounded-md text-center font-semibold text-lg">
          Status Loyalitas: <span className="font-bold">{hasilPrediksi}</span>
        </div>
      )}
      {errorPrediksi && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md text-center font-semibold">
          {errorPrediksi}
        </div>
      )}
      {reportImg && (
        <div className="mt-6 text-center">
          <h4 className="font-semibold mb-2 text-gray-700">Grafik Evaluasi Model</h4>
          <img src={reportImg} alt="Confusion Matrix" className="mx-auto border rounded-md shadow-md" />
        </div>
      )}
      {errorImg && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md text-center font-semibold">
          {errorImg}
        </div>
      )}
    </div>
  );
};

export default PrediksiLoyalitas;
