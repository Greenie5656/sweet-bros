import React from 'react'
import { useCart } from '../../context/CartContext'
import { ShoppingCart } from 'lucide-react'

function CartIcon() {
  const { cartCount, toggleCart } = useCart()
  
  return (
    <button 
      onClick={toggleCart}
      className="relative p-3 bg-dodger_blue-500 text-white rounded-lg hover:bg-dodger_blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      <ShoppingCart className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-phlox-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </button>
  )
}

export default CartIcon