import { useState } from "react";
import { Link } from "react-router-dom";
import { Crown, Gem, Medal } from "lucide-react";

const dummyEmails = [
  {
    id: 1,
    name: "Andi Wijaya",
    category: "Komplain",
    label: "Tinggi",
    messages: [
      {
        from: "user",
        text:
          "Halo, saya baru saja menerima paket obat saya (OBH Combi), tapi ternyata botolnya bocor dan sebagian isinya tumpah ke dalam kardus. Mohon bantuannya ya, apakah bisa ditukar atau dikembalikan?",
        time: "6.30 pm",
      },
      {
        from: "admin",
        text:
          "Hai Kak Andi,\nMohon maaf atas ketidaknyamanan yang terjadi. Kami sangat menghargai laporan ini. Silakan kirimkan foto kondisi barang dan nomor pesanan ke email ini. Kami akan segera memproses penggantian barang atau pengembalian dana sesuai kebijakan. Terima kasih atas pengertiannya 🙏",
        time: "6.34 pm",
      },
      {
        from: "user",
        text: "Segera ya kak",
        time: "6.38 pm",
      },
    ],
  },
];

export default function EmailInbox() {
  const [selectedEmail, setSelectedEmail] = useState(dummyEmails[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const updated = {
      ...selectedEmail,
      messages: [
        ...selectedEmail.messages,
        { from: "admin", text: newMessage, time: "Sekarang" },
      ],
    };

    setSelectedEmail(updated);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar Email */}
      <aside className="w-72 bg-white p-5 border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">My Email</h2>

        {/* Menu Email */}
        <ul className="space-y-1 text-sm">
          <li className="font-semibold text-gray-800">
            📥 Inbox <span className="float-right">1253</span>
          </li>
          <li>⭐ Komplain <span className="float-right">245</span></li>
          <li>❓ Pertanyaan <span className="float-right">25</span></li>
          <li>📝 Info <span className="float-right">9</span></li>
          <li>
            <Link
              to="/email/template"
              className="flex justify-between items-center hover:text-teal-600"
            >
              📄 Template <span className="float-right">5</span>
            </Link>
          </li>
        </ul>

        <hr className="my-4" />

        {/* Status */}
        <div>
          <p className="font-semibold text-sm">Status</p>
          <ul className="text-sm mt-1 space-y-1">
            <li>⚠️ Belum Dibalas (14)</li>
            <li>✅ Dibalas (18)</li>
            <li>📌 Ditindaklanjuti (9)</li>
          </ul>
        </div>

        <hr className="my-4" />

        {/* Label */}
        <div>
          <p className="font-semibold text-sm">Label</p>
          <ul className="text-sm mt-1 space-y-1">
            <li className="flex items-center gap-2 text-yellow-500 font-semibold">
              <Crown size={16} /> Gold Member
            </li>
            <li className="flex items-center gap-2 text-blue-400 font-semibold">
              <Gem size={16} /> Platinum Member
            </li>
            <li className="flex items-center gap-2 text-gray-500 font-semibold">
              <Medal size={16} /> Silver Member
            </li>
          </ul>
        </div>

        <button className="mt-6 w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 text-sm">
          + Compose
        </button>
      </aside>

      {/* Panel Chat */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">
            {selectedEmail.name}
            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded ml-2">
              {selectedEmail.label}
            </span>
          </h3>
          <div className="space-x-3 text-gray-500">
            <button>⭐</button>
            <button>🖨️</button>
            <button>🗑️</button>
          </div>
        </header>

        {/* Chat */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {selectedEmail.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.from === "admin" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-lg p-3 text-sm whitespace-pre-line rounded-xl ${
                  msg.from === "admin"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
                <div className="text-xs text-right mt-1 opacity-80">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <footer className="p-3 border-t flex items-center gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write message"
            className="flex-1 border rounded-md p-2 text-sm resize-none h-10"
          />
          <button
            onClick={handleSend}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
          >
            Send ➤
          </button>
        </footer>
      </main>
    </div>
  );
}
