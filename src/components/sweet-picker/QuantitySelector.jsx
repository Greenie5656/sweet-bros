import React, { useState, useEffect } from 'react'
import { Plus, Minus } from 'lucide-react'

function QuantitySelector({ min = 1, max = 10, onChange, product }) {
  const [quantity, setQuantity] = useState(min)

  // Check if this product uses dynamic pricing (party supplies)
  const usesDynamicPricing = product?.collection === 'party-supplies' || 
                            product?.title?.toLowerCase().includes('party') ||
                            product?.title?.toLowerCase().includes('tub')

  // Dynamic pricing calculation
  const calculatePrice = (qty) => {
    if (!usesDynamicPricing) {
      return product?.price * qty || 0
    }

    // Party tubs pricing: £45 for base (10 tubs) + £4.50 per additional tub
    const basePrice = product?.price || 45  // £45 for base package
    const baseQuantity = 10  // Base package includes 10 tubs
    const extraTubPrice = 4.50  // £4.50 per extra tub
    
    if (qty <= baseQuantity) {
      // If ordering base package or less, just charge base price
      return basePrice
    } else {
      // Base price + extra tubs
      const extraTubs = qty - baseQuantity
      return basePrice + (extraTubs * extraTubPrice)
    }
  }

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      
      // Pass both quantity and calculated price to parent
      const calculatedPrice = calculatePrice(newQuantity)
      onChange?.({ quantity: newQuantity, totalPrice: calculatedPrice })
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      
      // Pass both quantity and calculated price to parent
      const calculatedPrice = calculatePrice(newQuantity)
      onChange?.({ quantity: newQuantity, totalPrice: calculatedPrice })
    }
  }

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || min
    const clampedValue = Math.max(min, Math.min(max, value))
    setQuantity(clampedValue)
    
    // Pass both quantity and calculated price to parent
    const calculatedPrice = calculatePrice(clampedValue)
    onChange?.({ quantity: clampedValue, totalPrice: calculatedPrice })
  }

  // Initialize with correct pricing on mount
  useEffect(() => {
    const calculatedPrice = calculatePrice(quantity)
    onChange?.({ quantity, totalPrice: calculatedPrice })
  }, [])

  const currentTotal = calculatePrice(quantity)

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white rounded-xl border-2 border-gray-200 shadow-sm">
          <button
            onClick={handleDecrease}
            disabled={quantity <= min}
            className="p-3 text-gray-500 hover:text-phlox-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>
          
          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            min={min}
            max={max}
            className="w-16 text-center text-xl font-bold text-gray-800 bg-transparent border-none outline-none"
          />
          
          <button
            onClick={handleIncrease}
            disabled={quantity >= max}
            className="p-3 text-gray-500 hover:text-phlox-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          {min !== max && (
            <span>Range: {min}-{max}</span>
          )}
        </div>
      </div>

      {/* Dynamic Pricing Display for Party Products */}
      {usesDynamicPricing && (
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 rounded-xl p-4 shadow-sm">
          <div className="space-y-2">
            <div className="font-semibold text-gray-800 flex items-center gap-2">
              🎉 Party Pricing Breakdown:
            </div>
            
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Base package (10 tubs):</span>
                <span className="font-medium">£45.00</span>
              </div>
              
              {quantity > 10 && (
                <div className="flex justify-between text-orange-600">
                  <span>Extra tubs ({quantity - 10} × £4.50):</span>
                  <span className="font-medium">£{((quantity - 10) * 4.50).toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total for {quantity} tubs:</span>
                <span className="text-orange-600">£{currentTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              💡 Save money by buying in bulk! Each extra tub is only £4.50
            </div>
          </div>
        </div>
      )}

      {/* Regular Pricing Display */}
      {!usesDynamicPricing && (
        <div className="text-lg font-semibold text-gray-800">
          Total: £{currentTotal.toFixed(2)}
        </div>
      )}
    </div>
  )
}

export default QuantitySelector