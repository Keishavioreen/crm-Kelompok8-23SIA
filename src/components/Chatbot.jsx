import { useState } from "react";

export default function Chatbot() {
  // Fungsi untuk mendapatkan waktu saat ini
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo! Ada yang bisa saya bantu?", time: getCurrentTime() },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // state untuk mengontrol tampilan chatbot

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input, time: getCurrentTime() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulasi balasan FAQ
    setTimeout(() => {
      const response = generateResponse(input);
      const botMessage = { sender: "bot", text: response, time: getCurrentTime() };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleClickQuestion = (question) => {
    const userMessage = { sender: "user", text: question, time: getCurrentTime() };
    setMessages((prev) => [...prev, userMessage]);
    setTimeout(() => {
      const response = generateResponse(question);
      const botMessage = { sender: "bot", text: response, time: getCurrentTime() };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const generateResponse = (question) => {
    switch (question.toLowerCase()) {
      case "apakah ini ready stock?":
        return "Iya, produk tersedia kak.";
      case "kapan pesanan saya akan dikirim?":
        return "Pesanan akan dikirim maksimal H+1.";
      case "berapa lama pengiriman pesanan saya?":
        return "Waktu pengiriman tergantung lokasi kak, biasanya 2-3 hari.";
      case "bagaimana cara dapat gratis ongkir?":
        return "Gratis ongkir tersedia untuk pembelian di atas Rp100.000.";
      case "apakah ada promosi?":
        return "Lagi ada promo 10% minggu ini kak!";
      case "apakah ada panduan ukurannya?":
        return "Bisa cek di deskripsi produk ya.";
      case "apakah produknya masih ada?":
        return "Masih tersedia kak, silakan checkout ya.";
      default:
        return "Maaf, saya belum mengerti pertanyaannya. Bisa ulangi lagi?";
    }
  };

  const faqList = [
    "Apakah ini ready stock?",
    "Kapan pesanan saya akan dikirim?",
    "Berapa lama pengiriman pesanan saya?",
    "Bagaimana cara dapat gratis ongkir?",
    "Apakah ada promosi?",
    "Apakah ada panduan ukurannya?",
    "Apakah produknya masih ada?",
  ];

  return (
    <div>
      {/* Tombol untuk membuka atau menutup chatbot */}
      <button 
        className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)} // Toggle chatbot
      >
        {isOpen ? "X" : "+"} {/* Tanda buka dan tutup */}
      </button>

      {/* Chatbot container */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden flex flex-col max-h-[80vh]">
          <div className="bg-blue-500 text-white p-3 font-semibold">
            Asisten Apotek
            <button 
              className="absolute top-2 right-2 text-white text-lg"
              onClick={() => setIsOpen(false)} // Close chatbot
            >
              &times;
            </button>
          </div>
          <div className="p-3 flex-1 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs p-3 rounded-2xl text-sm relative whitespace-pre-wrap break-words
                    ${msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"}`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 p-2">
            <div className="text-xs text-gray-500 mb-1">Pertanyaan cepat:</div>
            <div className="flex flex-wrap gap-1 mb-2">
              {faqList.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleClickQuestion(q)}
                  className="text-blue-600 text-xs underline hover:text-blue-800"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              <input
                className="flex-1 border rounded-full px-3 py-1 text-sm"
                placeholder="Tulis pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white text-sm px-4 py-1 rounded-full hover:bg-blue-600"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
