import React from 'react'
import ShopifyTest from '../ShopifyTest'

function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
          Build Your Own 
          <span className="text-phlox-500"> Sweet </span>
          <span className="text-dodger_blue-500">Bag</span>! 🍭
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Pick your favorite sweets, choose your quantities, and create the perfect treat bag just for you!
        </p>
      </div>

      {/* Shopify Connection Test */}
      <ShopifyTest />
    </div>
  )
}

export default HomePage