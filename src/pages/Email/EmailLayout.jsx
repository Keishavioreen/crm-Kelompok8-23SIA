// 1. EmailLayout.jsx (Layout Wrapper)
import { Outlet } from 'react-router-dom';

export default function EmailLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-xl font-bold mb-6">Email</h2>

        <div className="mb-6">
          <p className="text-gray-600 font-semibold mb-2">My Email</p>
          <ul className="space-y-2">
            <li className="font-medium text-gray-800">📥 Inbox <span className="float-right text-sm">1253</span></li>
            <li>⭐ Komplain <span className="float-right text-sm">245</span></li>
            <li>❓ Pertanyaan <span className="float-right text-sm">25</span></li>
            <li>📝 Info <span className="float-right text-sm">09</span></li>
            <li className="bg-blue-100 text-blue-700 rounded px-2 py-1">📂 Template <span className="float-right">5</span></li>
          </ul>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 font-semibold mb-2">Status</p>
          <ul className="space-y-1 text-sm">
            <li>⚠️ Belum Dibalas (14)</li>
            <li>✅ Dibalas (18)</li>
            <li>🗑️ Ditindaklanjuti (9)</li>
          </ul>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 font-semibold mb-2">Label</p>
          <ul className="space-y-1 text-sm">
            <li>🟢 Gold</li>
            <li>🔵 Silver</li>
            <li>🟣 Platinum</li>
            <li className="text-indigo-600 cursor-pointer hover:underline">+ Create New Label</li>
          </ul>
        </div>

        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded">+ Compose</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}