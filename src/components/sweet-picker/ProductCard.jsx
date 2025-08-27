import React from 'react'
import { ShoppingBag, Sparkles, Star } from 'lucide-react'
import { getItemColour } from '../../utils/colourHelpers'

function ProductCard({ product, onClick }) {
  const productColour = getItemColour(product.id)

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
    >
      {/* Main Card with Simple Colorful Border */}
      <div 
        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative border-4"
        style={{
          borderColor: productColour.bg === 'bg-phlox-500' ? '#dd18fe' : 
                      productColour.bg === 'bg-red-500' ? '#ff000c' : 
                      productColour.bg === 'bg-yellow_green-500' ? '#9fd600' : 
                      productColour.bg === 'bg-dodger_blue-500' ? '#0495ff' : '#dd18fe'
        }}
      >
        
        {/* Simple Corner Decoration */}
        <div className={`absolute -top-2 -right-2 w-8 h-8 ${productColour.bg} rounded-full border-2 border-white shadow-lg transform rotate-12 group-hover:rotate-45 transition-all duration-300`}>
          <div className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80"></div>
        </div>

        {/* Larger Image Container */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          
          {/* Shopify Product Image or Fallback */}
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-contain sm:object-cover md:group-hover:scale-110 group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${productColour.gradient} flex items-center justify-center`}>
              <div className="text-8xl text-white drop-shadow-lg">
                {product.customType === 'cables' ? '🪱' : '🬬'}
              </div>
            </div>
          )}
          
          {/* Custom Badge */}
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

          {/* Bottom accent stripe */}
          <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${productColour.gradient} shadow-lg`} />
        </div>

        {/* Content area with simple border */}
        <div className="p-4 border-t-2 border-gray-200">
          <div className="mb-3">
            <h3 className={`font-bold text-lg text-gray-800 mb-1 group-hover:${productColour.text} transition-colors line-clamp-2 leading-tight`}>
              {product.title}
            </h3>
            
            <p className="text-gray-600 text-sm line-clamp-1">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="flex items-center gap-2">
              <div className="text-2xl font-extrabold text-gray-800">
                £{product.price.toFixed(2)}
              </div>
              <Star className={`w-4 h-4 ${productColour.text} opacity-60`} fill="currentColor" />
            </div>
            
            <button className={`${productColour.bg} ${productColour.hover} text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 md:group-hover:scale-110 group-hover:scale-105 transform shadow-lg hover:shadow-xl border-2 border-white`}>
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm">{product.isCustom ? 'Build' : 'View'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard