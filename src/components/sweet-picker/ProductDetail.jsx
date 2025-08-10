import React from 'react'
import { Sparkles, Package } from 'lucide-react'
import SweetPicker from './SweetPicker'
import QuantitySelector from './QuantitySelector'

function ProductDetail({ product, onBack }) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-lg">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-9xl">
                  {product.customType === 'cables' ? '🪱' : '🍬'}
                </div>
              </div>
            )}
          </div>
          
          {product.isCustom && (
            <div className="absolute top-6 right-6 bg-yellow_green-500 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Customizable
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-phlox-50 to-yellow_green-50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-extrabold text-gray-800">
                  £{product.price.toFixed(2)}
                </div>
                {product.minQuantity && (
                  <div className="text-sm text-red-600 font-medium mt-1">
                    Minimum order: {product.minQuantity} units
                  </div>
                )}
              </div>
              <Package className="w-12 h-12 text-phlox-400" />
            </div>
          </div>

          {/* Quantity Selector (for non-custom products) */}
          {!product.isCustom && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quantity</h3>
              <QuantitySelector 
                min={product.minQuantity || 1}
                max={20}
              />
            </div>
          )}

          {/* Sweet/Cable Picker (for custom products) */}
          {product.isCustom && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {product.customType === 'cables' 
                  ? 'Choose Your Cable Flavors' 
                  : 'Build Your Perfect Mix'
                }
              </h3>
              <SweetPicker type={product.customType || 'sweets'} />
            </div>
          )}

          {/* Action Button */}
          <button className="w-full bg-gradient-to-r from-phlox-500 to-phlox-600 hover:from-phlox-600 hover:to-phlox-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            {product.isCustom ? 'Add Custom Mix to Bag' : 'Add to Bag'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail