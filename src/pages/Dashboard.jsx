import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,    
  LineController, 
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler // ✅ Tambahan penting untuk 'fill' di Line chart
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register semua plugin ChartJS yang diperlukan
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,    
  LineController,   
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler 
);

// Ringkasan penjualan
const salesSummary = {
  totalPenjualan: 125000000,
  labaKotor: 45000000,
  jumlahTransaksi: 3500,
  totalPenerimaan: 120000000,
  jumlahProdukTerjual: 15000,
  penjualanPlatform: {
    offline: 70000000,
    ecommerce: 30000000,
    marketplace: 25000000,
  },
};

// Data grafik penjualan dan transaksi
const salesTrendData = {
  labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
  datasets: [
    {
      type: "line",
      label: "Total Penjualan (Rp)",
      data: [18000000, 20000000, 17000000, 22000000, 25000000, 23000000, 21000000],
      borderColor: "rgba(37, 99, 235, 1)",
      backgroundColor: "rgba(37, 99, 235, 0.2)",
      fill: true,
      yAxisID: "y",
      tension: 0.4,
    },
    {
      type: "bar",
      label: "Jumlah Transaksi",
      data: [400, 450, 380, 500, 550, 480, 460],
      backgroundColor: "rgba(59, 130, 246, 0.7)",
      yAxisID: "y1",
    },
  ],
};

// Konfigurasi grafik
const salesTrendOptions = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Tren Penjualan dan Transaksi Harian" },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      title: {
        display: true,
        text: "Total Penjualan (Rp)",
      },
      beginAtZero: true,
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      title: {
        display: true,
        text: "Jumlah Transaksi",
      },
      beginAtZero: true,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

// Data pelanggan
const customers = [
  { nama: "Andi", riwayatPembelian: "Paracetamol, Vitamin C", preferensi: "Vitamin", loyalitas: "Gold" },
  { nama: "Budi", riwayatPembelian: "Promag, Ibuprofen", preferensi: "Antasida", loyalitas: "Silver" },
  { nama: "Citra", riwayatPembelian: "Imboost, Paracetamol", preferensi: "Imun Booster", loyalitas: "Bronze" },
];

// Data stok produk
const stockProducts = [
  { produk: "Paracetamol", stok: 50, kadaluarsa: "2025-12-31", produkTerlaris: true },
  { produk: "Amoxicillin", stok: 20, kadaluarsa: "2025-08-15", produkTerlaris: false },
  { produk: "Vitamin C", stok: 100, kadaluarsa: "2026-01-10", produkTerlaris: true },
  { produk: "Obat Flu", stok: 10, kadaluarsa: "2025-06-30", produkTerlaris: false },
];

// Laporan keuangan
const financialReport = {
  labaRugi: 35000000,
  arusKas: 20000000,
  analisis: "Keuangan apotek stabil dengan peningkatan penjualan 10% dibanding bulan lalu.",
};

// Komponen utama
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Penjualan CRM Apotek</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Memantau performa penjualan, pelanggan, stok, dan keuangan secara real-time.
        </p>
      </header>

      {/* Ringkasan */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Penjualan" value={`Rp ${salesSummary.totalPenjualan.toLocaleString()}`} />
        <StatCard title="Laba Kotor" value={`Rp ${salesSummary.labaKotor.toLocaleString()}`} />
        <StatCard title="Jumlah Transaksi" value={salesSummary.jumlahTransaksi} />
        <StatCard title="Total Penerimaan" value={`Rp ${salesSummary.totalPenerimaan.toLocaleString()}`} />
        <StatCard title="Produk Terjual" value={salesSummary.jumlahProdukTerjual} />
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="font-medium mb-2">Penjualan per Platform</h2>
          <ul className="list-disc list-inside text-sm">
            <li>Offline: Rp {salesSummary.penjualanPlatform.offline.toLocaleString()}</li>
            <li>E-Commerce: Rp {salesSummary.penjualanPlatform.ecommerce.toLocaleString()}</li>
            <li>Marketplace: Rp {salesSummary.penjualanPlatform.marketplace.toLocaleString()}</li>
          </ul>
        </div>
      </section>

      {/* Grafik */}
      <section className="mb-10 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Line data={salesTrendData} options={salesTrendOptions} />
        <p className="mt-4 text-center text-green-600 dark:text-green-400 font-semibold">
          Penjualan meningkat 8% dibanding minggu lalu 📈
        </p>
      </section>

      {/* CRM */}
      <DataTable title="Manajemen Pelanggan (CRM)" data={customers} columns={["nama", "riwayatPembelian", "preferensi", "loyalitas"]} />

      {/* Stok */}
      <DataTable
        title="Manajemen Stok dan Produk"
        data={stockProducts}
        columns={["produk", "stok", "kadaluarsa", "produkTerlaris"]}
        format={{
          produkTerlaris: (val) => (val ? "Ya" : "Tidak"),
        }}
      />

      {/* Laporan Keuangan */}
      <section className="mb-10 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Laporan dan Analisis Keuangan</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Laba/Rugi: Rp {financialReport.labaRugi.toLocaleString()}</li>
          <li>Arus Kas: Rp {financialReport.arusKas.toLocaleString()}</li>
          <li>Analisis: {financialReport.analisis}</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Laporan otomatis dan akurat untuk mendukung pengambilan keputusan berbasis data real-time.
        </p>
      </section>
    </div>
  );
}

// Komponen kecil untuk kartu statistik
function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

// Komponen kecil untuk tabel data
function DataTable({ title, data, columns, format = {} }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700 text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              {columns.map((col) => (
                <th key={col} className="border px-4 py-2 text-left capitalize">
                  {col.replace(/([A-Z])/g, " $1")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                {columns.map((col) => (
                  <td key={col} className="border px-4 py-2">
                    {format[col] ? format[col](row[col]) : row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
