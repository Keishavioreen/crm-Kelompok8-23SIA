import React, { useState, useEffect } from "react";
import { PackageCheck, AlertTriangle, Clock, Pencil, Trash2, PlusCircle } from "lucide-react";

const initialObatList = [
  {
    kode: "OBT-001",
    nama: "Paracetamol 2 Strip",
    kategori: "Analgesik",
    harga: 15000,
    stok: 5,
    expired: "2025-07-15",
    deskripsi: "Obat penurun panas dan pereda nyeri.",
  },
  {
    kode: "OBT-002",
    nama: "Vitamin C 1 Botol",
    kategori: "Suplemen",
    harga: 15000,
    stok: 40,
    expired: "2025-08-30",
    deskripsi: "Suplemen untuk menjaga daya tahan tubuh.",
  },
];

const getInitialObatList = () => {
  const data = localStorage.getItem("obatList");
  return data ? JSON.parse(data) : initialObatList;
};

const StokObat = () => {
  const [obatList, setObatList] = useState(getInitialObatList);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [newObat, setNewObat] = useState({
    kode: "",
    nama: "",
    kategori: "",
    harga: "",
    stok: "",
    expired: "",
    deskripsi: "",
  });

  useEffect(() => {
    localStorage.setItem("obatList", JSON.stringify(obatList));
  }, [obatList]);

  const filteredObat = obatList.filter((obat) => {
    const matchName = obat.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStock = showLowStockOnly ? obat.stok < 10 : true;
    return matchName && matchStock;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewObat((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveObat = () => {
    const { kode, nama, kategori, harga, stok, expired, deskripsi } = newObat;
    if (!kode || !nama || !kategori || !harga || !stok || !expired || !deskripsi) {
      alert("Mohon lengkapi semua data.");
      return;
    }

    const formattedObat = {
      ...newObat,
      harga: Number(harga),
      stok: Number(stok),
    };

    if (isEditing) {
      const updated = [...obatList];
      updated[editIndex] = formattedObat;
      setObatList(updated);
    } else {
      setObatList([...obatList, formattedObat]);
    }

    resetForm();
  };

  const handleEdit = (index) => {
    setNewObat(obatList[index]);
    setEditIndex(index);
    setIsEditing(true);
    setFormVisible(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      const updated = [...obatList];
      updated.splice(index, 1);
      setObatList(updated);
    }
  };

  const resetForm = () => {
    setNewObat({
      kode: "",
      nama: "",
      kategori: "",
      harga: "",
      stok: "",
      expired: "",
      deskripsi: "",
    });
    setIsEditing(false);
    setEditIndex(null);
    setFormVisible(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Stok Obat</h1>

      {formVisible && (
        <div className="mb-6 bg-white border rounded shadow-md p-6 relative">
          <button
            onClick={resetForm}
            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl"
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-6">
            {isEditing ? "Edit Obat" : "Tambah Obat"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Kode Obat" name="kode" value={newObat.kode} onChange={handleInputChange} />
            <InputField label="Nama Obat" name="nama" value={newObat.nama} onChange={handleInputChange} />
            <div>
              <label className="text-sm text-gray-700">Kategori</label>
              <select
                name="kategori"
                value={newObat.kategori}
                onChange={handleInputChange}
                className="border px-4 py-2 rounded w-full"
              >
                <option value="">Pilih Kategori</option>
                <option value="Analgesik">Analgesik</option>
                <option value="Suplemen">Suplemen</option>
                <option value="Antibiotik">Antibiotik</option>
              </select>
            </div>
            <InputField label="Stok Tersedia" name="stok" type="number" value={newObat.stok} onChange={handleInputChange} />
            <InputField label="Harga" name="harga" type="number" value={newObat.harga} onChange={handleInputChange} />
            <InputField label="Tanggal Kadaluarsa" name="expired" type="date" value={newObat.expired} onChange={handleInputChange} />
            <div className="md:col-span-2">
              <label className="text-sm text-gray-700">Deskripsi</label>
              <textarea
                name="deskripsi"
                placeholder="Deskripsi obat"
                value={newObat.deskripsi}
                onChange={handleInputChange}
                className="border px-4 py-2 rounded w-full"
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSaveObat}
              className="bg-[#33BFBF] text-white px-6 py-2 rounded hover:bg-teal-700"
            >
              Simpan
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ResumeCard icon={PackageCheck} label="Total Obat" value={obatList.length} bg="#33BFBF" />
        <ResumeCard icon={AlertTriangle} label="Stok Rendah (< 10)" value={obatList.filter((o) => o.stok < 10).length} bg="#33BFBF" />
        <ResumeCard icon={Clock} label="Kadaluarsa" value={obatList.filter((o) => new Date(o.expired) < new Date()).length} bg="#33BFBF" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Cari nama obat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/3"
        />
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => setShowLowStockOnly(!showLowStockOnly)}
            className="bg-[#33BFBF] text-white px-4 py-2 rounded hover:bg-cyan-700"
          >
            {showLowStockOnly ? "Lihat Semua" : "Filter Stok Rendah"}
          </button>
          <button
            className="bg-[#33BFBF] text-white px-4 py-2 rounded hover:bg-teal-700 flex items-center gap-2"
            onClick={() => {
              resetForm();
              setFormVisible(true);
            }}
          >
            <PlusCircle size={18} /> Tambah Obat
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto text-sm text-left text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Kode</th>
              <th className="px-4 py-2 border">Nama Obat</th>
              <th className="px-4 py-2 border">Kategori</th>
              <th className="px-4 py-2 border">Harga</th>
              <th className="px-4 py-2 border">Stok</th>
              <th className="px-4 py-2 border">Kadaluarsa</th>
              <th className="px-4 py-2 border">Deskripsi</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredObat.length > 0 ? (
              filteredObat.map((obat, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{obat.kode}</td>
                  <td className="px-4 py-2 border">{obat.nama}</td>
                  <td className="px-4 py-2 border">{obat.kategori}</td>
                  <td className="px-4 py-2 border">Rp {obat.harga.toLocaleString()}</td>
                  <td className={`px-4 py-2 border ${obat.stok < 10 ? "text-red-600 font-semibold" : ""}`}>{obat.stok}</td>
                  <td className="px-4 py-2 border">{new Date(obat.expired).toLocaleDateString("id-ID")}</td>
                  <td className="px-4 py-2 border">{obat.deskripsi}</td>
                  <td className="px-4 py-2 border flex gap-2">
                    <button onClick={() => handleEdit(index)} className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">Tidak ada data yang sesuai.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="text-sm text-gray-700">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="border px-4 py-2 rounded w-full"
    />
  </div>
);

const ResumeCard = ({ icon: Icon, label, value, bg }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl shadow text-white" style={{ backgroundColor: bg }}>
    <div className="p-3 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
      {Icon && <Icon size={28} color="white" />}
    </div>
    <div>
      <p className="text-sm">{label}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  </div>
);

export default StokObat;
