import React, { useState, useEffect } from "react";

const initialObatList = [
  {
    kode: "OBT-001",
    nama: "Paracetamol 2 Strip",
    kategori: "Analgesik",
    harga: 15000,
    stok: 5,
    expired: "2025-07-15",
  },
  {
    kode: "OBT-002",
    nama: "Vitamin C 1 Botol",
    kategori: "Suplemen",
    harga: 15000,
    stok: 40,
    expired: "2025-08-30",
  },
];

// Fungsi untuk ambil data awal dari localStorage, kalau kosong pakai initialObatList
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
  const [newObat, setNewObat] = useState({
    kode: "",
    nama: "",
    kategori: "",
    harga: "",
    stok: "",
    expired: "",
  });

  // Simpan data ke localStorage setiap kali obatList berubah
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
    setNewObat((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveObat = () => {
    const { kode, nama, kategori, harga, stok, expired } = newObat;
    if (!kode || !nama || !kategori || !harga || !stok || !expired) {
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
    });
    setIsEditing(false);
    setEditIndex(null);
    setFormVisible(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Stok Obat</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => {
            resetForm();
            setFormVisible(true);
          }}
        >
          + Tambah Obat
        </button>
      </div>

      {formVisible && (
        <div className="mb-6 bg-white border rounded shadow-md p-6 relative">
          <button
            onClick={resetForm}
            className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
          >
            &times; Tutup
          </button>
          <h2 className="text-xl font-semibold mb-6">
            {isEditing ? "Edit Obat" : "Tambah Obat"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-700">Kode Obat</label>
              <input
                name="kode"
                placeholder="Kode Obat"
                value={newObat.kode}
                onChange={handleInputChange}
                className="border px-4 py-2 rounded w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Nama Obat</label>
              <input
                name="nama"
                placeholder="Nama Obat"
                value={newObat.nama}
                onChange={handleInputChange}
                className="border px-4 py-2 rounded w-full"
              />
            </div>
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
            <div>
              <label className="text-sm text-gray-700">Stok Tersedia</label>
              <input
                name="stok"
                type="number"
                placeholder="Stok Tersedia"
                value={newObat.stok}
                onChange={handleInputChange}
                className="border px-4 py-2 rounded w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Harga</label>
              <input
                name="harga"
                type="number"
                placeholder="Harga"
                value={newObat.harga}
                onChange={handleInputChange}
                className="border px-4 py-2 rounded w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Tanggal Kadaluarsa</label>
              <input
                name="expired"
                type="date"
                value={newObat.expired}
                onChange={handleInputChange}
                className="border px-4 py-2 rounded w-full"
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSaveObat}
              className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
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

      {/* Resume Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-gray-600">Total Obat</p>
          <h2 className="text-xl font-bold">{obatList.length}</h2>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-gray-600">Stok Rendah (&lt; 10)</p>
          <h2 className="text-xl font-bold text-yellow-700">
            {obatList.filter((o) => o.stok < 10).length}
          </h2>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <p className="text-gray-600">Kadaluarsa</p>
          <h2 className="text-xl font-bold text-red-600">
            {obatList.filter((o) => new Date(o.expired) < new Date()).length}
          </h2>
        </div>
      </div>

      {/* FILTER DAN TABEL */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari nama obat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-1/2"
        />
        <button
          onClick={() => setShowLowStockOnly(!showLowStockOnly)}
          className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
        >
          {showLowStockOnly ? "Lihat Semua" : "Filter Stok Rendah"}
        </button>
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
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredObat.length > 0 ? (
              filteredObat.map((obat, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{obat.kode}</td>
                  <td className="px-4 py-2 border">{obat.nama}</td>
                  <td className="px-4 py-2 border">{obat.kategori}</td>
                  <td className="px-4 py-2 border">
                    Rp {obat.harga.toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-2 border ${
                      obat.stok < 10 ? "text-red-600 font-semibold" : ""
                    }`}
                  >
                    {obat.stok}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(obat.expired).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500"
                >
                  Tidak ada data yang sesuai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StokObat;
