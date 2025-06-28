// pages/EmailTemplateForm.jsx
import React, { useState } from "react";

export default function EmailTemplateForm() {
  const [form, setForm] = useState({ title: "", category: "", content: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Template disimpan! (simulasi)");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-6">Tambah Template</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block mb-1 font-semibold">Judul Template</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Masukkan Judul"
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-semibold">Kategori</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Masukkan Kategori"
          />
        </div>
        <div className="col-span-2">
          <label className="block mb-1 font-semibold">Isi Template</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Masukkan Isi"
            rows={5}
          />
        </div>
        <div className="col-span-2 text-right">
          <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
