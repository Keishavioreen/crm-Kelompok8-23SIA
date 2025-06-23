// KelolaTransaksi.jsx – riwayat pembelian lebih detail
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const transaksiDummy = [
  {
    id: "00001",
    nama: "Andi Wijaya",
    total: "Rp 135.000",
    tanggal: "04 Sep 2019",
    metode: "Transfer",
    status: "Completed",
    riwayat: [
      { nama: "Bodrex", jumlah: 3 },
      { nama: "Paracetamol", jumlah: 1 },
    ],
  },
  {
    id: "00002",
    nama: "Ahmad Kashmiri",
    total: "Rp 35.000",
    tanggal: "28 May 2019",
    metode: "Transfer",
    status: "Processing",
    riwayat: [
      { nama: "Amoxicillin", jumlah: 2 },
    ],
  },
  {
    id: "00003",
    nama: "Muhammad Sumbul",
    total: "Rp 75.000",
    tanggal: "23 Nov 2019",
    metode: "Transfer",
    status: "Rejected",
    riwayat: [],
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Processing":
      return "bg-purple-100 text-purple-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    case "In Transit":
      return "bg-pink-100 text-pink-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function KelolaTransaksi() {
  const [transaksi, setTransaksi] = useState(transaksiDummy);
  const [open, setOpen] = useState(null);

  const toggleOpen = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Transaksi</h1>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Total Pembayaran</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Metode Bayar</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Riwayat</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((t, i) => (
              <>
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleOpen(i)}
                >
                  <td className="px-4 py-3 font-mono">{t.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{t.nama}</td>
                  <td className="px-4 py-3">{t.total}</td>
                  <td className="px-4 py-3">{t.tanggal}</td>
                  <td className="px-4 py-3">{t.metode}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusStyle(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex items-center gap-1">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        open === i ? "rotate-180" : ""
                      }`}
                    />
                    <span className="text-xs text-blue-600">
                      {t.riwayat.length > 0
                        ? `${t.riwayat.length} item`
                        : "Tidak ada"}
                    </span>
                  </td>
                </tr>
                {open === i && t.riwayat.length > 0 && (
                  <tr className="bg-gray-50">
                    <td colSpan="7" className="px-4 py-3">
                      <ul className="text-xs text-gray-700 space-y-1">
                        {t.riwayat.map((r, idx) => (
                          <li key={idx}>• {r.nama} — {r.jumlah} pcs</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-gray-500">Showing 1–{transaksi.length} of 78</div>
    </section>
  );
}
