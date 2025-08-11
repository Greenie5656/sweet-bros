import React from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function CartIcon() {
  const { cartCount, toggleCart } = useCart()

  return (
    <button
      onClick={toggleCart}
      className="relative p-3 bg-white hover:bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      <ShoppingBag className="w-6 h-6 text-gray-700" />
      
      {/* Cart Count Badge */}
      {cartCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-phlox-500 to-phlox-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          {cartCount > 99 ? '99+' : cartCount}
        </div>
      )}
      
      {/* Fun little sparkle when items in cart */}
      {cartCount > 0 && (
        <div className="absolute -top-1 -left-1 text-yellow_green-400 text-xs animate-bounce">
          ✨
        </div>
      )}
    </button>
  )
}

export default CartIcon