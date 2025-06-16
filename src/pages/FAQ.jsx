// src/pages/FAQ.jsx
import { Link, useNavigate }      from "react-router-dom";
import { Edit, Trash, Plus }      from "lucide-react";
import { useGuides }              from "../context/GuideContext";   // ← global state

export default function FAQ() {
  /* tarik data & handler dari context */
  const { guides: data, deleteGuide } = useGuides();
  const navigate = useNavigate();

  return (
    <section className="space-y-6">
      {/* Header + tombol tambah */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Kelola Panduan & FAQ
        </h1>

        <button
          onClick={() => navigate("/faq/add")}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm"
        >
          <Plus size={16} /> Tambah Panduan
        </button>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Judul Panduan</th>
              <th className="px-4 py-3 text-left">Tipe</th>
              <th className="px-4 py-3 text-left">Kategori</th>
              <th className="px-4 py-3 text-left">Dibaca</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Tanggal Diubah</th>
              <th className="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((g, i) => (
              <tr key={g.id} className="border-b last:border-none hover:bg-gray-50">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3 font-medium">{g.title}</td>
                <td className="px-4 py-3">{g.type}</td>
                <td className="px-4 py-3">{g.category}</td>
                <td className="px-4 py-3">{g.read}x</td>
                <td className="px-4 py-3">{g.status}</td>
                <td className="px-4 py-3">{g.updated}</td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {/* Edit */}
                    <Link
                      to={`/faq/${g.id}`}
                      className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Edit size={14} />
                    </Link>

                    {/* Hapus */}
                    <button
                      onClick={() => deleteGuide(g.id)}
                      className="p-1.5 bg-gray-100 rounded hover:bg-red-100 text-red-600"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Jika belum ada data */}
            {data.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-gray-500">
                  Belum ada panduan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
