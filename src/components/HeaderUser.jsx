import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

      const { data, error } = await supabase
        .from("akun")
        .select("loyalty")
        .eq("email", user.email)
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
      await fetchCampaignNotifications(data.loyalty);
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

  useEffect(() => {
    fetchUserLoyalty();
  }, []);

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Layer 1: Logo, Search, Icon Menu */}
      <div className="py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img className="block w-32 h-auto" src="/logo2.png" alt="logo" />
          </div>

          {/* Search Bar */}
          <div className="flex-grow mx-8 relative">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full py-2 px-4 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            {/* Notifikasi */}
            <div className="relative">
              <button
                onClick={toggleNotification}
                className="relative flex items-center gap-2 text-gray-900 hover:text-blue-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
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
                          <Link
                            to={`/detailtrigger/${notif.id}`}
                            className="block px-4 py-3 text-gray-800 hover:text-blue-600 transition"
                          >
                            {notif.judul || "Tidak ada judul"}
                          </Link>
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
            <Link
              to="/keranjang"
              className="text-gray-900 hover:text-blue-600 transition flex items-center"
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="ml-2 font-medium">Keranjang</span>
            </Link>

            {/* Akun */}
            <Link to="/akun" className="text-gray-900 hover:text-blue-600 transition flex items-center">
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
            </Link>
          </div>
        </div>
      </div>

      {/* Layer 2: Menu Navigasi */}
      <div className="bg-teal-600 py-3">
        <div className="max-w-7xl mx-auto flex justify-center space-x-8 text-white">
          <Link to="/home" className="hover:text-blue-300 transition">Home</Link>
          <Link to="/produk" className="hover:text-blue-300 transition">Produk</Link>
          <Link to="/faquser" className="hover:text-blue-300 transition">FAQ</Link>
          <Link to="/tentangkami" className="hover:text-blue-300 transition">Tentang Kami</Link>
          <Link to="/kontak" className="hover:text-blue-300 transition">Kontak</Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
