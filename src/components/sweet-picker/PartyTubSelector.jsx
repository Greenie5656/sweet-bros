import React, { useState } from 'react'
import { Plus, Minus, ShoppingBag, Star, Heart, Sparkles } from 'lucide-react'
import { getItemColour } from '../../utils/colourHelpers'

function PartyTubSelector({ product, onAddToCart, productColour }) {
  const [extraTubs, setExtraTubs] = useState(0)
  
  const basePrice = 45.00
  const baseTubs = 10
  const extraTubPrice = 4.50
  const maxExtraTubs = 20
  
  const totalTubs = baseTubs + extraTubs
  const totalPrice = basePrice + (extraTubs * extraTubPrice)
  
  // Get fun colors for different sections
  const basePackageColour = getItemColour('base-package')
  const extraTubsColour = getItemColour('extra-tubs')
  const totalColour = getItemColour('total-summary')
  
  const handleExtraIncrease = () => {
    if (extraTubs < maxExtraTubs) {
      setExtraTubs(extraTubs + 1)
    }
  }
  
  const handleExtraDecrease = () => {
    if (extraTubs > 0) {
      setExtraTubs(extraTubs - 1)
    }
  }
  
  const handleAddToCart = () => {
    // Create the cart item with proper title and pricing
    const cartItem = {
      id: `${product.id}-${totalTubs}tubs-${Date.now()}`,
      title: `${product.title} (${totalTubs} tubs)`,
      price: totalPrice, // Total price for the entire selection
      image: product.image,
      variantId: product.variantId,
      isCustom: false,
      quantity: 1, // Always 1 "bundle"
      totalTubs: totalTubs,
      originalPrice: product.price
    }
    
    onAddToCart(cartItem)
    
    // Show success message
    alert(`Added ${totalTubs} Party Tubs to cart! Total: £${totalPrice.toFixed(2)}`)
    
    // Reset extra tubs counter
    setExtraTubs(0)
  }

  return (
    <div className="space-y-6">
      {/* Base Package - Fun colorful style */}
      <div className={`bg-gradient-to-br ${basePackageColour.gradient} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden`}>
        {/* Fun decorative elements */}
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 transform rotate-12" />
        <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-white/5" />
        <div className={`absolute top-4 left-4 w-3 h-3 ${basePackageColour.bg.replace('500', '300')} rounded-full animate-pulse shadow-lg`} />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-extrabold text-white mb-2 flex items-center gap-2">
                🎉 Base Party Package
                <Star className="w-5 h-5 text-white/80" fill="currentColor" />
              </h3>
              <p className="text-white/90 text-sm">Perfect starter pack for any party!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extrabold text-white drop-shadow-lg">£45.00</div>
              <div className="text-sm text-white/80 font-medium">10 tubs included</div>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
            <div className="text-sm text-white font-medium space-y-1">
              ✨ <strong>10 Party Tubs</strong> - Ready to go!<br/>
              🎪 Perfect for small to medium parties<br/>
              💝 Great value at £4.50 per tub
            </div>
          </div>
        </div>
      </div>

      {/* Extra Tubs Section - Matching fun style */}
      <div className={`bg-gradient-to-br ${extraTubsColour.gradient} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden`}>
        {/* Fun decorative elements */}
        <div className="absolute top-0 right-0 w-0 h-0 border-r-[60px] border-t-[60px] border-r-transparent border-t-white/10" />
        <div className={`absolute bottom-8 right-8 w-4 h-4 ${extraTubsColour.bg.replace('500', '300')} rounded-full opacity-60 animate-pulse shadow-lg`} />
        
        <div className="relative z-10">
          <div className="mb-6">
            <h3 className="text-xl font-extrabold text-white mb-2 flex items-center gap-2">
              🍬 Add Extra Tubs
              <Sparkles className="w-5 h-5 text-white/80" />
              <span className="text-sm font-medium text-white/80 bg-white/20 px-2 py-1 rounded-full">(£4.50 each)</span>
            </h3>
            <p className="text-white/90 text-sm">Need more for a bigger party? Add extra tubs at just £4.50 each!</p>
          </div>

          {/* Extra Tubs Counter - Fun style matching SweetPicker */}
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-lg">
              <button
                onClick={handleExtraDecrease}
                disabled={extraTubs <= 0}
                className="p-4 text-white hover:text-white/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:scale-110 transform duration-200"
              >
                <Minus className="w-6 h-6 font-bold" />
              </button>
              
              <div className="px-8 py-4 text-center">
                <div className="text-3xl font-extrabold text-white drop-shadow-lg">{extraTubs}</div>
                <div className="text-xs text-white/80 font-medium">extra tubs</div>
              </div>
              
              <button
                onClick={handleExtraIncrease}
                disabled={extraTubs >= maxExtraTubs}
                className="p-4 text-white hover:text-white/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:scale-110 transform duration-200"
              >
                <Plus className="w-6 h-6 font-bold" />
              </button>
            </div>

            <div className="text-right">
              <div className="text-2xl font-extrabold text-white drop-shadow-lg">
                +£{(extraTubs * extraTubPrice).toFixed(2)}
              </div>
              <div className="text-xs text-white/80 font-medium">for {extraTubs} extra</div>
            </div>
          </div>

          {/* Fun badge when extras added */}
          {extraTubs > 0 && (
            <div className="mt-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg text-center border border-white/30">
              ✨ EXTRA TUBS ADDED! Big party vibes! 🎉
            </div>
          )}
        </div>
      </div>

      {/* Total Summary - Matching the green success style from SweetPicker */}
      <div className={`bg-gradient-to-br ${totalColour.gradient} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden`}>
        {/* Fun decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-full"></div>
        <div className={`absolute bottom-12 left-12 w-2 h-2 ${totalColour.bg.replace('500', '300')} rounded-full opacity-80 animate-pulse shadow-lg`} style={{animationDelay: '0.7s'}} />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-2">
                Your Party Order
                <Heart className="w-6 h-6 text-white/80" />
              </h3>
              <p className="text-white/90 font-medium">{totalTubs} tubs total - perfect for your party!</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-extrabold text-white drop-shadow-lg">£{totalPrice.toFixed(2)}</div>
              <div className="text-sm text-white/80 font-medium">£{(totalPrice / totalTubs).toFixed(2)} per tub</div>
            </div>
          </div>

          {/* Breakdown - Matching the summary style */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 mb-6 space-y-3">
            <div className="flex justify-between text-sm font-medium text-white">
              <span>Base package (10 tubs):</span>
              <span>£45.00</span>
            </div>
            {extraTubs > 0 && (
              <div className="flex justify-between text-sm font-medium text-white/90">
                <span>Extra tubs ({extraTubs} × £4.50):</span>
                <span>£{(extraTubs * extraTubPrice).toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-white/30 pt-3 flex justify-between font-extrabold text-lg text-white">
              <span>Total ({totalTubs} tubs):</span>
              <span className="drop-shadow-lg">£{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Add to Cart Button - Matching the style from other components */}
          <button
            onClick={handleAddToCart}
            className="w-full font-extrabold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-white hover:border-opacity-50 relative overflow-hidden bg-white text-gray-800 hover:bg-gray-50 flex items-center justify-center gap-3"
          >
            {/* Subtle animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
            <ShoppingBag className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Add {totalTubs} Party Tubs to Bag - £{totalPrice.toFixed(2)}</span>
          </button>

          {/* Savings message */}
          {extraTubs > 0 && (
            <div className="text-center mt-4 text-sm text-white font-bold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              🎉 You're saving £{((totalTubs * 5) - totalPrice).toFixed(2)} vs buying individually!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PartyTubSelector