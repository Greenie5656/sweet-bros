import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sweetBrosCart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sweetBrosCart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity) => {
    console.log('addToCart called with:', product, quantity) // Debug log
    if (quantity <= 0) return

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevItems, {
          id: product.id,
          title: product.title,
          price: parseFloat(product.price),
          image: product.image,
          quantity: quantity,
          variantId: product.variantId,
          // SAVE ALL CUSTOM PROPERTIES
          isCustom: product.isCustom || false,
          customSweets: product.customSweets || null,
          customCables: product.customCables || null,
          customType: product.customType || null
        }]
      }
    })
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prevItems => 
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  // Calculate cart totals
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const value = {
    cartItems,
    cartCount,
    cartTotal: cartTotal.toFixed(2),
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    closeCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext