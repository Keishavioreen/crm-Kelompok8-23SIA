import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

import {
  ReceiptText,
  Crown,
  Boxes,
  Wallet,
} from "lucide-react";

// Dummy data
const dailySales = [
  { date: "01 Jun", sales: 150 },
  { date: "02 Jun", sales: 200 },
  { date: "03 Jun", sales: 180 },
  { date: "04 Jun", sales: 220 },
  { date: "05 Jun", sales: 170 },
  { date: "06 Jun", sales: 250 },
  { date: "07 Jun", sales: 300 },
];

const weeklySales = [
  { week: "Minggu 1", sales: 1200 },
  { week: "Minggu 2", sales: 1400 },
  { week: "Minggu 3", sales: 1350 },
  { week: "Minggu 4", sales: 1600 },
];

const monthlySales = [
  { month: "Jan", sales: 5000 },
  { month: "Feb", sales: 6000 },
  { month: "Mar", sales: 5500 },
  { month: "Apr", sales: 7000 },
  { month: "Mei", sales: 8000 },
  { month: "Jun", sales: 7500 },
];

const productCategories = [
  { category: "Paracetamol", sold: 400 },
  { category: "Vitamin C", sold: 300 },
  { category: "Antibiotik", sold: 250 },
  { category: "Obat Batuk", sold: 150 },
  { category: "Obat Flu", sold: 200 },
];

const salesForecast = [
  { month: "Jul", forecast: 7800 },
  { month: "Agu", forecast: 8200 },
  { month: "Sep", forecast: 7900 },
  { month: "Okt", forecast: 8500 },
  { month: "Nov", forecast: 8800 },
  { month: "Des", forecast: 9000 },
];

const totalSales = 45000;
const totalRevenue = 135000000;
const bestCategory = "Paracetamol";
const currentStock = 1200;

export default function SalesReport() {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Laporan Penjualan</h1>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded shadow text-center flex flex-col items-center space-y-2">
          <ReceiptText size={32} className="text-green-500" />
          <h2 className="text-gray-500 font-semibold">Total Penjualan</h2>
          <p className="text-3xl font-bold">{totalSales.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Transaksi</p>
        </div>

        <div className="bg-white p-5 rounded shadow text-center flex flex-col items-center space-y-2">
          <Crown size={32} className="text-yellow-500" />
          <h2 className="text-gray-500 font-semibold">Kategori Produk Terlaris</h2>
          <p className="text-3xl font-bold">{bestCategory}</p>
          <p className="text-sm text-gray-400">Jumlah Terjual Tertinggi</p>
        </div>

        <div className="bg-white p-5 rounded shadow text-center flex flex-col items-center space-y-2">
          <Boxes size={32} className="text-indigo-500" />
          <h2 className="text-gray-500 font-semibold">Stok Saat Ini</h2>
          <p className="text-3xl font-bold">{currentStock.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Unit Tersedia</p>
        </div>

        <div className="bg-white p-5 rounded shadow text-center flex flex-col items-center space-y-2">
          <Wallet size={32} className="text-emerald-600" />
          <h2 className="text-gray-500 font-semibold">Total Pendapatan</h2>
          <p className="text-3xl font-bold">
            Rp {totalRevenue.toLocaleString("id-ID")}
          </p>
          <p className="text-sm text-gray-400">Dalam Rupiah</p>
        </div>
      </div>

      {/* Grafik Harian, Mingguan, Bulanan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="bg-white p-5 rounded shadow">
          <h3 className="font-semibold mb-3">Penjualan Harian</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-white p-5 rounded shadow">
          <h3 className="font-semibold mb-3">Penjualan Mingguan</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-white p-5 rounded shadow">
          <h3 className="font-semibold mb-3">Penjualan Bulanan</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>

      {/* Produk Terlaris & Forecast Penjualan Bulanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-5 rounded shadow">
          <h3 className="font-semibold mb-3">Produk Terlaris</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={productCategories} margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" />
              <Tooltip />
              <Bar dataKey="sold" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-white p-5 rounded shadow">
          <h3 className="font-semibold mb-3">Forecast Penjualan Bulanan</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#f59e0b"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>
    </div>
  );
}
