import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Produk from './pages/Produk'
import Dashboard from './pages/Dashboard'
import SalesManagement from './pages/SalesManagement'
import CustomerManagement from './pages/CustomerManagement'
import Chatbot from './components/Chatbot'
import Segmentasi from './pages/segmentasi'



export default function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/produk' element={< Produk/>} />
          <Route path='Penjualan' element={<SalesManagement />} />
          <Route path="/pelanggan" element={<CustomerManagement />}>
            <Route path="segmentasi" element={<Segmentasi />} />
          </Route>
          <Route path='Chatbot' element={<Chatbot  />} />
        </Route>
      </Routes>
    </>
  )
}

