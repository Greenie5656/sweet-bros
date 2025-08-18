import React from 'react'
import { ShoppingBag, Sparkles } from 'lucide-react'
import { getItemColour } from '../../utils/colourHelpers' // Add this import

function ProductCard({ product, onClick }) {
  const productColour = getItemColour(product.id) // Get random colour for this product

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Image Container with coloured gradient overlay */}
      <div className="relative h-48 overflow-hidden">
        {/* Background gradient using product colour */}
        <div className={`absolute inset-0 bg-gradient-to-br ${productColour.gradient} opacity-20`} />
        
        {/* Shopify Product Image */}
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${productColour.gradient} flex items-center justify-center`}>
            <div className="text-6xl text-white">
              {product.customType === 'cables' ? '🪱' : '🍬'}
            </div>
          </div>
        )}
        
        {/* Custom Badge with product colour */}
        {product.isCustom && (
          <div className={`absolute top-3 right-3 ${productColour.bg} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
            <Sparkles className="w-3 h-3" />
            Custom
          </div>
        )}

        {/* Min Quantity Badge */}
        {product.minQuantity && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Min {product.minQuantity}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`font-bold text-lg text-gray-800 mb-2 group-hover:${productColour.text} transition-colors line-clamp-2`}>
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-extrabold text-gray-800">
            £{product.price.toFixed(2)}
          </div>
          
          <button className={`${productColour.bg} ${productColour.hover} text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 group-hover:scale-105 transform duration-200`}>
            <ShoppingBag className="w-4 h-4" />
            {product.isCustom ? 'Customise' : 'View'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard