import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { LandingPage } from './pages/LandingPage'
import { SearchBusPage } from './pages/SearchBusPage'
import { DetailBusPage } from './pages/DetailBusPage'
import { BookingPage } from './pages/BookingPage'
import { SuccessPaymentPage } from './pages/SuccessPaymentPage'
import { AuthProvider } from './context/AuthContext'
import { MainLayout } from './components/layout/MainLayout'
import { DashboardPage } from './pages/DashboardPage'
import { PaymentPage } from './pages/paymentPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path='/' element={<LandingPage></LandingPage>}/>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/search' element={<SearchBusPage></SearchBusPage>}/>
          <Route path='/bus/:id' element={<DetailBusPage></DetailBusPage>}/>
          <Route path='/bus/:id/booking' element={<BookingPage></BookingPage>}/>
          <Route path='/bus/:id/payment' element={<PaymentPage></PaymentPage>}/>
          <Route path='/bus/:id/success' element={<SuccessPaymentPage></SuccessPaymentPage>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
