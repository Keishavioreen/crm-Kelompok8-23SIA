import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Produk from './pages/Produk'
import Dashboard from './pages/Dashboard'
import CustomerManagement from './pages/CustomerManagement'
import StokObat from './pages/StokObat'

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/produk' element={< Produk/>} />
          <Route path='/pelanggan' element={< CustomerManagement/>} />
          <Route path="/stok-obat" element={<StokObat />} />
        </Route>
      </Routes>
    </>
  )
}

