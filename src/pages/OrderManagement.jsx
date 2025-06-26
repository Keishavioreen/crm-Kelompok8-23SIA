import React, { useState } from 'react';

const initialOrders = [
  {
    id: 'ORD-001',
    kodeApotek: 'APTK-007676',
    products: [
      { name: 'Paracetamol 2 Strip', price: 15000 },
      { name: 'Vitamin C 1 Botol', price: 15000 }
    ],
    date: '10/06/2025',
    status: 'Menunggu'
  },
  {
    id: 'ORD-002',
    kodeApotek: 'APTK-007676',
    products: [
      { name: 'Paracetamol 2 Strip', price: 15000 }
    ],
    date: '10/06/2025',
    status: 'Diproses'
  }
];

export default function OrderManagement() {
  const [orders, setOrders] = useState(initialOrders);
  const [expandedId, setExpandedId] = useState(null);
  const [tempStatus, setTempStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const toggleDetail = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
    setTempStatus(prev => ({
      ...prev,
      [id]: orders.find(order => order.id === id)?.status || ''
    }));
  };

  const handleStatusChange = (id, value) => {
    setTempStatus(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = (id) => {
    const newOrders = orders.map(order =>
      order.id === id ? { ...order, status: tempStatus[id] } : order
    );
    setOrders(newOrders);
    setExpandedId(null);
    setTempStatus(prev => {
      const newStatus = { ...prev };
      delete newStatus[id];
      return newStatus;
    });
  };

  const getStatusStyle = (status) => {
    const styles = {
      Menunggu: 'bg-yellow-100 text-yellow-800',
      Diproses: 'bg-blue-100 text-blue-800',
      Dianter: 'bg-purple-100 text-purple-800',
      Selesai: 'bg-green-100 text-green-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.kodeApotek.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === '' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Order Management</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Cari ID, Kode Apotek, atau Produk"
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 px-4 py-2 border rounded shadow"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Semua Status</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Diproses">Diproses</option>
          <option value="Dianter">Dianter</option>
          <option value="Selesai">Selesai</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Kode Apotek</th>
              <th className="px-4 py-2">Produk</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const total = order.products.reduce((acc, p) => acc + p.price, 0);
                return (
                  <React.Fragment key={order.id}>
                    <tr className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{order.id}</td>
                      <td className="px-4 py-2">{order.kodeApotek}</td>
                      <td className="px-4 py-2">{order.products.map(p => p.name).join(', ')}</td>
                      <td className="px-4 py-2">{order.date}</td>
                      <td className="px-4 py-2">Rp {total.toLocaleString()}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-blue-600 cursor-pointer" onClick={() => toggleDetail(order.id)}>
                        {expandedId === order.id ? 'Tutup' : 'Detail'}
                      </td>
                    </tr>

                    {expandedId === order.id && (
                      <tr className="bg-gray-50 border-b">
                        <td colSpan="7" className="p-4">
                          <h3 className="font-semibold mb-2">Detail Pesanan</h3>
                          <p><strong>Kode Apotek:</strong> {order.kodeApotek}</p>
                          <p><strong>Tanggal:</strong> {order.date}</p>
                          <p><strong>Total:</strong> Rp {total.toLocaleString()}</p>

                          <div className="mt-2">
                            <strong>Produk:</strong>
                            <ul className="list-disc ml-5">
                              {order.products.map((p, i) => (
                                <li key={i}>{p.name} (Rp {p.price.toLocaleString()})</li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-4">
                            <label className="block font-medium mb-1">Status</label>
                            <select
                              className="border p-2 rounded w-full max-w-xs"
                              value={tempStatus[order.id] || ''}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            >
                              <option value="Menunggu">Menunggu</option>
                              <option value="Diproses">Diproses</option>
                              <option value="Dianter">Dianter</option>
                              <option value="Selesai">Selesai</option>
                            </select>
                          </div>

                          <div className="mt-4 flex gap-2">
                            <button
                              className="text-white px-4 py-2 rounded shadow"
                              style={{ backgroundColor: '#007676' }}
                              onClick={() => handleSave(order.id)}
                            >
                              Simpan
                            </button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded shadow">
                              Kirim Notif
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
