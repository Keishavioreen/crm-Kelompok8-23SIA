import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [coupon, setCoupon] = useState('');
  const [showInvalid, setShowInvalid] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCheckoutNotif, setShowCheckoutNotif] = useState(false); // Notifikasi checkout
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() !== 'diskon10') {
      setShowInvalid(true);
      setTimeout(() => setShowInvalid(false), 2500);
    }
  };

  const handleRemoveItem = (indexToRemove) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus produk ini?");
    if (confirmDelete) {
      const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleClearCart = () => {
    const confirmClear = window.confirm("Yakin ingin menghapus semua produk di keranjang?");
    if (confirmClear) {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  };

  const handleQtyChange = (index, qty) => {
    const updatedCart = [...cartItems];
    updatedCart[index].qty = qty;
    updatedCart[index].hargaTotal = updatedCart[index].harga * qty;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    setShowCheckoutNotif(true);
  
    // Kosongkan keranjang
    setCartItems([]); 
    localStorage.removeItem("cart"); // Hapus data keranjang dari localStorage
  
    // Tutup notifikasi setelah beberapa detik
    setTimeout(() => {
      setShowCheckoutNotif(false);
    }, 3000);
  };
  

  const subtotal = cartItems.reduce((total, item) => total + (item.harga * item.qty), 0);
  const diskon = coupon.trim().toLowerCase() === 'diskon10' ? subtotal * 0.1 : 0;
  const pajak = 2000;
  const total = subtotal - diskon + pajak;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 relative overflow-hidden">
      {/* Notifikasi kupon tidak valid */}
      {showInvalid && (
        <div className="absolute inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-transparent"></div>
          <div className="bg-white px-12 py-8 rounded-lg shadow-xl text-center z-50 border border-red-500">
            <p className="text-xl font-bold text-red-600">Kupon Invalid</p>
            <div className="mt-2 text-red-600 text-lg font-bold">•</div>
          </div>
        </div>
      )}

      {/* Notifikasi checkout */}
      {showCheckoutNotif && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white px-12 py-8 rounded-lg shadow-lg text-center z-50 border border-green-500">
            <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 Pembelian Berhasil!</h1>
            <p className="text-gray-700 text-sm mb-6">
              Terima kasih telah berbelanja! Pesanan Anda sedang diproses.
            </p>
            <button
              className="bg-[#007676] text-white px-4 py-2 rounded text-sm hover:bg-[#006060] transition"
              onClick={() => setShowCheckoutNotif(false)}
            >
              Oke
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#007676] mb-10 text-left">Keranjang Belanja</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img src={item.gambar} alt={item.nama_obat} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="text-base font-semibold text-gray-800">{item.nama_obat}</p>
                    <button
                      className="text-xs text-red-500 hover:underline"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-sm text-gray-700 font-medium">
                    Rp {(item.harga * item.qty).toLocaleString()}
                  </p>
                  <select
                    className="border rounded px-3 py-1 text-sm"
                    value={item.qty}
                    onChange={(e) => handleQtyChange(index, Number(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1} pcs
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => navigate('/produk')}
                className="text-sm text-white bg-[#007676] px-5 py-2 rounded hover:bg-[#005d5d] transition"
              >
                Kembali Belanja
              </button>
              <button
                onClick={handleClearCart}
                className="text-sm text-red-600 hover:underline"
              >
                Hapus Semua
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Punya Kupon?</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Masukkan kode kupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border px-4 py-2 rounded text-sm"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-[#007676] text-white px-4 py-2 rounded text-sm hover:bg-[#006060]"
                >
                  Terapkan
                </button>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Diskon</span>
                <span>- Rp {diskon.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Pajak</span>
                <span>+ Rp {pajak.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-base">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#007676] text-white py-2 rounded font-medium hover:bg-[#006060]"
            >
              Checkout Sekarang
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm text-gray-500">
          <div>
            <p className="font-semibold">🔒 Pembayaran Aman</p>
            <p>Dijamin 100% aman dan terpercaya</p>
          </div>
          <div>
            <p className="font-semibold">📞 Dukungan Pelanggan</p>
            <p>Tim kami siap membantu 24/7</p>
          </div>
          <div>
            <p className="font-semibold">🚚 Gratis Ongkir</p>
            <p>Untuk pesanan tertentu</p>
          </div>
        </div>
      </div>
    </div>
  );
}
