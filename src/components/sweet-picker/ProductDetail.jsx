import React, { useState } from 'react'
import { Sparkles, Package } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import SweetPicker from './SweetPicker'
import QuantitySelector from './QuantitySelector'

function ProductDetail({ product, onBack }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(product.minQuantity || 1)
  const [selectedSweets, setSelectedSweets] = useState([])

  const handleAddToCart = () => {
    console.log('Adding to cart:', { product, quantity, selectedSweets })
    
    // For custom products, validate selections
    if (product.isCustom) {
      const minRequired = product.customType === 'cables' ? 4 : 5
      const maxAllowed = product.customType === 'cables' ? 4 : 10
      
      if (selectedSweets.length < minRequired) {
        alert(`Please select at least ${minRequired} ${product.customType === 'cables' ? 'cable flavours' : 'sweets'}!`)
        return
      }
      
      if (selectedSweets.length > maxAllowed) {
        alert(`Please select no more than ${maxAllowed} ${product.customType === 'cables' ? 'cable flavours' : 'sweets'}!`)
        return
      }
    }

    // Create a custom product title that includes the selections
    let customTitle = product.title
    if (product.isCustom && selectedSweets.length > 0) {
      const sweetNames = selectedSweets.map(s => s.name).join(', ')
      customTitle = `${product.title} (${sweetNames})`
    }

    // For custom products, we'll let the checkout handle the variant ID lookup
    let variantId = product.variantId

    // Add the product to cart
    addToCart({
      id: product.isCustom ? `${product.id}-${Date.now()}` : product.id, // Unique ID for custom products
      title: customTitle,
      price: product.price,
      image: product.image,
      variantId: variantId,
      customSweets: product.isCustom && product.customType !== 'cables' ? selectedSweets : null,
      customCables: product.isCustom && product.customType === 'cables' ? selectedSweets : null,
      isCustom: product.isCustom || false
    }, quantity)

    // Show success feedback
    alert(`Added ${quantity} x ${customTitle} to cart!`)
    
    // Reset selections for custom products
    if (product.isCustom) {
      setSelectedSweets([])
    }
  }

  const canAddToCart = () => {
    if (!product.isCustom) return true
    
    const minRequired = product.customType === 'cables' ? 4 : 5
    const maxAllowed = product.customType === 'cables' ? 4 : 10
    
    return selectedSweets.length >= minRequired && selectedSweets.length <= maxAllowed
  }

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
                onChange={setQuantity}
              />
            </div>
          )}

          {/* Sweet/Cable Picker (for custom products) */}
          {product.isCustom && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {product.customType === 'cables' 
                  ? 'Choose Your Cable Flavours' 
                  : 'Build Your Perfect Mix'
                }
              </h3>
              <SweetPicker 
                type={product.customType || 'sweets'} 
                onSelectionChange={setSelectedSweets}
              />
            </div>
          )}

          {/* Selection Summary for Custom Products */}
          {product.isCustom && selectedSweets.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 mb-2">
                Your Selection ({selectedSweets.length} items):
              </h4>
              <div className="text-sm text-green-700">
                {selectedSweets.map(sweet => sweet.name).join(', ')}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button 
            onClick={handleAddToCart}
            disabled={!canAddToCart()}
            className={`
              w-full font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg
              ${canAddToCart() 
                ? 'bg-gradient-to-r from-phlox-500 to-phlox-600 hover:from-phlox-600 hover:to-phlox-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {product.isCustom 
              ? (canAddToCart() ? 'Add Custom Mix to Bag' : 'Please Complete Your Selection')
              : 'Add to Bag'
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail