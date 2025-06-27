import React, { useState } from 'react';

export default function CartPage() {
  const [coupon, setCoupon] = useState('');
  const [showInvalid, setShowInvalid] = useState(false);

  const cartItems = [
    {
      name: 'Panadol Tablets',
      price: 12000,
      qty: 9,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGHXgpzoIJ8OKEIMpV4MvkY5VbjdA6EiKFg&s',
    },
    {
      name: 'Softin Tablets',
      price: 15000,
      qty: 3,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGHXgpzoIJ8OKEIMpV4MvkY5VbjdA6EiKFg&s',
    },
    {
      name: 'Betadine Obat Kumur 250 Ml',
      price: 14000,
      qty: 1,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGHXgpzoIJ8OKEIMpV4MvkY5VbjdA6EiKFg&s',
    },
  ];

  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() !== 'diskon10') {
      setShowInvalid(true);
      setTimeout(() => setShowInvalid(false), 2500); // hide after 2.5s
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 relative overflow-hidden">
      {/* ALERT Kupon Invalid dengan latar blur */}
      {showInvalid && (
        <div className="absolute inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-transparent"></div>
          <div className="bg-white px-12 py-8 rounded-lg shadow-xl text-center z-50 border border-red-500">
            <p className="text-xl font-bold text-red-600">Kupon Invalid</p>
            <div className="mt-2 text-red-600 text-lg font-bold">•</div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#007676] mb-10 text-left">Keranjang Belanja</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daftar Barang */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="text-base font-semibold text-gray-800">{item.name}</p>
                    <button className="text-xs text-red-500 hover:underline">Hapus</button>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-sm text-gray-700 font-medium">
                    Rp {item.price.toLocaleString()}
                  </p>
                  <select className="border rounded px-3 py-1 text-sm" defaultValue={item.qty}>
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
              <button className="text-sm text-white bg-[#007676] px-5 py-2 rounded hover:bg-[#005d5d] transition">
                Kembali Belanja
              </button>
              <button className="text-sm text-red-600 hover:underline">Hapus Semua</button>
            </div>
          </div>

          {/* Ringkasan Belanja */}
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
                <span>Rp 120.000</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Diskon</span>
                <span>- Rp 12.000</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Pajak</span>
                <span>+ Rp 2.000</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-base">
                <span>Total</span>
                <span>Rp 110.000</span>
              </div>
            </div>

            <button className="w-full bg-[#007676] text-white py-2 rounded font-medium hover:bg-[#006060]">
              Checkout Sekarang
            </button>
          </div>
        </div>

        {/* Footer Info */}
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
