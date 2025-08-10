import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

function QuantitySelector({ min = 1, max = 10, onChange }) {
  const [quantity, setQuantity] = useState(min)

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || min
    const clampedValue = Math.max(min, Math.min(max, value))
    setQuantity(clampedValue)
    onChange?.(clampedValue)
  }

  return (
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
          <span>
            Range: {min}-{max}
          </span>
        )}
      </div>
    </div>
  )
}

export default QuantitySelector