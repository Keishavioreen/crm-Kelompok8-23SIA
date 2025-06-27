import React from "react";

const Trigger = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="p-6 bg-white shadow">
        <h1 className="text-xl font-semibold text-gray-800">Automation</h1>
      </div>
      <div className="p-6">
        <form className="bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label htmlFor="event-name" className="block text-sm font-medium text-gray-700">Nama Event</label>
            <input
              type="text"
              id="event-name"
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-tosca focus:border-tosca"
              placeholder="Event Ulang Tahun"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Penerima</label>
            <select
              id="recipient"
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-tosca focus:border-tosca"
            >
              <option>All Customer</option>
              <option>Silver Members</option>
              <option>Gold Members</option>
              <option>Platinum Members</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="template-chat" className="block text-sm font-medium text-gray-700">Template Chat</label>
            <textarea
              id="template-chat"
              rows="6"
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-tosca focus:border-tosca"
              placeholder="Selamat Ulang Tahun, [Nama Pelanggan]! 🎉\n\nHalo [Nama Pelanggan],\nSelamat Ulang Tahun! 🎉 Kami dari Apotek [Nama Apotek] ingin mengucapkan selamat ulang tahun dan semoga Anda selalu sehat, bahagia, dan sukses."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <a href="/Campaign" className="flex items-center gap-2 px-6 py-2 bg-tosca text-white rounded-md hover:bg-tosca-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tosca">
              Kirim
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Trigger;