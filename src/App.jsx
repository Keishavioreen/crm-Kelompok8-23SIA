import { Routes, Route } from 'react-router-dom';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { GuideProvider } from "./context/GuideContext";

import MainLayout from './components/MainLayout';
import UserLayout from './components/UserLayout';

import Dashboard from './pages/Dashboard';
import SalesManagement from './pages/SalesManagement';
import CustomerManagement from './pages/CustomerManagement';
import StokObat from './pages/StokObat';
import Laporan from './pages/Laporan';
import Chatbot from './components/Chatbot';
import FAQ from './pages/FAQ';
import GuideForm from './pages/GuideFrom';
import KelolaTransaksi from './pages/KelolaTransaksi';
import OrderManagement from './pages/OrderManagement';
import LoyaltyPage from './pages/LoyaltyPage';
import LoyaltyEdit from './pages/LoyaltyEdit';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Campaign from './pages/Campaign';
import Trigger from './pages/Trigger';
import KelolaAppointment from './pages/KelolaAppointment';
import Analytics from './pages/Analytics';
import KelolaAnalytics from './pages/KelolaAnalytics';
import DashboardUser from './pages/DashboardUser';
import Kontak from './pages/Kontak';
import AkunUser from './pages/AkunUser';
import ProductUser from './pages/Productuser';
import FaqPage from './pages/FaqPage';
import CartPage from './pages/CartPage';
import DetailTrigger from './pages/DetailTrigger';
import HomeUser from './pages/HomeUser';
import Segmentasi from './pages/Segmentasi';
import TentangKami from './pages/TentangKami';
import TambahCampaign from './pages/TambahCampaign';

import EmailInbox from './pages/Email/EmailInbox';
import EmailTemplateList from './pages/Email/EmailTemplateList';
import EmailTemplateForm from './pages/Email/EmailTemplateForm';

export default function App() {
  return (
    <GuideProvider>
      <AnalyticsProvider>
        <Routes>
          {/* Autentikasi */}
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Layout untuk Admin */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stok" element={<StokObat />} />
            <Route path="/penjualan" element={<SalesManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/transaksi" element={<KelolaTransaksi />} />
            <Route path="/pelanggan" element={<CustomerManagement />} />
            <Route path="/pelanggan/segmentasi" element={<Segmentasi />} />
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/faq/add" element={<GuideForm />} />
            <Route path="/faq/:id" element={<GuideForm />} />
            <Route path="/Loyalty" element={<LoyaltyPage />} />
            <Route path="/LoyaltyEdit" element={<LoyaltyEdit />} />
            <Route path="/Campaign" element={<Campaign />} />
            <Route path="/Trigger" element={<Trigger />} />
            <Route path="/TambahCampaign" element={<TambahCampaign />} />
            <Route path="/appointment" element={<KelolaAppointment />} />
            <Route path="/Analisis" element={<Analytics />} />
            <Route path="/kelola-analytics" element={<KelolaAnalytics />} />

            {/* Modul Email */}
            <Route path="/email" element={<EmailInbox />} />
            <Route path="/email/template" element={<EmailTemplateList />} />
            <Route path="/email/template/add" element={<EmailTemplateForm />} />
          </Route>

          {/* Layout untuk User */}
          <Route element={<UserLayout />}>
            <Route path="/UserDashboard" element={<DashboardUser />} />
            <Route path="/TentangKami" element={<TentangKami />} />
            <Route path="/Kontak" element={<Kontak />} />
            <Route path="/Akun" element={<AkunUser />} />
            <Route path="/Produk" element={<ProductUser />} />
            <Route path="/FaqUser" element={<FaqPage />} />
            <Route path="/Keranjang" element={<CartPage />} />
            <Route path="/DetailTrigger/:id" element={<DetailTrigger />} />
            <Route path="/Home" element={<HomeUser />} />
          </Route>
        </Routes>
      </AnalyticsProvider>
    </GuideProvider>
  );
}
