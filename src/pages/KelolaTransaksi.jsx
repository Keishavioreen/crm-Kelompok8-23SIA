import { useState } from "react";

const transaksiDummy = [
  {
    id: "00001",
    nama: "Andi Wijaya",
    total: "Rp 135.000",
    tanggal: "04 Sep 2019",
    metode: "Transfer",
    status: "Completed",
  },
  {
    id: "00002",
    nama: "Ahmad Kashmiri",
    total: "Rp 35.000",
    tanggal: "28 May 2019",
    metode: "Transfer",
    status: "Processing",
  },
  {
    id: "00003",
    nama: "Muhammad Sumbul",
    total: "Rp 75.000",
    tanggal: "23 Nov 2019",
    metode: "Transfer",
    status: "Rejected",
  },
  {
    id: "00004",
    nama: "Sinta Dewi",
    total: "Rp 13.000",
    tanggal: "05 Feb 2019",
    metode: "COD",
    status: "Completed",
  },
  {
    id: "00005",
    nama: "Ibrahim",
    total: "Rp 1.135.000",
    tanggal: "29 Jul 2019",
    metode: "Transfer",
    status: "Processing",
  },
  {
    id: "00006",
    nama: "Budi Satria",
    total: "Rp 135.000",
    tanggal: "15 Aug 2019",
    metode: "Transfer",
    status: "Completed",
  },
  {
    id: "00007",
    nama: "Maria Marpaung",
    total: "Rp 135.000",
    tanggal: "21 Dec 2019",
    metode: "Kartu Kredit",
    status: "Processing",
  },
  {
    id: "00008",
    nama: "Livanwi Widjaja",
    total: "Rp 13.000",
    tanggal: "30 Apr 2019",
    metode: "Kartu Kredit",
    status: "Processing",
  },
  {
    id: "00009",
    nama: "Mees Hillgers",
    total: "Rp 135.000",
    tanggal: "09 Jan 2019",
    metode: "Kartu Kredit",
    status: "In Transit",
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
  const [transaksi] = useState(transaksiDummy);

  return (
    <section className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Transaksi</h1>
        <div className="flex gap-2 items-center text-sm">
          <button className="border px-3 py-1.5 rounded-md bg-white hover:bg-gray-50">
            Filter By
          </button>
          <select className="border px-3 py-1.5 rounded-md">
            <option>Tanggal</option>
          </select>
          <select className="border px-3 py-1.5 rounded-md">
            <option>Metode</option>
          </select>
          <select className="border px-3 py-1.5 rounded-md">
            <option>Order Status</option>
          </select>
          <button className="text-red-500 text-sm hover:underline">
            Reset Filter
          </button>
        </div>
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
            </tr>
          </thead>
          <tbody>
            {transaksi.map((t, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-gray-500">Showing 1-09 of 78</div>
    </section>
  );
}
