import React from "react";
import { Plus, Edit, Trash, Filter } from "lucide-react";

const Campaign = () => {
  const campaigns = [
    {
      name: "Ulang tahun",
      type: "Personal",
      segmentation: "Silver, Gold",
      schedule: "2025-06-15 09:00 WIB",
      status: "Aktif",
    },
    {
      name: "Welcome Message",
      type: "Personal",
      segmentation: "Platinum",
      schedule: "2025-06-15 09:00 WIB",
      status: "Aktif",
    },
    {
      name: "New product",
      type: "Promosi",
      segmentation: "All",
      schedule: "2025-06-15 09:00 WIB",
      status: "Aktif",
    },
    {
      name: "Diskon vitamin",
      type: "Promosi",
      segmentation: "Platinum, Silver",
      schedule: "2025-06-15 09:00 WIB",
      status: "Aktif",
    },
    {
      name: "Diskon 50%",
      type: "Promosi",
      segmentation: "Gold",
      schedule: "2025-06-15 09:00 WIB",
      status: "Aktif",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campaign</h1>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Cari apapun"
            className="w-full px-4 py-2 pl-10 text-sm rounded-full focus:outline-none bg-white border border-gray-300"
          />
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 12a5 5 0 100-10 5 5 0 000 10zm0 0l5 5"
            />
          </svg>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { title: "Total Campaign Aktif", value: "382 Pelanggan" },
          { title: "Campaign Selesai", value: "382 Pelanggan" },
          { title: "Pelanggan Tersegmentasi", value: "382 Pelanggan" },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-teal-500 text-white p-4 rounded-lg shadow-md flex items-center justify-center"
          >
            <div className="text-center">
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="text-xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Table */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Cari apapun"
            className="w-64 px-4 py-2 pl-10 text-sm rounded-full focus:outline-none bg-gray-50 border border-gray-300"
          />
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-teal-500 rounded-full hover:bg-teal-600">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nama Campaign</th>
              <th className="px-4 py-2 border-b">Jenis</th>
              <th className="px-4 py-2 border-b">Segmentasi</th>
              <th className="px-4 py-2 border-b">Jadwal Pengiriman</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{campaign.name}</td>
                <td className="px-4 py-2 border-b">{campaign.type}</td>
                <td className="px-4 py-2 border-b">{campaign.segmentation}</td>
                <td className="px-4 py-2 border-b">{campaign.schedule}</td>
                <td className="px-4 py-2 border-b">{campaign.status}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center gap-2">
                    <a href="/Trigger" className="text-teal-500 hover:text-teal-600">
                      <Plus className="w-4 h-4" />
                    </a>
                    <a href="#" className="text-blue-500 hover:text-blue-600">
                      <Edit className="w-4 h-4" />
                    </a>
                    <a href="#" className="text-red-500 hover:text-red-600">
                      <Trash className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Campaign;