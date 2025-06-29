import { Routes, Route } from 'react-router-dom';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { GuideProvider } from "./context/GuideContext";

// Layout
import MainLayout from './components/MainLayout';
import UserLayout from './components/UserLayout';

// Pages (Admin)
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
import Campaign from './pages/Campaign';
import Trigger from './pages/Trigger';
import TambahCampaign from './pages/TambahCampaign';
import KelolaAppointment from './pages/KelolaAppointment';
import Analytics from './pages/Analytics';
import KelolaAnalytics from './pages/KelolaAnalytics';
import Segmentasi from './pages/Segmentasi';

// Pages (User)
import DashboardUser from './pages/DashboardUser';
import TentangKami from './pages/TentangKami';
import Kontak from './pages/Kontak';
import AkunUser from './pages/AkunUser';
import ProductUser from './pages/Productuser';
import FaqPage from './pages/FaqPage';
import CartPage from './pages/CartPage';
import DetailTrigger from './pages/DetailTrigger';
import HomeUser from './pages/HomeUser';

// Email Module
import EmailInbox from './pages/Email/EmailInbox';
import EmailTemplateList from './pages/Email/EmailTemplateList';
import EmailTemplateForm from './pages/Email/EmailTemplateForm';

// Auth
import Signin from './pages/Signin';
import Signup from './pages/Signup';

export default function App() {
  return (
    <GuideProvider>
      <AnalyticsProvider>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Layout */}
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
            <Route path="/loyalty" element={<LoyaltyPage />} />
            <Route path="/loyaltyedit" element={<LoyaltyEdit />} />
            <Route path="/campaign" element={<Campaign />} />
            <Route path="/trigger" element={<Trigger />} />
            <Route path="/tambahcampaign" element={<TambahCampaign />} />
            <Route path="/appointment" element={<KelolaAppointment />} />
            <Route path="/analisis" element={<Analytics />} />
            <Route path="/kelola-analytics" element={<KelolaAnalytics />} />

            {/* Email Module */}
            <Route path="/email" element={<EmailInbox />} />
            <Route path="/email/template" element={<EmailTemplateList />} />
            <Route path="/email/template/add" element={<EmailTemplateForm />} />
          </Route>

          {/* User Layout */}
          <Route element={<UserLayout />}>
            <Route path="/userdashboard" element={<DashboardUser />} />
            <Route path="/tentangkami" element={<TentangKami />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/akun" element={<AkunUser />} />
            <Route path="/produk" element={<ProductUser />} />
            <Route path="/faquser" element={<FaqPage />} />
            <Route path="/keranjang" element={<CartPage />} />
            <Route path="/detailtrigger/:id" element={<DetailTrigger />} />
            <Route path="/home" element={<HomeUser />} />
          </Route>
        </Routes>
      </AnalyticsProvider>
    </GuideProvider>
  );
}
