import React from 'react'
import { ShoppingBag, Sparkles, Star } from 'lucide-react'
import { getItemColour } from '../../utils/colourHelpers'

function ProductCard({ product, onClick }) {
  const productColour = getItemColour(product.id)

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-3xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 overflow-hidden relative"
    >
      {/* Larger Image Container - Taking up more space */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        
        {/* Shopify Product Image or Fallback */}
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-contain sm:object-cover md:group-hover:scale-110 group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          // Only show gradient background when there's NO image
          <div className={`absolute inset-0 bg-gradient-to-br ${productColour.gradient} flex items-center justify-center`}>
            <div className="text-8xl text-white drop-shadow-lg">
              {product.customType === 'cables' ? '🪱' : '🬬'}
            </div>
          </div>
        )}
        
        {/* Fun floating color dots instead of overlay */}
        <div className={`absolute top-4 left-4 w-3 h-3 ${productColour.bg} rounded-full animate-pulse shadow-lg`} />
        <div className={`absolute top-8 left-8 w-2 h-2 ${productColour.bg.replace('500', '300')} rounded-full animate-pulse shadow-lg`} style={{animationDelay: '0.5s'}} />
        
        {/* Custom Badge - More prominent */}
        {product.isCustom && (
          <div className={`absolute top-4 right-4 ${productColour.bg} text-white px-3 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-xl border-2 border-white`}>
            <Sparkles className="w-4 h-4" />
            <span>Custom</span>
          </div>
        )}

        {/* Min Quantity Badge */}
        {product.minQuantity && (
          <div className="absolute top-4 left-16 bg-red-500 text-white px-3 py-2 rounded-2xl text-sm font-bold shadow-xl border-2 border-white">
            Min {product.minQuantity}
          </div>
        )}

        {/* NO colored frame effect on hover - removed this line completely */}
        
        {/* Bottom accent stripe - brighter */}
        <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${productColour.gradient} shadow-lg`} />
      </div>

      {/* Compact content area to give more space to image */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className={`font-bold text-lg text-gray-800 mb-1 group-hover:${productColour.text} transition-colors line-clamp-2 leading-tight`}>
            {product.title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-1">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {/* Price with fun styling */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-extrabold text-gray-800">
              £{product.price.toFixed(2)}
            </div>
            {/* Star accent */}
            <Star className={`w-4 h-4 ${productColour.text} opacity-60`} fill="currentColor" />
          </div>
          
          <button className={`${productColour.bg} ${productColour.hover} text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 md:group-hover:scale-110 group-hover:scale-105 transform shadow-lg hover:shadow-xl border-2 border-white hover:border-opacity-50`}>
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm">{product.isCustom ? 'Build' : 'View'}</span>
          </button>
        </div>
      </div>

      {/* Fun animated border on hover - kept but simplified */}
      <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:${productColour.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none`} />
      
      {/* Subtle glow effect */}
      <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${productColour.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
    </div>
  )
}

export default ProductCard