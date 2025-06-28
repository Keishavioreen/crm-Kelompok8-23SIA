import { useState } from "react";
import { Link } from "react-router-dom";

const dummyTemplates = [
  {
    id: 1,
    judul: "Balasan Keluhan Umum",
    kategori: "Komplain Pelanggan",
    isi: '"Halo [Nama], terima kasih atas laporannya. Kami sedang menindaklanjuti..."'
  },
  {
    id: 2,
    judul: "Konfirmasi Ketersediaan Obat",
    kategori: "Info Produk / Stok",
    isi: '"Halo [Nama], kami konfirmasi bahwa obat [Nama Obat] tersedia di cabang..."'
  },
  {
    id: 3,
    judul: "Permintaan Refund",
    kategori: "Permintaan Refund",
    isi: '"Refund"Kami menerima permintaan refund Anda dan sedang dalam proses pengecekan..."'
  }
];

export default function EmailTemplateList() {
  const [templates, setTemplates] = useState(dummyTemplates);

  const handleDelete = (id) => {
    setTemplates(templates.filter((tpl) => tpl.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Template Email</h2>
        <Link
          to="/email/template/add"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          + Tambah Template
        </Link>
      </div>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Judul Template</th>
            <th className="border px-4 py-2">Kategori Penggunaan</th>
            <th className="border px-4 py-2">Isi Template</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((tpl, index) => (
            <tr key={tpl.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">{tpl.judul}</td>
              <td className="border px-4 py-2">{tpl.kategori}</td>
              <td className="border px-4 py-2 text-gray-500 italic">{tpl.isi}</td>
              <td className="border px-4 py-2 text-center space-x-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(tpl.id)}
                >
                  🗑️ Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
