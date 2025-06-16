import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import SalesManagement from './pages/SalesManagement'
import Chatbot from './components/Chatbot'
import FAQ from './pages/FAQ'
import GuideForm from './pages/GuideFrom'
import { GuideProvider } from "./context/GuideContext";
import KelolaTransaksi from './pages/KelolaTransaksi'


export default function App() {
  return (
    <><GuideProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Dashboard />} />
           <Route path='Penjualan' element={<SalesManagement />} />
           <Route path='Chatbot' element={<Chatbot  />} />
           <Route path='FAQ' element={<FAQ  />} />
           <Route path="/faq/add"    element={<GuideForm />} />   
           <Route path="/faq/:id"    element={<GuideForm />} />     
           <Route path="transaksi" element={<KelolaTransaksi />} />
        </Route>
      </Routes>
      </GuideProvider>
    </>
  )
}

