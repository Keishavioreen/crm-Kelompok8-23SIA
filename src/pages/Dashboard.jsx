import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Data ringkasan penjualan harian/bulanan
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

// Data tren penjualan dan transaksi harian (contoh 7 hari)
const salesTrendData = {
  labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
  datasets: [
    {
      type: "line",
      label: "Total Penjualan (Rp)",
      data: [18000000, 20000000, 17000000, 22000000, 25000000, 23000000, 21000000],
      borderColor: "rgba(37, 99, 235, 1)",
      backgroundColor: "rgba(37, 99, 235, 0.2)",
      yAxisID: "y",
      tension: 0.3,
      fill: true,
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

const salesTrendOptions = {
  responsive: true,
  interaction: { mode: "index", intersect: false },
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
      title: { display: true, text: "Total Penjualan (Rp)" },
      beginAtZero: true,
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      title: { display: true, text: "Jumlah Transaksi" },
      beginAtZero: true,
      grid: { drawOnChartArea: false },
    },
  },
};

// Data pelanggan (tanpa hutang)
const customers = [
  {
    nama: "Andi",
    riwayatPembelian: "Paracetamol, Vitamin C",
    preferensi: "Vitamin",
    loyalitas: "Gold",
  },
  {
    nama: "Budi",
    riwayatPembelian: "Promag, Ibuprofen",
    preferensi: "Antasida",
    loyalitas: "Silver",
  },
  {
    nama: "Citra",
    riwayatPembelian: "Imboost, Paracetamol",
    preferensi: "Imun Booster",
    loyalitas: "Bronze",
  },
];

// Data stok produk
const stockProducts = [
  {
    produk: "Paracetamol",
    stok: 50,
    kadaluarsa: "2025-12-31",
    produkTerlaris: true,
  },
  {
    produk: "Amoxicillin",
    stok: 20,
    kadaluarsa: "2025-08-15",
    produkTerlaris: false,
  },
  {
    produk: "Vitamin C",
    stok: 100,
    kadaluarsa: "2026-01-10",
    produkTerlaris: true,
  },
  {
    produk: "Obat Flu",
    stok: 10,
    kadaluarsa: "2025-06-30",
    produkTerlaris: false,
  },
];

// Data laporan keuangan
const financialReport = {
  labaRugi: 35000000,
  arusKas: 20000000,
  analisis: "Keuangan apotek stabil dengan peningkatan penjualan 10% dibanding bulan lalu.",
};

// Fitur pendukung operasional
const operationalFeatures = [
  "Integrasi dengan sistem POS mendukung berbagai metode pembayaran.",
  "Pengelolaan pesanan online dan pengiriman via marketplace dan e-commerce.",
  "Kompensasi pelanggan untuk meningkatkan layanan dan kepercayaan.",
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 font-sans text-gray-900 dark:text-gray-100">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Dashboard Penjualan CRM Apotek</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Memantau performa penjualan, pelanggan, stok, dan keuangan secara real-time.
        </p>
      </header>

      {/* Ringkasan Data Penjualan */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-2">Total Penjualan</h2>
          <p className="text-3xl font-bold">Rp {salesSummary.totalPenjualan.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-2">Laba Kotor</h2>
          <p className="text-3xl font-bold">Rp {salesSummary.labaKotor.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-2">Jumlah Transaksi</h2>
          <p className="text-3xl font-bold">{salesSummary.jumlahTransaksi}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-2">Total Penerimaan</h2>
          <p className="text-3xl font-bold">Rp {salesSummary.totalPenerimaan.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-2">Jumlah Produk Terjual</h2>
          <p className="text-3xl font-bold">{salesSummary.jumlahProdukTerjual}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-2">Penjualan per Platform</h2>
          <ul className="list-disc list-inside">
            <li>Offline: Rp {salesSummary.penjualanPlatform.offline.toLocaleString()}</li>
            <li>E-Commerce: Rp {salesSummary.penjualanPlatform.ecommerce.toLocaleString()}</li>
            <li>Marketplace: rp {salesSummary.penjualanPlatform.marketplace.toLocaleString()}</li>
          </ul>
        </div>
      </section>

      {/* Visualisasi Data Penjualan */}
      <section className="mb-10 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Line options={salesTrendOptions} data={salesTrendData} />
        <p className="mt-4 font-semibold text-center text-green-600 dark:text-green-400">
          Penjualan meningkat 8% dibanding minggu lalu 📈
        </p>
      </section>

      {/* Manajemen Pelanggan (CRM) */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Manajemen Pelanggan (CRM)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Nama</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Riwayat Pembelian</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Preferensi</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Loyalitas</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(({ nama, riwayatPembelian, preferensi, loyalitas }) => (
                <tr key={nama} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{nama}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{riwayatPembelian}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{preferensi}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{loyalitas}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Pengingat pembelian rutin dan pengelolaan loyalitas pelanggan dapat diintegrasikan untuk meningkatkan retensi.
          </p>
        </div>
      </section>

      {/* Manajemen Stok dan Produk */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Manajemen Stok dan Produk</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Produk</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Stok</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Tanggal Kadaluarsa</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Produk Terlaris</th>
              </tr>
            </thead>
            <tbody>
              {stockProducts.map(({ produk, stok, kadaluarsa, produkTerlaris }) => (
                <tr key={produk} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{produk}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{stok}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{kadaluarsa}</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    {produkTerlaris ? "Ya" : "Tidak"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Notifikasi stok menipis dan produk mendekati kadaluarsa perlu diintegrasikan untuk tindakan preventif.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Pengaturan harga jual otomatis dan harga grosir dapat ditambahkan sesuai kebutuhan.
          </p>
        </div>
      </section>

      {/* Laporan dan Analisis Keuangan */}
      <section className="mb-10 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Laporan dan Analisis Keuangan</h2>
        <ul className="list-disc list-inside mb-4">
       
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
