import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash, Filter } from "lucide-react";
import { supabase } from "../supabase";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase.from("campaign").select("*");
      if (error) throw error;
      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns:", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Anda yakin ingin menghapus campaign ini?")) {
      try {
        const { error } = await supabase.from("campaign").delete().eq("id", id);
        if (error) throw error;
        alert("Campaign berhasil dihapus!");
        fetchCampaigns();
      } catch (error) {
        console.error("Error deleting campaign:", error.message);
        alert("Gagal menghapus campaign. Silakan coba lagi.");
      }
    }
  };

  const handleEdit = (campaign) => {
    setEditData(campaign);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("campaign")
        .update({
          nama_campaign: editData.nama_campaign,
          jenis: editData.jenis,
          segmentasi: editData.segmentasi,
          jadwal_pengiriman: editData.jadwal_pengiriman,
          status: editData.status,
          judul: editData.judul,
          template_chat: editData.template_chat,
        })
        .eq("id", editData.id);

      if (error) throw error;
      alert("Campaign berhasil diperbarui!");
      setEditData(null);
      fetchCampaigns();
    } catch (error) {
      console.error("Error updating campaign:", error.message);
      alert("Gagal memperbarui campaign. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

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
          { title: "Total Campaign Aktif", value: `${campaigns.length} Campaign` },
          { title: "Campaign Selesai", value: `${campaigns.length} Campaign` },
          
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

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Cari apapun"
            className="w-64 px-4 py-2 pl-10 text-sm rounded-full focus:outline-none bg-gray-50 border border-gray-300"
          />

          <div className="flex gap-4">
            <a
              href="/TambahCampaign"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-teal-500 rounded-full hover:bg-teal-600"
            >
              <Plus className="w-4 h-4" /> Tambah Campaign
            </a>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-teal-500 rounded-full hover:bg-teal-600">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nama Campaign</th>
              <th className="px-4 py-2 border-b">Jenis</th>
              <th className="px-4 py-2 border-b">Segmentasi</th>
              <th className="px-4 py-2 border-b">Jadwal Pengiriman</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Judul</th>
              <th className="px-4 py-2 border-b">Template</th>
              <th className="px-4 py-2 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td className="px-4 py-2 border-b">{campaign.nama_campaign}</td>
                <td className="px-4 py-2 border-b">{campaign.jenis}</td>
                <td className="px-4 py-2 border-b">{campaign.segmentasi}</td>
                <td className="px-4 py-2 border-b">{campaign.jadwal_pengiriman}</td>
                <td className="px-4 py-2 border-b">{campaign.status}</td>
                <td className="px-4 py-2 border-b">{campaign.judul}</td>
                <td className="px-4 py-2 border-b">{campaign.template_chat}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(campaign)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(campaign.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            className="bg-white p-6 rounded shadow-md w-96"
            onSubmit={handleUpdate}
          >
            <h2 className="text-lg font-bold mb-4">Edit Campaign</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Nama Campaign</label>
              <input
                type="text"
                name="nama_campaign"
                value={editData.nama_campaign}
                onChange={(e) =>
                  setEditData({ ...editData, nama_campaign: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setEditData(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 text-white rounded-md"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Campaign;
