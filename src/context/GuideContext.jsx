import { createContext, useContext, useState } from "react";

const GuideContext = createContext();
export const useGuides = () => useContext(GuideContext);

export function GuideProvider({ children }) {
  const [guides, setGuides] = useState([
    {
      id: 1,
      title: "Cara Tepat Minum Amoxicillin",
      type: "Layanan Pelanggan",
      category: "Penggunaan Obat",
      read: 432,
      status: "Aktif",
      updated: "2025-06-12",
      template: "Isi panduan...",
    },
    {
      id: 2,
      title: "Tips Mengatasi Alergi Ringan",
      type: "Layanan Pelanggan",
      category: "Alergi",
      read: 212,
      status: "Aktif",
      updated: "2025-06-12",
      template: "Isi panduan...",
    },
  ]);

  const addGuide = (data) =>
    setGuides((prev) => [
      ...prev,
      {
        ...data,
        id: Date.now(),
        read: 0,
        updated: new Date().toISOString().split("T")[0],
      },
    ]);

  const updateGuide = (id, data) =>
    setGuides((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, ...data, updated: new Date().toISOString().split("T")[0] } : g
      )
    );

  const deleteGuide = (id) => setGuides((prev) => prev.filter((g) => g.id !== id));

  return (
    <GuideContext.Provider value={{ guides, addGuide, updateGuide, deleteGuide }}>
      {children}
    </GuideContext.Provider>
  );
}
