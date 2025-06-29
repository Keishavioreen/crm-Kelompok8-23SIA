import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

const HeaderUser = () => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [campaignNotifications, setCampaignNotifications] = useState([]);
  const [userLoyalty, setUserLoyalty] = useState(null);

  // Ambil loyalty user saat ini
  const fetchUserLoyalty = async () => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        console.error("User not logged in or error fetching user data:", userError);
        return;
      }

      const user = userData.user;

      // Gunakan email untuk mencocokkan di tabel akun
      const { data, error } = await supabase
        .from("akun")
        .select("loyalty")
        .eq("email", user.email) // Cocokkan berdasarkan email
        .maybeSingle();

      if (error) {
        console.error("Error fetching user loyalty:", error.message);
        return;
      }

      if (!data) {
        console.warn("No matching user loyalty found for email:", user.id);
        return;
      }

      setUserLoyalty(data.loyalty);
      await fetchCampaignNotifications(data.loyalty); // Ambil notifikasi berdasarkan loyalty
    } catch (error) {
      console.error("Unexpected error fetching user loyalty:", error.message);
    }
  };

  // Ambil campaign berdasarkan loyalty user
  const fetchCampaignNotifications = async (loyalty) => {
    try {
      const queryConditions = [`segmentasi.eq.${loyalty}`, "segmentasi.eq.Select All"];

      const { data, error } = await supabase
        .from("campaign")
        .select("id, judul, segmentasi")
        .or(queryConditions.join(","));

      if (error) throw error;
      setCampaignNotifications(data || []);
    } catch (error) {
      console.error("Error fetching campaigns:", error.message);
    }
  };

  // Panggil fungsi fetchUserLoyalty saat komponen dimuat
  useEffect(() => {
    fetchUserLoyalty();
  }, []);

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div>
            <img className="block w-32 h-auto" src="/logo2.png" alt="Logo" />
          </div>

          {/* Search Bar */}
          <div className="flex-grow mx-8 relative">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full py-2 px-4 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Grouped icons with spacing */}
          <div className="flex items-center gap-6">
            {/* Notifikasi */}
            <div className="relative">
              <button
                onClick={toggleNotification}
                className="relative flex items-center gap-2 text-gray-900 hover:text-blue-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14h-3v3zm0 0a2.5 2.5 0 11-5 0v-3H6a2.032 2.032 0 01-1.595-.405L3 17h5z"
                  />
                </svg>
                <span className="font-medium">Notifikasi</span>
                {campaignNotifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                    {campaignNotifications.length}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="divide-y divide-gray-200">
                    {campaignNotifications.length > 0 ? (
                      campaignNotifications.map((notif) => (
                        <li key={notif.id} className="hover:bg-gray-100">
                          <a
                            href={`/DetailTrigger/${notif.id}`}
                            className="block px-4 py-3 text-gray-800 hover:text-blue-600 transition"
                          >
                            {notif.judul || "Tidak ada judul"}
                          </a>
                        </li>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">Tidak ada notifikasi</div>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Keranjang */}
            <a href="/Keranjang" className="text-gray-900 hover:text-blue-600 transition flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="ml-2 font-medium">Keranjang</span>
            </a>

            {/* Akun */}
            <a href="/Akun" className="text-gray-900 hover:text-blue-600 transition flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
              <span className="ml-2 font-medium">Akun</span>
            </a>
          </div>

          
        </div>
        
      </div>
      <nav className="bg-teal-600 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex justify-around py-4">
            <li>
              <a
                href="/Home"
                className="text-white hover:text-blue-200 font-medium transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/Produk"
                className="text-white hover:text-blue-200 font-medium transition"
              >
                Produk
              </a>
            </li>
            <li>
              <a
                href="/FaqUser"
                className="text-white hover:text-blue-200 font-medium transition"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="/TentangKami"
                className="text-white hover:text-blue-200 font-medium transition"
              >
                Tentang Kami
              </a>
            </li>
            <li>
              <a
                href="/Kontak"
                className="text-white hover:text-blue-200 font-medium transition"
              >
                Kontak
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderUser;
