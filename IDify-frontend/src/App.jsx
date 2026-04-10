import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ProtectedRoute from './components/ProtectedRoute'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Pages
import Hero from './pages/home/Hero'
import OrderManagement from './pages/orders/OrderManagement'
import PricingPage from './pages/pricing/PricingPage'
import FAQSection from './pages/faqs/FAQSection'
import HowToPay from './pages/howToPay/HowToPay'
import ShippingSection from './pages/shipping/ShippingSection'
import Contact from './pages/contact/Contact'
import AdminLoginForm from './components/AdminLoginForm'
import CheckoutForm from './pages/orders/CheckOutForm'
import AdminDashboard from './components/AdminDashboard'
// A wrapper for the "Open from Top" animation
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }} // Starts 50px above
    animate={{ opacity: 1, y: 0 }}    // Slides down to position
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/admin-dashboard"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);


  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* mode="wait" ensures the old page leaves before the new one slides down */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<PageWrapper><Hero /></PageWrapper>} />
          <Route path='/orders' element={<PageWrapper><OrderManagement /></PageWrapper>} />
          <Route path='/pricing' element={<PageWrapper><PricingPage /></PageWrapper>} />
          <Route path='/faq' element={<PageWrapper><FAQSection /></PageWrapper>} />
          <Route path='/pay' element={<PageWrapper><HowToPay /></PageWrapper>} />
          <Route path='/shipping' element={<PageWrapper><ShippingSection /></PageWrapper>} />
          <Route path='/login' element={<PageWrapper><Contact /></PageWrapper>} />

          <Route path='/admin-login' element={<PageWrapper><AdminLoginForm /></PageWrapper>} />
          <Route path='/checkout' element={<PageWrapper><CheckoutForm /></PageWrapper>} />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                
                  <AdminDashboard />
              
              </ProtectedRoute>
            }
          />        
          </Routes>
      </AnimatePresence>

      {!shouldHideNavbar && <Footer />}
    </>
  )
}

export default App