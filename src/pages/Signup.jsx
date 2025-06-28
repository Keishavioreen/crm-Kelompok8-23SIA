import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    birthDate: "",
    gender: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const {
      email,
      password,
      fullName,
      phoneNumber,
      address,
      birthDate,
      gender,
    } = formData;

    const { data: existingUser } = await supabase
  .from("akun")
  .select("email")
  .eq("email", email)
  .single();

if (existingUser) {
  setError("Email sudah terdaftar di sistem.");
  return;
}
    // 1. Registrasi ke Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // 2. Tambah ke tabel akun
    const genderFormatted =
      gender === "Male"
        ? "Laki-laki"
        : gender === "Female"
        ? "Perempuan"
        : "Other";

    const { error: insertError } = await supabase.from("akun").insert([
      {
        email,
        nama: fullName,
        nohp: phoneNumber,
        alamat: address,
        tanggal_lahir: birthDate,
        gender: genderFormatted,
        role: "user",
      },
    ]);

    if (insertError) {
      console.error("Insert akun error:", insertError);
      setError("Registrasi berhasil, tapi gagal menyimpan ke tabel akun.");
      return;
    }

    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center py-12">
      <div className="flex flex-col-reverse md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-5xl">
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center gap-6 mb-6">
            <img className="block w-35 h-auto" src="/logo2.png" alt="logo" />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-tosca text-white font-semibold rounded"
            >
              Register
            </button>
          </form>
        </div>
        <div className="md:w-1/2 bg-tosca text-white flex items-center justify-center p-8">
          <img
            src="/obat.jpg"
            alt="Illustration"
            className="w-full max-w-s mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;