import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Produk from './pages/Produk'
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
import KelolaAppointment from './pages/KelolaAppointment'
import Analyticts from './pages/Analytics'


export default function App() {
  return (
    <><GuideProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/produk' element={< Produk/>} />
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
           <Route path="Appoinment" element={<KelolaAppointment />} />
           <Route path="Analisis" element={<Analyticts />} />
        </Route>
      </Routes>
      </GuideProvider>
    </>
  )
}

