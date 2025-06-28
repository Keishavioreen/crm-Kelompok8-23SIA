import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom"; // <-- Tambahkan Outlet
import { supabase } from "../supabase";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    nohp: "",
    alamat: "",
    tanggal_lahir: "",
    gender: "",
    email: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase
        .from("akun")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Fetch error:", error.message);
      else setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const handleEdit = (index) => {
    setFormData({ ...customers[index] });
    setEditIndex(index);
  };

  const handleUpdateCustomer = async () => {
    const updatedCustomer = { ...formData };
    const { id, ...dataToUpdate } = updatedCustomer;

    const { error } = await supabase.from("akun").update(dataToUpdate).eq("id", id);
    if (!error) {
      const updated = [...customers];
      updated[editIndex] = updatedCustomer;
      setCustomers(updated);
      setEditIndex(null);
    }
  };

  const handleDelete = async (index) => {
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
    if (!confirmed) return;

    const customer = customers[index];
    const { error } = await supabase.from("akun").delete().eq("id", customer.id);
    if (!error) {
      const updated = [...customers];
      updated.splice(index, 1);
      setCustomers(updated);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredCustomers = customers.filter((cust) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      cust.nama?.toLowerCase().includes(search) ||
      cust.nohp?.toLowerCase().includes(search) ||
      cust.email?.toLowerCase().includes(search) ||
      cust.alamat?.toLowerCase().includes(search);

    const matchesGender = genderFilter === "all" || cust.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Manajemen Pelanggan Apotek</h1>

      <div>
        <NavLink to="/pelanggan/segmentasi" className="text-cyan-600 hover:underline">
          Segmentasi Pelanggan
        </NavLink>
      </div>

      <Outlet /> {/* Tambahkan ini agar halaman nested seperti segmentasi bisa muncul */}

      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Cari nama, email, alamat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded shadow-sm"
        />
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="px-3 py-2 border rounded shadow-sm"
        >
          <option value="all">Semua Gender</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>

      {editIndex !== null && (
        <div className="bg-white p-4 rounded shadow space-y-4">
          <h2 className="font-semibold text-lg">Edit Pelanggan</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama" className="border p-2 rounded" />
            <input type="text" name="nohp" value={formData.nohp} onChange={handleChange} placeholder="No Telepon" className="border p-2 rounded" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
            <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat" className="border p-2 rounded" />
            <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} className="border p-2 rounded" />
            <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded">
              <option value="">Pilih Gender</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleUpdateCustomer} className="bg-cyan-600 text-white px-4 py-2 rounded">Simpan Perubahan</button>
            <button onClick={() => setEditIndex(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Batal</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Nama</th>
              <th className="p-2">Email</th>
              <th className="p-2">Alamat</th>
              <th className="p-2">No HP</th>
              <th className="p-2">Tanggal Lahir</th>
              <th className="p-2">Gender</th>
              <th className="p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">Tidak ada data</td>
              </tr>
            ) : (
              filteredCustomers.map((cust, index) => (
                <tr key={cust.id} className="hover:bg-gray-50 border-b">
                  <td className="p-2">{cust.nama}</td>
                  <td className="p-2">{cust.email}</td>
                  <td className="p-2">{cust.alamat}</td>
                  <td className="p-2">{cust.nohp}</td>
                  <td className="p-2">{cust.tanggal_lahir}</td>
                  <td className="p-2">{cust.gender}</td>
                  <td className="p-2 text-center space-x-2">
                    <button onClick={() => handleEdit(index)} className="text-yellow-600">✏️</button>
                    <button onClick={() => handleDelete(index)} className="text-red-600">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
