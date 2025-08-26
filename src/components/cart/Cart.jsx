import React, { useState } from 'react'
import { X, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'
import CheckoutButton from './CheckoutButton'

function Cart() {
  const { cartItems, cartTotal, cartCount, isCartOpen, closeCart } = useCart()
  const [checkoutError, setCheckoutError] = useState(null)

  if (!isCartOpen) return null

  const handleCheckoutSuccess = (cart) => {
    console.log('Checkout successful! Cart ID:', cart.id)
    // Clear local cart since order is now in Shopify
    // localStorage.removeItem('sweetBrosCart')
    // Note: User will be redirected to Shopify, so this might not execute
  }

  const handleCheckoutError = (error) => {
    console.error('Checkout failed:', error)
    setCheckoutError(error)
    
    // Clear error after 5 seconds
    setTimeout(() => setCheckoutError(null), 5000)
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-white to-gray-50 shadow-2xl z-50 transform transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-phlox-50 to-yellow_green-50">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-phlox-600" />
            <h2 className="text-xl font-bold text-gray-800">
              Your Sweet Bag
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Error Message */}
        {checkoutError && (
          <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            <strong>Checkout Error:</strong> {checkoutError}
          </div>
        )}

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          
          {/* Empty Cart State */}
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🍭</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Your bag is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Add some delicious sweets to get started!
                </p>
                <button
                  onClick={closeCart}
                  className="bg-gradient-to-r from-phlox-500 to-phlox-600 hover:from-phlox-600 hover:to-phlox-700 text-white font-medium py-2 px-6 rounded-xl transition-all duration-300"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="text-sm text-gray-600 mb-4">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} in your bag
                </div>
                
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-gray-200 p-6 bg-white">
                
                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-gray-800">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-gray-800">
                    £{cartTotal}
                  </span>
                </div>

                {/* Checkout Button */}
                <CheckoutButton 
                  cartItems={cartItems}
                  onSuccess={handleCheckoutSuccess}
                  onError={handleCheckoutError}
                />

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full mt-3 text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart