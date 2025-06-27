import { AnalyticsProvider } from './context/AnalyticsContext'; 

import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import SalesManagement from './pages/SalesManagement'
import CustomerManagement from './pages/CustomerManagement'
import StokObat from './pages/StokObat'
import Laporan from './pages/Laporan'
import Chatbot from './components/Chatbot'
import Segmentasi from './pages/segmentasi'

import FAQ from './pages/FAQ'
import GuideForm from './pages/GuideFrom'
import { GuideProvider } from "./context/GuideContext";
import KelolaTransaksi from './pages/KelolaTransaksi'
import OrderManagement from './pages/OrderManagement'
import LoyaltyPage from './pages/LoyaltyPage'
import LoyaltyEdit from './pages/LoyaltyEdit'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Campaign from './pages/Campaign'
import Trigger from './pages/Trigger'
import KelolaAppointment from './pages/KelolaAppointment'
import Analytics from './pages/Analytics'
import KelolaAnalytics from './pages/KelolaAnalytics'
import UserLayout from './components/UserLayout'
import DashboardUser from './pages/DashboardUser'
import AkunUser from './pages/AkunUser';
import ProductUser from './pages/Productuser';


export default function App() {
  return (
    <GuideProvider>
       <AnalyticsProvider>
      <Routes>
        {/* Wrapper layout yang memuat Sidebar, Header, dll */}

         {/* Pengaturan akun */}
           <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          <Route path="/stok" element={<StokObat />} />

          {/* Transaksional */}
          <Route path="/penjualan" element={<SalesManagement />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/transaksi" element={<KelolaTransaksi />} />

          {/* Pelanggan & Segmentasi */}
          <Route path="/pelanggan" element={<CustomerManagement />} />
          <Route path="/pelanggan/segmentasi" element={<Segmentasi />} />

          {/* Lain‑lain */}
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/Loyalty" element={<LoyaltyPage />} />
          <Route path="/LoyaltyEdit" element={<LoyaltyEdit />} />
          <Route path="/Campaign" element={<Campaign />} />
          <Route path="/Trigger" element={<Trigger />} />
          

          {/* FAQ & panduan */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/faq/add" element={<GuideForm />} />
          <Route path="/faq/:id" element={<GuideForm />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='Penjualan' element={<SalesManagement />} />
          <Route path='/pelanggan' element={< CustomerManagement/>} />
          <Route path="/stok-obat" element={<StokObat/>} />
          <Route path="/laporan" element={<Laporan/>} />
          <Route path='Chatbot' element={<Chatbot/>} />
          <Route path="/pelanggan" element={<CustomerManagement />}>
            <Route path="segmentasi" element={<Segmentasi />} />
          </Route>
          <Route path='Chatbot' element={<Chatbot  />} />
           <Route path='Penjualan' element={<SalesManagement />} />
           <Route path='Chatbot' element={<Chatbot  />} />
           <Route path='FAQ' element={<FAQ  />} />
           <Route path="/faq/add"    element={<GuideForm />} />   
           <Route path="/faq/:id"    element={<GuideForm />} />     
           <Route path="transaksi" element={<KelolaTransaksi />} />
           <Route path="/Appoinment" element={<KelolaAppointment />} />
          <Route path="/Analisis" element={<Analytics  />} />
          <Route path="/kelola-analytics" element={<KelolaAnalytics />} />

        </Route>

         <Route element={<UserLayout />}>
          <Route path="/UserDashboard" element={<DashboardUser />} />
          <Route path="/Akun" element={<AkunUser />} />
          <Route path="/Produk" element={<ProductUser />} />
         </Route>
      </Routes>
      </AnalyticsProvider>
    </GuideProvider>
  );
}
