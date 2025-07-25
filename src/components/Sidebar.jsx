// src/components/Sidebar.jsx
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Box,
  BarChart2,
  Settings,
  LogIn,
  UserPlus,
  ClipboardList,
  Award,
  Megaphone,
  HelpCircle,
  CreditCard,
  Inbox,
  CalendarCheck,
  Activity,
  Target
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';
import "./color.css";

const menuItems = [
  { name: 'Dashboard',         icon: <LayoutDashboard />, path: '/dashboard' },
  { name: 'Stok Obat',            icon: <Box />,            path: '/stok' },
  { name: 'Laporan',           icon: <BarChart2 />,      path: '/laporan' },
  { name: 'Penjualan',         icon: <ShoppingCart />,   path: '/penjualan' },
  { name: 'Order Management',  icon: <ClipboardList />,  path: '/orders' },
  { name: 'Data Pelanggan',    icon: <Users />,          path: '/pelanggan' },
  { name: 'Loyalty', icon: <Award />, path: '/Loyalty' },
   { name: 'Campaign', icon: <Megaphone  />, path: '/Campaign' },
  { name: 'FAQ',               icon: <HelpCircle />,      path: '/faq' },
  { name: 'Kelola Transaksi',  icon: <CreditCard />,      path: '/transaksi' },
  { name: 'KelolaAppointment', icon: <CalendarCheck />, path: '/Appointment' },
  { name: 'Analisis', icon: <Activity />, path: '/Analisis' },
  { name: 'Email', icon: <Inbox />, path: '/email' },
  { name: 'Prediksi', icon: <Target />, path: '/Prediksi' },
];

const accountItems = [
  { name: 'Pengaturan Akun', icon: <Settings />, path: '/akun' },
  { name: 'Sign In',         icon: <LogIn />,    path: '/signin' },
  { name: 'Sign Up',         icon: <UserPlus />, path: '/signup' },
];

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-white w-64 h-full shadow-lg px-4 py-6 hidden md:block overflow-y-auto">
      <img
        className="block mx-auto mb-6 w-32 h-auto"
        src="/logo2.png"
        alt="logo"
      />

      <nav className="space-y-1">
        {menuItems.map(({ name, icon, path }) => (
          <Link
            key={name}
            to={path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive(path)
                ? 'bg-tosca-200 text-black font-semibold'
                : 'text-gray-700 hover:bg-tosca-100'
            }`}
          >
            <span className="w-5 h-5">{icon}</span>
            {name}
          </Link>
        ))}
      </nav>

      <div className="mt-10 text-xs font-semibold text-gray-500">AKUN</div>
      <nav className="mt-2 space-y-1">
        {accountItems.map(({ name, icon, path }) => (
          <Link
            key={name}
            to={path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive(path)
                ? 'bg-purple-200 text-purple-800 font-semibold'
                : 'text-gray-700 hover:bg-purple-100'
            }`}
          >
            <span className="w-5 h-5">{icon}</span>
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
