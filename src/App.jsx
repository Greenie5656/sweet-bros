import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import HomePage from './components/pages/HomePage'
import ShopPage from './components/pages/ShopPage'
import AboutPage from './components/pages/AboutPage'
import GalleryPage from './components/pages/GalleryPage'
import { scrollToTop } from './utils/scrollHelpers'

// Component to handle scroll on route changes
function ScrollToTop() {
  const location = useLocation()
  
  useEffect(() => {
    // Scroll to top on route change with enhanced mobile handling
    scrollToTop({ 
      delay: 100,  // Small delay to ensure route is fully loaded
      behavior: 'auto',  // Use instant scroll for route changes
      maxRetries: 5,
      retryDelay: 100
    })
  }, [location.pathname])

  return null
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  )
}

export default App