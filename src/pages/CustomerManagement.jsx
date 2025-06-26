import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function CustomerManagement() {
  const dummyData = [
    {
      id: 1,
      name: "Dina Andriani",
      phone: "081234567890",
      address: "Jl. Merdeka No.1",
      birthDate: "1994-03-12",
      gender: "Perempuan",
      email: "dina@example.com",
    },
    {
      id: 2,
      name: "Rudi Hartono",
      phone: "082345678901",
      address: "Jl. Sudirman No.10",
      birthDate: "1990-06-25",
      gender: "Laki-laki",
      email: "rudi@example.com",
    },
    {
      id: 3,
      name: "Siti Nurhaliza",
      phone: "083456789012",
      address: "Jl. Kenanga No.3",
      birthDate: "1998-11-30",
      gender: "Perempuan",
      email: "siti@example.com",
    },
    {
      id: 4,
      name: "Andi Saputra",
      phone: "084567890123",
      address: "Jl. Diponegoro No.5",
      birthDate: "1993-08-14",
      gender: "Laki-laki",
      email: "andi@example.com",
    },
    {
      id: 5,
      name: "Fitri Amelia",
      phone: "085678901234",
      address: "Jl. Melati No.8",
      birthDate: "1996-02-02",
      gender: "Perempuan",
      email: "fitri@example.com",
    },
  ];

  const [customers, setCustomers] = useState(() => {
    const stored = localStorage.getItem("customers");
    return stored ? JSON.parse(stored) : dummyData;
  });

  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    birthDate: "",
    gender: "",
    email: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (index) => {
    setFormData({ ...customers[index] });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus pelanggan ini?")) {
      const updated = [...customers];
      updated.splice(index, 1);
      setCustomers(updated);
    }
  };

  const handleUpdateCustomer = () => {
    const updated = [...customers];
    updated[editIndex] = { ...formData, id: customers[editIndex].id };
    setCustomers(updated);
    setEditIndex(null);
    setFormData({
      name: "",
      phone: "",
      address: "",
      birthDate: "",
      gender: "",
      email: "",
    });
  };

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender =
      genderFilter === "all" || cust.gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  if (location.pathname === "/pelanggan/segmentasi") {
    return <Outlet />;
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Manajemen Pelanggan Apotek</h1>

      <div className="pb-2">
        <NavLink
          to="/pelanggan/segmentasi"
          className="text-cyan-600 hover:underline"
        >
          Segmentasi Pelanggan
        </NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-teal-600 text-white p-4 rounded-lg shadow">
          <div className="text-3xl mb-1">👥</div>
          <h2 className="text-sm">Total Pelanggan</h2>
          <p className="text-xl font-semibold">{customers.length} Pelanggan</p>
          <p className="text-xs">Meningkat 8% dari bulan lalu</p>
        </div>
        <div className="bg-white p-4 border rounded-lg shadow">
          <div className="text-3xl mb-1">🆕</div>
          <h2 className="text-sm text-gray-600">Pelanggan Baru</h2>
          <p className="text-xl font-semibold text-gray-900">75 Pelanggan</p>
          <p className="text-xs text-gray-500">Meningkat 6% dari bulan lalu</p>
        </div>
        <div className="bg-white p-4 border rounded-lg shadow">
          <div className="text-3xl mb-1">🔁</div>
          <h2 className="text-sm text-gray-600">Pelanggan Berulang</h2>
          <p className="text-xl font-semibold text-gray-900">35%</p>
          <p className="text-xs text-gray-500">Meningkat 2% dari bulan lalu</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Cari berdasarkan nama, alamat, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border rounded shadow-sm"
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
        <div className="p-6 bg-white border rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Edit Pelanggan</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["name", "phone", "email", "address", "birthDate"].map((field) => (
              <div key={field}>
                <label className="block mb-1 font-medium capitalize">
                  {field === "birthDate" ? "Tanggal Lahir" : field === "phone" ? "No. Telepon" : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "birthDate" ? "date" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            ))}
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
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleUpdateCustomer}
              className="px-4 py-2 text-white rounded"
              style={{ backgroundColor: "#33BFBF" }}
            >
              Simpan Perubahan
            </button>
            <button
              onClick={() => {
                setEditIndex(null);
                setFormData({
                  name: "",
                  phone: "",
                  address: "",
                  birthDate: "",
                  gender: "",
                  email: "",
                });
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Nama</th>
              <th className="px-4 py-2 text-left">Alamat</th>
              <th className="px-4 py-2 text-left">No Telepon</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-center">Tanggal Lahir</th>
              <th className="px-4 py-2 text-center">Jenis Kelamin</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Tidak ada pelanggan ditemukan.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((cust, index) => (
                <tr key={cust.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{cust.name}</td>
                  <td className="px-4 py-2">{cust.address}</td>
                  <td className="px-4 py-2">{cust.phone}</td>
                  <td className="px-4 py-2">{cust.email}</td>
                  <td className="px-4 py-2 text-center">{cust.birthDate}</td>
                  <td className="px-4 py-2 text-center">{cust.gender}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(customers.indexOf(cust))}
                      className="px-2 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(customers.indexOf(cust))}
                      className="px-2 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      🗑️
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
