import React, { useEffect, useState } from "react";
import {
  Mail, Phone, Calendar, User, MapPin,
  Heart, Star, ShoppingCart, Edit, ImagePlus, LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const AkunUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const { data: { user: sessionUser }, error: sessionError } = await supabase.auth.getUser();

      if (sessionUser && sessionUser.email) {
        const { data, error } = await supabase
          .from("akun")
          .select("*")
          .eq("email", sessionUser.email)
          .single();

        if (error) {
          console.error("User not found in akun table:", error.message);
        } else {
          setUser(data);
        }
      } else {
        console.error("Session tidak ditemukan:", sessionError?.message || "Belum login");
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto text-gray-800 space-y-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-[#007676] text-left">Akun</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:underline"
        >
          <LogOut size={16} /> Keluar
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">
          <Edit size={16} /> Edit Profil
        </button>
        <button className="flex items-center gap-2 text-cyan-600 hover:underline">
          <ImagePlus size={16} /> Unggah Foto Profil
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <User size={20} /> Identitas Pengguna
        </h2>
        {loading ? (
          <div className="text-sm text-gray-500">Memuat data pengguna...</div>
        ) : !user ? (
          <div className="text-sm text-red-500">Data pengguna tidak ditemukan.</div>
        ) : (
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <User size={16} className="text-cyan-600" />
              <span className="font-medium">Nama:</span> {user.nama}
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-cyan-600" />
              <span className="font-medium">Email:</span> {user.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-cyan-600" />
              <span className="font-medium">No. Telepon:</span> {user.nohp}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-cyan-600" />
              <span className="font-medium">Tanggal Lahir:</span> {user.tanggal_lahir}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-cyan-600" />
              <span className="font-medium">Jenis Kelamin:</span> {user.gender}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-cyan-600" />
              <span className="font-medium">Alamat:</span> {user.alamat}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Star size={20} /> Loyalty
        </h2>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Level: Gold</span>
          <span className="font-medium">89%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
          <div className="h-full bg-cyan-600 rounded-full" style={{ width: "89%" }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShoppingCart size={20} /> History Pembelian
          </h2>
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
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Panadol Tablet</td>
                <td className="p-2">29-03-2025 09:00 AM</td>
                <td className="p-2">1 kotak</td>
                <td className="p-2">Rp 12.000</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2 text-xs text-gray-500">Menampilkan 1 dari 1</div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Heart size={20} /> Riwayat Penyakit
          </h2>
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
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Diabetes Mellitus</td>
                <td className="p-2">2022</td>
                <td className="p-2">Masih dalam pengawasan</td>
                <td className="p-2">Insulin, diet rendah gula</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2 text-xs text-gray-500">Menampilkan 1 dari 1</div>
        </div>
      </div>
    </div>
  );
};

export default AkunUser;
