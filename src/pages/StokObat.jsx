import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

const StokObat = () => {
  const [obatList, setObatList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newObat, setNewObat] = useState({
    nama_obat: "",
    kategori: "",
    harga: "",
    stok: "",
    kadaluarsa: "",
    deskripsi: "",
    gambar: "",
  });

  useEffect(() => {
    fetchObatData();
  }, []);

  const fetchObatData = async () => {
    const { data, error } = await supabase.from("produk").select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setObatList(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewObat((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (id) => {
    const obatToEdit = obatList.find((obat) => obat.id === id);
    if (obatToEdit) {
      setNewObat({
        nama_obat: obatToEdit.nama_obat,
        kategori: obatToEdit.kategori,
        harga: obatToEdit.harga,
        stok: obatToEdit.stok,
        kadaluarsa: obatToEdit.kadaluarsa,
        deskripsi: obatToEdit.deskripsi || "",
        gambar: obatToEdit.gambar || "",
      });
      setEditId(id);
      setIsEditing(true);
      setFormVisible(true);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("produk").delete().eq("id", id);
    if (error) {
      console.error("Gagal menghapus data:", error.message);
    } else {
      alert("Data berhasil dihapus.");
      fetchObatData();
    }
  };

  const handleSaveObat = async () => {
    const { nama_obat, kategori, harga, stok, kadaluarsa, deskripsi, gambar } = newObat;

    if (!nama_obat || !kategori || !harga || !stok || !kadaluarsa) {
      alert("Mohon lengkapi semua data.");
      return;
    }

    const dataToSend = {
      nama_obat,
      kategori,
      harga: Number(harga),
      stok: Number(stok),
      kadaluarsa,
      deskripsi,
      gambar,
    };

    if (isEditing) {
      const { error } = await supabase.from("produk").update(dataToSend).eq("id", editId);
      if (error) {
        console.error("Error updating data:", error);
      } else {
        alert("Data berhasil diperbarui!");
      }
    } else {
      const { error } = await supabase.from("produk").insert(dataToSend);
      if (error) {
        console.error("Error inserting data:", error);
      } else {
        alert("Data berhasil ditambahkan!");
      }
    }

    resetForm();
    fetchObatData();
  };

  const resetForm = () => {
    setNewObat({
      nama_obat: "",
      kategori: "",
      harga: "",
      stok: "",
      kadaluarsa: "",
      deskripsi: "",
      gambar: "",
    });
    setIsEditing(false);
    setEditId(null);
    setFormVisible(false);
  };

  const filteredObat = obatList.filter((obat) => {
    const matchName = obat.nama_obat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStock = filterLowStock ? obat.stok < 10 : true;
    return matchName && matchStock;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Stok Obat</h1>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <Card title="Total Produk" value={obatList.length} />
        <Card title="Stok Rendah" value={obatList.filter((obat) => obat.stok < 10).length} />
        <Card title="Produk Kadaluarsa" value={obatList.filter((obat) => new Date(obat.kadaluarsa) < new Date()).length} />
      </div>

      {/* Filter dan Pencarian */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded w-full sm:w-72"
          />
          <button
            className={`px-4 py-2 rounded ${filterLowStock ? "bg-red-500 text-white" : "bg-gray-300 text-gray-800"}`}
            onClick={() => setFilterLowStock((prev) => !prev)}
          >
            {filterLowStock ? "Tampilkan Semua" : "Stok Rendah"}
          </button>
        </div>
        <button
          className="bg-[#00A6A6] text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => {
            resetForm();
            setFormVisible(true);
          }}
        >
          <PlusCircle size={18} />
          Tambah Obat
        </button>
      </div>

      {/* Tabel Data */}
      <div className="overflow-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto text-sm text-left text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Gambar</th>
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
              filteredObat.map((obat) => (
                <tr key={obat.id}>
                  <td className="px-4 py-2 border">
                    {obat.gambar ? (
                      <img
                        src={obat.gambar}
                        alt={obat.nama_obat}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">Tidak ada gambar</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">{obat.nama_obat}</td>
                  <td className="px-4 py-2 border">{obat.kategori}</td>
                  <td className="px-4 py-2 border">{`Rp ${obat.harga.toLocaleString()}`}</td>
                  <td className={`px-4 py-2 border ${obat.stok < 10 ? "text-red-500 font-semibold" : ""}`}>{obat.stok}</td>
                  <td className="px-4 py-2 border">{new Date(obat.kadaluarsa).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleEdit(obat.id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(obat.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form Input */}
      {formVisible && (
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Obat" : "Tambah Obat"}</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Nama Obat" name="nama_obat" value={newObat.nama_obat} onChange={handleInputChange} />
            <InputField label="Kategori" name="kategori" value={newObat.kategori} onChange={handleInputChange} />
            <InputField label="Harga" name="harga" value={newObat.harga} onChange={handleInputChange} />
            <InputField label="Stok" name="stok" value={newObat.stok} onChange={handleInputChange} />
            <InputField label="Kadaluarsa" name="kadaluarsa" type="date" value={newObat.kadaluarsa} onChange={handleInputChange} />
            <InputField label="URL Gambar" name="gambar" value={newObat.gambar} onChange={handleInputChange} />
          </form>
          <div className="flex gap-4 mt-4">
            <button onClick={handleSaveObat} className="bg-[#00A6A6] text-white px-4 py-2 rounded">
              Simpan
            </button>
            <button onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded">
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white shadow-md p-4 rounded-lg">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block mb-2">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border px-4 py-2 rounded"
    />
  </div>
);

export default StokObat;
