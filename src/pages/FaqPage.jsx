import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "Apakah kalian hanya menjual obat saja?",
    answer: "Kami juga menyediakan vitamin, alat kesehatan, serta layanan konsultasi dengan apoteker.",
  },
  {
    question: "Apakah pengiriman tersedia ke luar kota?",
    answer: "Ya, kami melayani pengiriman ke seluruh wilayah Indonesia.",
  },
  {
    question: "Apakah ada suplemen kesehatan juga?",
    answer: "Tentu saja. Kami menyediakan berbagai macam suplemen untuk kebutuhan kesehatan Anda.",
  },
  {
    question: "Bagaimana saya tahu kalau resep saya diterima?",
    answer: "Anda akan menerima notifikasi setelah resep divalidasi oleh apoteker.",
  },
  {
    question: "Apakah saya bisa bicara langsung dengan dokter?",
    answer: "Ya, kami menyediakan layanan konsultasi dengan dokter secara online.",
  },
  {
    question: "Apakah kalian punya aplikasi yang bisa diunduh?",
    answer: "Saat ini kami masih dalam tahap pengembangan aplikasi mobile.",
  },
  {
    question: "Apakah ada program loyalitas atau membership?",
    answer: "Ya, kami memiliki program loyalitas untuk pelanggan setia.",
  },
  {
    question: "Bisa nggak ubah alamat pengiriman setelah pesan?",
    answer: "Selama pesanan belum dikirim, Anda bisa mengubah alamat melalui pengaturan akun.",
  },
  {
    question: "Metode pembayaran apa saja yang bisa digunakan?",
    answer: "Kami mendukung transfer bank, e-wallet, dan pembayaran di gerai.",
  },
  {
    question: "Apakah bisa menggunakan resep digital?",
    answer: "Ya, Anda bisa mengunggah resep digital langsung melalui aplikasi.",
  },
  {
    question: "Bisa nggak mengembalikan obat yang belum dibuka?",
    answer: "Bisa, dengan syarat masih dalam masa retur dan kondisi baik.",
  },
  {
    question: "Apakah pesanan saya bisa dilacak?",
    answer: "Ya, Anda bisa melacak status pengiriman melalui dashboard akun.",
  },
  {
    question: "Ada diskon nggak buat pembeli pertama?",
    answer: "Kami memberikan potongan harga khusus untuk pembelian pertama Anda.",
  },
];

export default function FaqPage() {
  const [activeIndex, setActiveIndex] = useState(0); // Buka pertanyaan pertama

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-[#007676] mb-10 text-left">FAQ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`bg-white border rounded-xl shadow-sm p-4 transition-all duration-300 ${
              activeIndex === index ? "border-cyan-600" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-start w-full text-left"
            >
              <span className="text-md font-semibold text-gray-800">
                {faq.question}
              </span>
              <span className="text-cyan-600 ml-4">
                {activeIndex === index ? <Minus /> : <Plus />}
              </span>
            </button>
            {activeIndex === index && (
              <p className="mt-3 text-sm text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
