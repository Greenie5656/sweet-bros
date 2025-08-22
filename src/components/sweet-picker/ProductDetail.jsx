import React, { useState } from 'react'
import { Sparkles, Heart, Star } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import SweetPicker from './SweetPicker'
import QuantitySelector from './QuantitySelector'
import PartyTubSelector from './PartyTubSelector'
import { getItemColour } from '../../utils/colourHelpers'

function ProductDetail({ product, onBack }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(product.minQuantity || 1)
  const [totalPrice, setTotalPrice] = useState(product.price)
  const [selectedSweets, setSelectedSweets] = useState([])
  
  // Get consistent color for this product
  const productColour = getItemColour(product.id)

  // Check if this is a party tub product
  const isPartyTubProduct = product?.collection === 'party-supplies' || 
                           product?.title?.toLowerCase().includes('party') ||
                           product?.title?.toLowerCase().includes('tub')

  // Handle party tub cart additions (different format)
  const handlePartyTubAddToCart = (cartItem) => {
    addToCart({
      id: cartItem.id,
      title: cartItem.title,
      price: cartItem.price, // This is the total price
      image: cartItem.image,
      variantId: cartItem.variantId,
      isCustom: false,
      totalTubs: cartItem.totalTubs
    }, 1) // Always quantity 1 for bundles
  }

  // Handle quantity/price changes from QuantitySelector
  const handleQuantityChange = (data) => {
    if (typeof data === 'number') {
      // Old format - just quantity
      setQuantity(data)
      setTotalPrice(product.price * data)
    } else {
      // New format - object with quantity and totalPrice
      setQuantity(data.quantity)
      setTotalPrice(data.totalPrice)
    }
  }

  const handleAddToCart = () => {
    console.log('Adding to cart:', { product, quantity, selectedSweets, totalPrice })
    
    // For custom products, validate selections
    if (product.isCustom) {
      const minRequired = product.customType === 'cables' ? 4 : 10
      const maxAllowed = product.customType === 'cables' ? 4 : 20
      
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

    // For party products with dynamic pricing, adjust the title
    const usesDynamicPricing = product?.collection === 'party-supplies' || 
                              product?.title?.toLowerCase().includes('party') ||
                              product?.title?.toLowerCase().includes('tub')
    
    if (usesDynamicPricing && quantity !== 1) {
      customTitle = `${product.title} (${quantity} tubs)`
    }

    // Calculate the effective price per unit for the cart
    const effectivePrice = totalPrice / quantity

    // Add the product to cart
    addToCart({
      id: product.isCustom ? `${product.id}-${Date.now()}` : product.id,
      title: customTitle,
      price: effectivePrice, // Use calculated price per unit
      image: product.image,
      variantId: product.variantId,
      customSweets: product.isCustom && product.customType !== 'cables' ? selectedSweets : null,
      customCables: product.isCustom && product.customType === 'cables' ? selectedSweets : null,
      isCustom: product.isCustom || false,
      // Store original pricing info for complex products
      originalPrice: product.price,
      totalPrice: totalPrice,
      usesDynamicPricing: usesDynamicPricing
    }, quantity)

    // Show success feedback
    alert(`Added ${quantity} x ${customTitle} to cart! Total: £${totalPrice.toFixed(2)}`)
    
    // Reset selections for custom products
    if (product.isCustom) {
      setSelectedSweets([])
    }
  }

  const canAddToCart = () => {
    if (!product.isCustom) return true
    
    const minRequired = product.customType === 'cables' ? 4 : 10
    const maxAllowed = product.customType === 'cables' ? 4 : 20
    
    return selectedSweets.length >= minRequired && selectedSweets.length <= maxAllowed
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Subtle colored header strip */}
      <div className={`h-2 bg-gradient-to-r ${productColour.gradient} rounded-full mb-8 opacity-60 shadow-sm`} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-xl relative">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-contain sm:object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-9xl">
                  {product.customType === 'cables' ? '🪱' : '🍬'}
                </div>
              </div>
            )}
            
            {/* Subtle corner accent */}
            <div className={`absolute top-0 right-0 w-0 h-0 border-r-[60px] border-t-[60px] border-r-transparent opacity-20`} 
                 style={{borderTopColor: `rgb(var(--${productColour.bg.replace('bg-', '').replace('-500', '')}-400))`}} />
          </div>
          
          {product.isCustom && (
            <div className={`absolute top-6 left-6 ${productColour.bg} text-white px-4 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl border-2 border-white`}>
              <Sparkles className="w-5 h-5" />
              <span>Customizable</span>
            </div>
          )}
          
          {/* Fun floating dots */}
          <div className={`absolute bottom-8 left-8 w-4 h-4 ${productColour.bg} rounded-full opacity-60 animate-pulse shadow-lg`} />
          <div className={`absolute bottom-12 left-12 w-2 h-2 ${productColour.bg.replace('500', '300')} rounded-full opacity-80 animate-pulse shadow-lg`} style={{animationDelay: '0.7s'}} />
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            {/* Title with subtle color accent */}
            <div className="relative mb-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                {product.title}
              </h1>
              {/* Small colored underline */}
              <div className={`h-1.5 w-16 ${productColour.bg} rounded-full mt-3 opacity-70 shadow-sm`} />
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price with themed styling */}
          <div className={`bg-gradient-to-r from-gray-50 to-${productColour.bg.replace('bg-', '').replace('-500', '')}-50 rounded-2xl p-6 border-l-4 ${productColour.bg.replace('500', '400')} shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-extrabold text-gray-800">
                  £{totalPrice.toFixed(2)}
                </div>
                {quantity > 1 && (
                  <div className="text-lg text-gray-600 mt-1">
                    {quantity} × {(totalPrice / quantity).toFixed(2)} each
                  </div>
                )}
                {product.minQuantity && (
                  <div className="text-sm text-red-600 font-medium mt-1">
                    Minimum order: {product.minQuantity} units
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Heart className={`w-8 h-8 ${productColour.text} opacity-60`} />
                <Star className={`w-6 h-6 ${productColour.text} opacity-40`} fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Party Tub Selector (for party products) */}
          {isPartyTubProduct ? (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>Configure Your Party Order</span>
                <div className={`w-2 h-2 ${productColour.bg} rounded-full opacity-60`} />
              </h3>
              <PartyTubSelector 
                product={product}
                onAddToCart={handlePartyTubAddToCart}
                productColour={productColour}
              />
            </div>
          ) : (
            <>
              {/* Regular Quantity Selector (for non-custom, non-party products) */}
              {!product.isCustom && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>Quantity</span>
                    <div className={`w-2 h-2 ${productColour.bg} rounded-full opacity-60`} />
                  </h3>
                  <QuantitySelector 
                    min={product.minQuantity || 1}
                    max={20}
                    onChange={handleQuantityChange}
                    product={product}
                  />
                </div>
              )}

              {/* Sweet/Cable Picker (for custom products) */}
              {product.isCustom && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>
                      {product.customType === 'cables' 
                        ? 'Choose Your Cable Flavours' 
                        : 'Build Your Perfect Mix'
                      }
                    </span>
                    <Sparkles className={`w-5 h-5 ${productColour.text} opacity-60`} />
                  </h3>
                  <SweetPicker 
                    type={product.customType || 'sweets'} 
                    onSelectionChange={setSelectedSweets}
                  />
                </div>
              )}

              {/* Selection Summary for Custom Products */}
              {product.isCustom && selectedSweets.length > 0 && (
                <div className={`bg-gradient-to-r from-green-50 to-${productColour.bg.replace('bg-', '').replace('-500', '')}-50 border-l-4 border-green-400 rounded-xl p-4 shadow-sm`}>
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <span>Your Selection ({selectedSweets.length} items):</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </h4>
                  <div className="text-sm text-green-700">
                    {selectedSweets.map(sweet => sweet.name).join(', ')}
                  </div>
                </div>
              )}

              {/* Action Button for non-party products */}
              <button 
                onClick={handleAddToCart}
                disabled={!canAddToCart()}
                className={`
                  w-full font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-white hover:border-opacity-50 relative overflow-hidden
                  ${canAddToCart() 
                    ? `bg-gradient-to-r ${productColour.gradient} hover:shadow-${productColour.bg.split('-')[1]}-300/50 text-white` 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {/* Subtle animated background */}
                {canAddToCart() && (
                  <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300" />
                )}
                
                <span className="relative z-10">
                  {product.isCustom 
                    ? (canAddToCart() ? 'Add Custom Mix to Bag' : 'Please Complete Your Selection')
                    : `Add to Bag - £${totalPrice.toFixed(2)}`
                  }
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail