import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Cart from '../cart/Cart'

// Clean layout wrapper (CartProvider is already in App.jsx)
function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-50">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
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