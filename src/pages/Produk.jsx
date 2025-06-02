import React, { useState, useEffect } from "react";

export default function ProductManagement() {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    type: "",
    stock: "",
    price: "",
    expired: "",
    imageFile: null,
    imageUrl: "",
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddOrUpdateProduct = () => {
    const { code, name, type, stock, price, expired, imageUrl } = formData;
    if (!code || !name || !type || !stock || !price || !expired || !imageUrl) {
      alert("Semua kolom harus diisi");
      return;
    }

    const newProduct = {
      id: Date.now(),
      code,
      name,
      type,
      stock: parseInt(stock),
      price: parseFloat(price),
      expired,
      imageUrl,
    };

    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = newProduct;
      setProducts(updated);
    } else {
      setProducts([...products, newProduct]);
    }

    setFormData({
      code: "",
      name: "",
      type: "",
      stock: "",
      price: "",
      expired: "",
      imageFile: null,
      imageUrl: "",
    });
    setShowForm(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const prod = products[index];
    setFormData({ ...prod, imageFile: null });
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      const updated = [...products];
      updated.splice(index, 1);
      setProducts(updated);
    }
  };

  const isExpired = (date) => new Date(date) < new Date();
  const isLowStock = (stock) => stock <= 10;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manajemen Produk Apotek</h1>

      <button
        onClick={() => {
          setShowForm((prev) => !prev);
          setFormData({
            code: "",
            name: "",
            type: "",
            stock: "",
            price: "",
            expired: "",
            imageFile: null,
            imageUrl: "",
          });
          setEditIndex(null);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showForm ? "Batal" : "Tambah Produk"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded bg-white shadow-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Kode Produk</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Nama Produk</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Jenis Produk</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Pilih Jenis</option>
                <option value="Obat">Obat</option>
                <option value="Alkes">Alat Kesehatan</option>
                <option value="Suplemen">Suplemen</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Stok</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                min="0"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Harga</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                min="0"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Kadaluarsa</label>
              <input
                type="date"
                name="expired"
                value={formData.expired}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Gambar Produk</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
              />
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="mt-2 w-20 h-20 object-cover rounded"
                />
              )}
            </div>
          </div>
          <button
            onClick={handleAddOrUpdateProduct}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editIndex !== null ? "Update Produk" : "Simpan Produk"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Gambar</th>
              <th className="px-4 py-2">Kode</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Jenis</th>
              <th className="px-4 py-2 text-right">Stok</th>
              <th className="px-4 py-2 text-right">Harga</th>
              <th className="px-4 py-2 text-center">Kadaluarsa</th>
              <th className="px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={isExpired(product.expired) ? "bg-red-50" : ""}
              >
                <td className="px-4 py-2 text-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{product.code}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.type}</td>
                <td className="px-4 py-2 text-right">
                  {product.stock}
                  {isLowStock(product.stock) && (
                    <span className="ml-2 text-xs text-red-500">(Rendah)</span>
                  )}
                </td>
                <td className="px-4 py-2 text-right">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(product.price)}
                </td>
                <td className="px-4 py-2 text-center">
                  {isExpired(product.expired) ? (
                    <span className="text-red-600 font-semibold">Kadaluarsa</span>
                  ) : (
                    product.expired
                  )}
                </td>
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
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  Tidak ada produk ditambahkan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}