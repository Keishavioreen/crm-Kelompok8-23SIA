import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
  LineChart, Line,
  ResponsiveContainer,
} from "recharts";

const summaryCards = [
  { title: "Total Transaksi Akun", value: "40,689", icon: "👤" },
  { title: "Rating Layanan", value: "4.5/5", icon: "⭐" },
  { title: "Total Penjualan", value: "10.000.000", icon: "📈" },
  { title: "Rata² Waktu Tanggapan", value: "20 Menit", icon: "⏱️" },
];

const performaData = [
  { name: "5k", team: 20, feedback: 10 },
  { name: "15k", team: 30, feedback: 60 },
  { name: "25k", team: 40, feedback: 20 },
  { name: "30k", team: 60, feedback: 40 },
  { name: "35k", team: 100, feedback: 10 },
  { name: "45k", team: 50, feedback: 60 },
  { name: "55k", team: 70, feedback: 80 },
  { name: "60k", team: 40, feedback: 100 },
];

const keluhanData = [
  { name: "Keterlambatan Pengiriman", value: 300 },
  { name: "Produk Tidak Sesuai", value: 200 },
  { name: "Obat Kedaluwarsa", value: 150 },
  { name: "Kesalahan Transaksi", value: 180 },
  { name: "Kesulitan Riwayat Pesanan", value: 154 },
];
const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#8dd1e1"];

const resolvedData = [
  { year: "2015", resolved: 30, unresolved: 20 },
  { year: "2016", resolved: 50, unresolved: 35 },
  { year: "2017", resolved: 65, unresolved: 45 },
  { year: "2018", resolved: 80, unresolved: 60 },
  { year: "2019", resolved: 100, unresolved: 70 },
];

export default function DashboardAnalytics() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">Service Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
            <div className="text-3xl">{card.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-lg font-semibold text-gray-800">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Performa */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-700">Performa</h2>
          <select className="text-sm border p-1 rounded">
            <option>October</option>
            <option>September</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={performaData}>
            <defs>
              <linearGradient id="teamColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="feedbackColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="team" stroke="#ff6b6b" fillOpacity={1} fill="url(#teamColor)" name="Tim Layanan" />
            <Area type="monotone" dataKey="feedback" stroke="#8884d8" fillOpacity={1} fill="url(#feedbackColor)" name="Feedback" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tren Keluhan + Jumlah Terselesaikan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold text-gray-700 mb-4">Tren Keluhan</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={keluhanData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                label
              >
                {keluhanData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold text-gray-700 mb-4">Jumlah Keluhan Terselesaikan</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={resolvedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="resolved" stroke="#00C49F" name="Terselesaikan" />
              <Line type="monotone" dataKey="unresolved" stroke="#8884d8" name="Belum Selesai" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
