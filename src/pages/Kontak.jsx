import React, { useState } from 'react';

const Kontak = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    topik: '',
    pesan: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini Anda bisa menambahkan logika untuk mengirim formulir,
    // misalnya ke API atau email service.
    // Untuk contoh ini, kita hanya akan log data ke konsol.
    console.log('Form data submitted:', formData);
    alert('Pesan Anda telah terkirim!');
    setFormData({ nama: '', email: '', topik: '', pesan: '' }); // Reset form
  };

  return (
    <div className="font-sans text-gray-800">

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center md:text-left">Kontak</h1>

          {/* Contact Form Section */}
          <section className="bg-white p-8 rounded-lg shadow-md mb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="topik" className="block text-sm font-medium text-gray-700 mb-2">Topik</label>
                <input
                  type="text"
                  id="topik"
                  name="topik"
                  value={formData.topik}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                <textarea
                  id="pesan"
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-tosca text-white font-medium rounded-md hover:bg-tosca-200 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                KIRIM PESAN
              </button>
            </form>
          </section>

          {/* Contact Information Section */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">INFORMASI KONTAK</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Map Placeholder */}
              <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center border border-gray-300">
               <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center border border-gray-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6477891201544!2d101.44519957472349!3d0.5297421994650761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5ac1c8d87069d%3A0x7496d0d898f06d4a!2sCentury%20Pharma%20-%20Jaya!5e0!3m2!1sen!2sid!4v1751018458415!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  className="border-0 w-full h-full"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              </div>

              {/* Contact Details */}
              <div className="space-y-4 text-lg">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tosca mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(0761) 22052</span>
                </div>
                <div className="flex items-start"> {/* Use items-start for address to align from top */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tosca mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Jl. Jend. Sudirman No.185, Kota Tinggi, Kec. Pekanbaru Kota, Kota Pekanbaru, Riau 28155</span> {/* Alamat dari gambar */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      
    </div>
  );
};

export default Kontak;