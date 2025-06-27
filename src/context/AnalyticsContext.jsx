// AnalyticsContext.jsx
import React, { createContext, useContext, useState } from "react";

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [analyticsData, setAnalyticsData] = useState([
    {
      id: 1,
      month: "Juni",
      rating: 4.5,
      responseTime: "20 Menit",
      complaintsResolved: 80,
      complaintsUnresolved: 40,
      totalSales: 10000000,
      totalTransaksi: 40689,
      keluhan: [
        { name: "Keterlambatan Pengiriman", value: 300 },
        { name: "Produk Tidak Sesuai", value: 200 },
        { name: "Obat Kedaluwarsa", value: 150 },
        { name: "Kesalahan Transaksi", value: 180 },
        { name: "Kesulitan Melihat Riwayat Pemesanan", value: 154 }
      ],
      performa: [
        { name: "5k", team: 20, feedback: 10 },
        { name: "15k", team: 30, feedback: 60 },
        { name: "25k", team: 40, feedback: 20 },
        { name: "30k", team: 60, feedback: 40 },
        { name: "35k", team: 100, feedback: 10 },
        { name: "45k", team: 50, feedback: 60 },
        { name: "55k", team: 70, feedback: 80 },
        { name: "60k", team: 40, feedback: 100 },
      ]
    },
  ]);

  const addRecord = (data) => {
    setAnalyticsData((prev) => [...prev, { ...data, id: Date.now() }]);
  };

  return (
    <AnalyticsContext.Provider value={{ analyticsData, addRecord }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
