import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";
import { useAnalytics } from "../context/AnalyticsContext";
import { Link } from "react-router-dom";

export default function Analytics() {
  const { analyticsData } = useAnalytics();

  if (!analyticsData.length) {
    return (
      <div className="p-6 text-center text-gray-600">
        <h2 className="text-xl font-bold mb-4">Service Analytics</h2>
        <p>Belum ada data. Silakan isi melalui halaman <strong>Kelola Analytics</strong>.</p>
        <Link to="/kelola-analytics" className="inline-block mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded">
          ➕ Tambah / Kelola Data
        </Link>
      </div>
    );
  }

  // Data ringkasan
  const totalKeluhan = analyticsData.reduce((sum, item) => sum + Number(item.complaintsResolved), 0);
  const avgRating = (
    analyticsData.reduce((sum, item) => sum + Number(item.rating), 0) / analyticsData.length
  ).toFixed(2);

  const avgResponseTime = analyticsData.map((d) => {
    const number = parseInt(d.responseTime.replace(/\D/g, ""));
    return isNaN(number) ? 0 : number;
  });
  const responseAvg = avgResponseTime.length
    ? Math.round(avgResponseTime.reduce((a, b) => a + b, 0) / avgResponseTime.length)
    : 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Service Analytics</h1>
        <Link
          to="/kelola-analytics"
          className="text-blue-600 hover:underline text-sm"
        >
          ➕ Tambah / Kelola Data
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow text-center">
          <p className="text-sm text-gray-500">Rating Layanan</p>
          <p className="text-lg font-semibold text-gray-800">{avgRating} / 5</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow text-center">
          <p className="text-sm text-gray-500">Rata² Waktu Tanggapan</p>
          <p className="text-lg font-semibold text-gray-800">{responseAvg} menit</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow text-center">
          <p className="text-sm text-gray-500">Jumlah Keluhan Terselesaikan</p>
          <p className="text-lg font-semibold text-gray-800">{totalKeluhan}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow text-center">
          <p className="text-sm text-gray-500">Total Bulan Terdata</p>
          <p className="text-lg font-semibold text-gray-800">{analyticsData.length}</p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold text-gray-700 mb-4">Grafik Keluhan Terselesaikan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="complaintsResolved"
              stroke="#00C49F"
              name="Terselesaikan"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
