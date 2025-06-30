import React, { useState, useMemo } from "react";
import clsx from "clsx";

// ---------- util helpers ----------
const statusColor = {
  Selesai: "bg-green-100 text-green-600",
  Batal: "bg-red-100 text-red-600",
  Dijadwalkan: "bg-purple-100 text-purple-600",
};

const parseDate = (str) => {
  const [day, mon, year] = str.split(" ");
  return new Date(`${day} ${mon} ${year}`);
};

// ---------- initial data ----------
const initialData = [
  {
    id: "00001",
    nama: "Andi Wijaya",
    diagnosis: "Sakit Gigi",
    lokasi: "RS Bhayangkara",
    tanggal: "04 Sep 2019",
    layanan: "Konsultasi",
    status: "Selesai",
  },
  {
    id: "00002",
    nama: "Ahmad Kashmiri",
    diagnosis: "Gerd",
    lokasi: "RS Eka",
    tanggal: "28 May 2019",
    layanan: "Konsultasi",
    status: "Selesai",
  },
  {
    id: "00003",
    nama: "Muhammad Sumbul",
    diagnosis: "Gejala Stroke",
    lokasi: "RS Bhayangkara",
    tanggal: "23 Nov 2019",
    layanan: "Konsultasi",
    status: "Batal",
  },
  {
    id: "00004",
    nama: "Sinta Dewi",
    diagnosis: "Diabetes",
    lokasi: "RS Eka",
    tanggal: "05 Feb 2019",
    layanan: "Pengambilan Resep",
    status: "Selesai",
  },
  {
    id: "00005",
    nama: "Ibrahim",
    diagnosis: "Gerd",
    lokasi: "RS Thabrani",
    tanggal: "29 Jul 2019",
    layanan: "Pengambilan Resep",
    status: "Batal",
  },
  {
    id: "00006",
    nama: "Budi Satria",
    diagnosis: "Anemia",
    lokasi: "RS Bhayangkara",
    tanggal: "15 Aug 2019",
    layanan: "Pengambilan Resep",
    status: "Selesai",
  },
  {
    id: "00007",
    nama: "Maria Marpaung",
    diagnosis: "Gerd",
    lokasi: "RS Thabrani",
    tanggal: "21 Dec 2019",
    layanan: "Pengambilan Resep",
    status: "Dijadwalkan",
  },
  {
    id: "00008",
    nama: "Livanni Widjaja",
    diagnosis: "Osteoporosis",
    lokasi: "RS Thabrani",
    tanggal: "30 Apr 2019",
    layanan: "Konsultasi",
    status: "Dijadwalkan",
  },
  {
    id: "00009",
    nama: "Mees Hillgers",
    diagnosis: "Sakit Gigi",
    lokasi: "RS Eka",
    tanggal: "09 Jan 2019",
    layanan: "Konsultasi",
    status: "Dijadwalkan",
  },
];

// ---------- main component ----------
export default function KelolaAppointment() {
  const [data, setData] = useState(initialData);
  const [filterLokasi, setLokasi] = useState("");
  const [filterStatus, setStatus] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nama: "",
    diagnosis: "",
    lokasi: "",
    tanggal: "",
    layanan: "",
    status: "Dijadwalkan",
  });

  const resetForm = () =>
    setFormData({
      id: "",
      nama: "",
      diagnosis: "",
      lokasi: "",
      tanggal: "",
      layanan: "",
      status: "Dijadwalkan",
    });

  const filteredSorted = useMemo(() => {
    let rows = [...data];
    rows = rows.filter(
      (r) =>
        (filterLokasi === "" || r.lokasi === filterLokasi) &&
        (filterStatus === "" || r.status === filterStatus)
    );
    rows.sort((a, b) => {
      const diff = parseDate(a.tanggal) - parseDate(b.tanggal);
      return sortAsc ? diff : -diff;
    });
    return rows;
  }, [data, filterLokasi, filterStatus, sortAsc]);

  const totalPages = Math.ceil(filteredSorted.length / itemsPerPage);
  const paginated = filteredSorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSave = () => {
    if (!formData.id) {
      const newId = String(data.length + 1).padStart(5, "0");
      setData([...data, { ...formData, id: newId }]);
    } else {
      const updated = data.map((item) =>
        item.id === formData.id ? { ...formData } : item
      );
      setData(updated);
    }
    resetForm();
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Jadwal & Appointment</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded"
        >
          + Tambah
        </button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <span className="flex items-center gap-1 text-gray-600 font-medium">
          <span className="text-xl">🧭</span> Filter By
        </span>
        <select className="border rounded p-2" value={filterLokasi} onChange={(e) => setLokasi(e.target.value)}>
          <option value="">Lokasi</option>
          <option>RS Bhayangkara</option>
          <option>RS Eka</option>
          <option>RS Thabrani</option>
        </select>
        <select className="border rounded p-2" value={filterStatus} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Status</option>
          <option>Selesai</option>
          <option>Batal</option>
          <option>Dijadwalkan</option>
        </select>
        <button
          onClick={() => {
            setLokasi("");
            setStatus("");
          }}
          className="text-white bg-teal-600 hover:bg-teal-700 hover:underline ml-auto"
        >
          🔄 Reset Filter
        </button>
      </div>

      <div className="overflow-auto rounded-xl border">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 text-xs uppercase font-semibold">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Data Medis Singkat</th>
              <th className="p-3">Lokasi</th>
              <th className="p-3 cursor-pointer select-none" onClick={() => setSortAsc(!sortAsc)}>
                Tanggal Janji {sortAsc ? "▲" : "▼"}
              </th>
              <th className="p-3">Jenis Layanan</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-3">{row.id}</td>
                <td className="p-3">{row.nama}</td>
                <td className="p-3">{row.diagnosis}</td>
                <td className="p-3">{row.lokasi}</td>
                <td className="p-3">{row.tanggal}</td>
                <td className="p-3">{row.layanan}</td>
                <td className="p-3">
                  <span
                    className={clsx(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      statusColor[row.status]
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    className="text-indigo-600 hover:underline"
                    onClick={() => {
                      setFormData(row);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline ml-3"
                    onClick={() => {
                      setData(data.filter((item) => item.id !== row.id));
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between p-3 text-sm text-gray-500">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, filteredSorted.length)} of {filteredSorted.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-30"
            >
              ←
            </button>
            <span>
              Page {currentPage} / {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-2 py-1 border rounded disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-2">
              {formData.id ? "Edit Appointment" : "Tambah Appointment"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nama"
                className="border rounded p-2 col-span-2"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              />
              <input
                type="text"
                placeholder="Diagnosis"
                className="border rounded p-2 col-span-2"
                value={formData.diagnosis}
                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              />
              <input
                type="text"
                placeholder="Lokasi"
                className="border rounded p-2"
                value={formData.lokasi}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
              />
              <input
                type="text"
                placeholder="04 Sep 2019"
                className="border rounded p-2"
                value={formData.tanggal}
                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
              />
              <input
                type="text"
                placeholder="Jenis Layanan"
                className="border rounded p-2 col-span-2"
                value={formData.layanan}
                onChange={(e) => setFormData({ ...formData, layanan: e.target.value })}
              />
              <select
                className="border rounded p-2 col-span-2"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option>Selesai</option>
                <option>Batal</option>
                <option>Dijadwalkan</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
