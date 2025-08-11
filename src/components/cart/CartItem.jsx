import React from 'react'
import { Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function CartItem({ item }) {
  const { addToCart, removeFromCart, updateQuantity } = useCart()

  // Debug: Let's see what we're getting
  console.log('CartItem received:', item)

  // Safely handle the item object
  if (!item) {
    return <div className="p-4 text-red-500">Error: No item data</div>
  }

  // Safely handle price calculation
  const itemPrice = item.price || 0
  const itemQuantity = item.quantity || 1
  const totalPrice = (itemPrice * itemQuantity).toFixed(2)

  const handleIncrease = () => {
    updateQuantity(item.id, itemQuantity + 1)
  }

  const handleDecrease = () => {
    updateQuantity(item.id, itemQuantity - 1)
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Product Image */}
      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            🍬
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-800 text-sm leading-tight mb-1 truncate">
          {item.title}
        </h4>
        <div className="text-xs text-gray-500 mb-2">
          £{itemPrice.toFixed(2)} each
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-lg transition-colors"
          >
            {itemQuantity === 1 ? (
              <Trash2 className="w-4 h-4" />
            ) : (
              <Minus className="w-4 h-4" />
            )}
          </button>
          
          <span className="w-8 text-center font-medium text-gray-800">
            {itemQuantity}
          </span>
          
          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-phlox-100 text-gray-600 hover:text-phlox-600 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="text-right">
        <div className="font-bold text-gray-800">
          £{totalPrice}
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="mt-1 text-xs text-red-500 hover:text-red-700 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem