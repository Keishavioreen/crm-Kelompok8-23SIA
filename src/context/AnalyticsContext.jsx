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
        { name: "60k", team: 40, feedback: 100 }
      ]
    }
  ]);

  const addRecord = (data) => {
    const defaultStructure = {
      complaintsUnresolved: 0,
      totalSales: 0,
      totalTransaksi: 0,
      keluhan: [],
      performa: []
    };

    const newRecord = {
      id: Date.now(),
      ...defaultStructure,
      ...data,
      rating: Number(data.rating),
      complaintsResolved: Number(data.complaintsResolved),
    };

    setAnalyticsData((prev) => [...prev, newRecord]);
  };

  const deleteRecord = (id) => {
    setAnalyticsData((prev) => prev.filter((item) => item.id !== id));
  };

  const updateRecord = (updated) => {
    setAnalyticsData((prev) =>
      prev.map((item) => (item.id === updated.id ? {
        ...item,
        ...updated,
        rating: Number(updated.rating),
        complaintsResolved: Number(updated.complaintsResolved)
      } : item))
    );
  };

  return (
    <AnalyticsContext.Provider
      value={{
        analyticsData,
        addRecord,
        deleteRecord,
        updateRecord
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
