import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { ShoppingCart } from "lucide-react";

const categories = [
  "Perawatan Kecantikan", "Nutrisi Olahraga", "Nutrisi & Suplemen",
  "Perawatan Kesehatan", "Perawatan Pribadi", "Obat-obatan", "Mother & Baby Care"
];

const brands = [
  "Abbott", "GSK", "Gentz", "Hemani", "Mothercare", "Unilever", "Hashmi"
];

const ProductUser = () => {
  const [sortOption, setSortOption] = useState("featured");
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchProduk = async () => {
      setLoading(true);
      let query = supabase.from("produk").select("*");

      if (sortOption === "newest") {
        query = query.order("created_at", { ascending: false });
      } else if (sortOption === "low") {
        query = query.order("harga", { ascending: true });
      } else if (sortOption === "high") {
        query = query.order("harga", { ascending: false });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        console.error("Gagal mengambil produk:", error.message);
      } else {
        setProdukList(data);
      }
      setLoading(false);
    };

    fetchProduk();
  }, [sortOption]);

  const handleAddToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = existingCart.findIndex((i) => i.id === item.id);
    let updatedCart;

    if (index !== -1) {
      existingCart[index].qty = (existingCart[index].qty || 1) + 1;
      updatedCart = existingCart;
    } else {
      updatedCart = [...existingCart, { ...item, qty: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setNotification(`${item.nama_obat} ditambahkan ke keranjang.`);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-6" style={{ color: "#007676" }}>Produk</h1>

      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
          {notification}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-1/4 w-full space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Kategori</h3>
            <ul className="text-sm space-y-1">
              {categories.map((cat) => (
                <li key={cat} className="cursor-pointer hover:text-cyan-600">› {cat}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Brand</h3>
            <ul className="text-sm space-y-2">
              {brands.map((brand) => (
                <li key={brand} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-cyan-600" />
                  {brand}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Produk */}
        <main className="lg:w-3/4 w-full space-y-4">
          <div className="flex justify-between items-center">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border px-4 py-2 rounded text-sm"
            >
              <option value="featured">Featured</option>
              <option value="newest">Paling Baru</option>
              <option value="low">Harga Terendah</option>
              <option value="high">Harga Tertinggi</option>
            </select>
          </div>

          {/* Grid Produk */}
          {loading ? (
            <p className="text-center text-gray-500">Memuat data...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {produkList.length > 0 ? (
                produkList.map((item) => (
                  <div key={item.id} className="bg-white shadow rounded-xl p-4 flex flex-col">
                    <img
                      src={item.gambar}
                      alt={item.nama_obat}
                      className="rounded-lg mb-3 mx-auto w-28 h-28 object-contain"
                    />
                    <div className="text-xs text-gray-500">{item.kategori}</div>
                    <div className="text-sm font-semibold">{item.nama_obat}</div>
                    <div className="text-cyan-700 font-bold text-sm mt-1">
                      Rp {Number(item.harga).toLocaleString()}
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="mt-auto bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded-lg px-4 py-2 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} /> Beli
                    </button>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">Tidak ada produk tersedia.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductUser;
