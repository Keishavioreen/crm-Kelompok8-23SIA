import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const Signin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    // 1. Login ke Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email atau password salah.");
      return;
    }

    // 2. Validasi apakah user juga terdaftar di tabel akun
    const { data: akunData, error: akunError } = await supabase
      .from("akun")
      .select("*")
      .eq("email", email)
      .single();

    if (akunError || !akunData) {
      await supabase.auth.signOut(); // Logout paksa
      setError("Akun tidak ditemukan. Silakan daftar terlebih dahulu.");
      return;
    }

    // 3. Berhasil login dan ada di tabel akun
    navigate("/Home");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col-reverse md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-6 mb-6">
            <img className="block w-35 h-auto" src="/logo2.png" alt="logo" />
          </div>
          <h2 className="text-4xl font-extrabold text-tosca mb-4">Welcome Back!</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded mb-4"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-tosca text-white rounded"
            >
              Login Now
            </button>
          </form>
          <p className="mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-tosca hover:underline">
              Sign Up
            </a>
          </p>
        </div>
        <div className="md:w-1/2 bg-tosca flex items-center justify-center p-6">
          <img
            src="/obat.jpg"
            alt="Illustration"
            className="max-h-120 w-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
