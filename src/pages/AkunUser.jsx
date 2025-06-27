import React from "react";
import { Mail, Phone, Calendar, User, MapPin, Heart, Star, ShoppingCart, Edit, ImagePlus } from "lucide-react";

const AkunUser = () => {
  const user = {
    name: "Halimah Tussa'diah",
    email: "halimah@example.com",
    phone: "0812-3456-7890",
    birthDate: "15 Juni 2002",
    gender: "Perempuan",
    address: "Jl. Merdeka No. 10, Pekanbaru, Riau",
    loyaltyLevel: "Gold",
    loyaltyProgress: 89,
    purchases: [
      {
        name: "Panadol Tablet",
        date: "29-03-2025 09:00 AM",
        quantity: "1 kotak",
        total: "Rp 12.000",
      },
    ],
    medicalHistory: [
      {
        disease: "Diabetes Mellitus",
        year: 2022,
        status: "Masih dalam pengawasan",
        treatment: "Insulin, diet rendah gula",
      },
    ],
  };

  return (
    <div className="p-8 max-w-7xl mx-auto text-gray-800 space-y-8">
      <h1 className="text-4xl font-bold text-[#007676] mb-10 text-left">Akun</h1>

      {/* Edit dan Foto Profil */}
      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">
          <Edit size={16} /> Edit Profil
        </button>
        <button className="flex items-center gap-2 text-cyan-600 hover:underline">
          <ImagePlus size={16} /> Unggah Foto Profil
        </button>
      </div>

      {/* Identitas Akun */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><User size={20} /> Identitas Pengguna</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <User size={16} className="text-cyan-600" /> <span className="font-medium">Nama:</span> {user.name}
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-cyan-600" /> <span className="font-medium">Email:</span> {user.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-cyan-600" /> <span className="font-medium">No. Telepon:</span> {user.phone}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-cyan-600" /> <span className="font-medium">Tanggal Lahir:</span> {user.birthDate}
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="text-cyan-600" /> <span className="font-medium">Jenis Kelamin:</span> {user.gender}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-cyan-600" /> <span className="font-medium">Alamat:</span> {user.address}
          </div>
        </div>
      </div>

      {/* Loyalty */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Star size={20} /> Loyalty</h2>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Level: {user.loyaltyLevel}</span>
          <span className="font-medium">{user.loyaltyProgress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
          <div
            className="h-full bg-cyan-600 rounded-full"
            style={{ width: `${user.loyaltyProgress}%` }}
          ></div>
        </div>
      </div>

      {/* History Pembelian & Riwayat Penyakit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* History Pembelian */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><ShoppingCart size={20} /> History Pembelian</h2>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2">Nama Barang</th>
                <th className="p-2">Tanggal Checkout</th>
                <th className="p-2">Jumlah Barang</th>
                <th className="p-2">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {user.purchases.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 text-xs text-gray-500">
            Menampilkan {user.purchases.length} dari {user.purchases.length}
          </div>
        </div>

        {/* Riwayat Penyakit */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Heart size={20} /> Riwayat Penyakit</h2>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2">Nama Penyakit</th>
                <th className="p-2">Tahun Diagnosis</th>
                <th className="p-2">Status saat ini</th>
                <th className="p-2">Pengobatan</th>
              </tr>
            </thead>
            <tbody>
              {user.medicalHistory.map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">{item.disease}</td>
                  <td className="p-2">{item.year}</td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2">{item.treatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 text-xs text-gray-500">
            Menampilkan {user.medicalHistory.length} dari {user.medicalHistory.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AkunUser;
