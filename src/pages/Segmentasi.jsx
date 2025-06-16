import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Segmentasi() {
  const barData = [
    { name: "<20", value: 1000 },
    { name: "21-30", value: 750 },
    { name: "31-40", value: 1000 },
    { name: ">40", value: 250 },
  ];

  const pieData = [
    { name: "Perempuan", value: 60 },
    { name: "Laki-laki", value: 40 },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  const historyData = [
    { name: "1", value: 450 },
    { name: "2", value: 350 },
    { name: "3", value: 400 },
    { name: "4", value: 300 },
    { name: "5", value: 450 },
    { name: "6", value: 250 },
    { name: "7", value: 300 },
    { name: "8", value: 400 },
    { name: "9", value: 450 },
  ];

  const frequencyData = [
    { name: "1", value: 600 },
    { name: "2", value: 400 },
    { name: "3", value: 500 },
    { name: "4", value: 700 },
  ];

  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Customer Segmentation
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Usia Pelanggan */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Usia Pelanggan</h2>
          <BarChart width={300} height={250} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </div>

        {/* Jenis Kelamin */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Jenis Kelamin</h2>
          <PieChart width={300} height={250}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Riwayat Pembelian */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Riwayat Pembelian Obat</h2>
          <BarChart width={300} height={250} data={historyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Segmentasi Tanggal Lahir */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Segmentasi Berdasarkan Tanggal Lahir</h2>
          <BarChart width={300} height={250} data={historyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#FF8042" />
          </BarChart>
        </div>

        {/* Frekuensi Pembelian */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Frekuensi Pembelian Pelanggan</h2>
          <BarChart width={300} height={250} data={frequencyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#FF8042" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
