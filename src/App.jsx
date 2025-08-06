import React from 'react'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import HomePage from './components/pages/HomePage'

function App() {
  return (
    <CartProvider>
      <Layout>
        <HomePage />
      </Layout>
    </CartProvider>
  )
}

export default App