import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Cart from '../cart/Cart'

// Clean layout wrapper (CartProvider is already in App.jsx)
function Layout({ children }) {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-100 to-purple-100">
      <Header />
      <main className={`flex-1 ${isHomePage ? 'p-0' : 'p-4 sm:p-6 lg:p-8'}`}>
        <div className={`${isHomePage ? 'w-full' : 'max-w-7xl mx-auto'}`}>
          {children}
        </div>
      </main>
      <Footer />
      
      {/* Cart Drawer */}
      <Cart />
    </div>
  )
}

export default Layout