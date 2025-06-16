import React, { useState, useEffect } from "react";
import { NavLink,Outlet } from "react-router-dom";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState(() => {
    const stored = localStorage.getItem("customers");
    return stored ? JSON.parse(stored) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    birthDate: "",
    riwayat: "",
    penyakit: "",
    gender: "",
  });

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdateCustomer = () => {
    const { name, phone, address, birthDate, riwayat, penyakit, gender } = formData;
    if (!name || !phone || !address || !birthDate || !riwayat || !penyakit || !gender) {
      alert("Semua kolom harus diisi");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name,
      phone,
      address,
      birthDate,
      riwayat,
      penyakit,
      gender,
    };

    if (editIndex !== null) {
      const updated = [...customers];
      updated[editIndex] = newCustomer;
      setCustomers(updated);
    } else {
      setCustomers([...customers, newCustomer]);
    }

    setFormData({
      name: "",
      phone: "",
      address: "",
      birthDate: "",
      riwayat: "",
      penyakit: "",
      gender: "",
    });
    setShowForm(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const cust = customers[index];
    setFormData({ ...cust });
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus pelanggan ini?")) {
      const updated = [...customers];
      updated.splice(index, 1);
      setCustomers(updated);
    }
  };

  if (location.pathname === "/pelanggan/segmentasi") {
    return <Outlet />;
  }
 

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Manajemen Pelanggan Apotek</h1>
     <div className="mt-4 space-x-4 mb-10">
        {/* Update to full path */}
        <NavLink to="/pelanggan/segmentasi" className="text-blue-600 hover:underline">Segmentasi Pelanggan</NavLink>
      </div>
      <div className="mt-6">
      
        <Outlet />
      </div>
      <button
        onClick={() => {
          setShowForm((prev) => !prev);
          setFormData({
            name: "",
            phone: "",
            address: "",
            birthDate: "",
            riwayat: "",
            penyakit: "",
            gender: "",
          });
          setEditIndex(null);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showForm ? "Batal" : "Tambah Pelanggan"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded bg-white shadow-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Nama</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">No. Telepon</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Alamat</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Tanggal Lahir</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Jenis Kelamin</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleAddOrUpdateCustomer}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editIndex !== null ? "Update Pelanggan" : "Simpan Pelanggan"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Telepon</th>
              <th className="px-4 py-2">Alamat</th>
              <th className="px-4 py-2 text-center">Tanggal Lahir</th>
              <th className="px-4 py-2 text-center">Jenis Kelamin</th>
              <th className="px-4 py-2 text-center">Riwayat</th>
              <th className="px-4 py-2 text-center">Penyakit</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Tidak ada pelanggan ditambahkan.
                </td>
              </tr>
            ) : (
              customers.map((cust, index) => (
                <tr key={cust.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{cust.name}</td>
                  <td className="px-4 py-2">{cust.phone}</td>
                  <td className="px-4 py-2">{cust.address}</td>
                  <td className="px-4 py-2 text-center">{cust.birthDate}</td>
                  <td className="px-4 py-2 text-center">{cust.gender}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-2 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-2 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Hapus
                    </button>
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
