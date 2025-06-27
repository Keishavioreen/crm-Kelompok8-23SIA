import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGuides } from "../context/GuideContext";

export default function GuideForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const { guides, addGuide, updateGuide } = useGuides();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    status: "Aktif",
    tipe: "",         // ✅ ditambahkan field tipe
    template: "",
  });

  useEffect(() => {
    if (editing) {
      const existing = guides.find((g) => g.id === Number(id));
      if (existing) setForm(existing);
    }
  }, [editing, id, guides]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    editing ? updateGuide(Number(id), form) : addGuide(form);
    navigate("/faq");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">{editing ? "Edit" : "Tambah"} Panduan</h1>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Judul Panduan"
        required
        className="border px-3 py-2 w-full rounded"
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Kategori"
        className="border px-3 py-2 w-full rounded"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border px-3 py-2 w-full rounded"
      >
        <option value="Aktif">Aktif</option>
        <option value="Draft">Draft</option>
      </select>

      {/* ✅ Tipe Panduan */}
      <select
        name="tipe"
        value={form.tipe}
        onChange={handleChange}
        className="border px-3 py-2 w-full rounded"
        required
      >
        <option value="">Pilih Tipe Panduan</option>
        <option value="Video">Video</option>
        <option value="Artikel">Artikel</option>
        <option value="Langkah-langkah">Langkah-langkah</option>
      </select>

      <textarea
        name="template"
        value={form.template}
        onChange={handleChange}
        placeholder="Isi Panduan"
        className="border px-3 py-2 w-full rounded"
        rows={5}
      />

      <button className="bg-teal-600 text-white px-4 py-2 rounded">
        {editing ? "Simpan Perubahan" : "Tambah Panduan"}
      </button>
    </form>
  );
}
