import React from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function CartIcon() {
  const { cartCount, toggleCart } = useCart()

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 sm:p-3 bg-white hover:bg-gray-50 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
      
      {/* Cart Count Badge - Responsive sizing */}
      {cartCount > 0 && (
        <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gradient-to-r from-phlox-500 to-phlox-600 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center animate-pulse">
          {cartCount > 99 ? '99+' : cartCount}
        </div>
      )}
      
      {/* Fun little sparkle when items in cart - Hidden on very small screens */}
      {cartCount > 0 && (
        <div className="absolute -top-1 -left-1 text-yellow_green-400 text-xs animate-bounce hidden xs:block">
          ✨
        </div>
      )}
    </button>
  )
}

export default CartIcon