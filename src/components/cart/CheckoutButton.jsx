import React, { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { createCart, getProductVariantId } from '../../utils/shopify'

function CheckoutButton({ cartItems, onSuccess, onError }) {
  const [loading, setLoading] = useState(false)

  // Map your cart items to Shopify line items
  const convertToShopifyLineItems = async (items) => {
    console.log('=== CONVERTING TO SHOPIFY LINE ITEMS ===')
    const lineItems = []
    
    for (const item of items) {
      console.log('Processing item:', item)
      console.log('Item isCustom:', item.isCustom)
      console.log('Item variantId:', item.variantId)
      console.log('Item totalTubs:', item.totalTubs)
      
      if (item.isCustom) {
        console.log('This is a custom item')
        
        // Get the correct product ID from environment
        const productId = item.customSweets 
          ? import.meta.env.VITE_CUSTOM_SWEET_BAG_PRODUCT_ID
          : import.meta.env.VITE_CUSTOM_CABLE_BAG_PRODUCT_ID
        
        console.log('Using product ID:', productId)
        console.log('Has customSweets:', !!item.customSweets)
        console.log('Has customCables:', !!item.customCables)
        
        if (!productId) {
          throw new Error(`Missing product ID for custom ${item.customSweets ? 'sweet' : 'cable'} bag`)
        }
        
        console.log(`Fetching variant ID for product: ${productId}`)
        
        // Get the variant ID from Shopify
        const variantId = await getProductVariantId(productId)
        
        console.log(`Got variant ID: ${variantId}`)
        
        lineItems.push({
          merchandiseId: variantId,
          quantity: item.quantity,
          attributes: [
            {
              key: 'Custom_Product_Type',
              value: item.customSweets ? 'Sweet Bag' : 'Cable Bag'
            },
            {
              key: 'Selected_Items',
              value: item.customSweets 
                ? item.customSweets.map(s => s.name).join(', ')
                : item.customCables 
                  ? item.customCables.map(c => c.name).join(', ')
                  : 'Custom selection'
            },
            {
              key: 'Original_Title',
              value: item.title
            }
          ]
        })
      } else {
        console.log('This is a regular item, using existing variant ID:', item.variantId)
        // Regular Shopify products - use their existing variant ID
        // Party tubs with variants will have the correct variant ID already set
        lineItems.push({
          merchandiseId: item.variantId,
          quantity: item.quantity
        })
      }
    }
    
    console.log('Final line items:', lineItems)
    return lineItems
  }

  const handleCheckout = async () => {
    console.log('=== ENVIRONMENT CHECK ===')
  console.log('SHOPIFY_DOMAIN:', import.meta.env.VITE_SHOPIFY_DOMAIN)
  console.log('Expected: shop.sweet-bros.co.uk')
    if (!cartItems || cartItems.length === 0) {
      onError?.('Cart is empty')
      return
    }

    setLoading(true)

    try {
      console.log('=== CHECKOUT DEBUG ===')
      console.log('Cart items:', cartItems)
      
      // Convert cart items to Shopify format (now async)
      const lineItems = await convertToShopifyLineItems(cartItems)
      
      console.log('Converted line items:', lineItems)
      console.log('Creating Shopify cart with items:', lineItems)

      // Create cart in Shopify
      const response = await createCart(lineItems)

      if (response.cartCreate.userErrors.length > 0) {
        throw new Error(response.cartCreate.userErrors[0].message)
      }

      const cart = response.cartCreate.cart
      
      if (!cart.checkoutUrl) {
        throw new Error('No checkout URL received from Shopify')
      }

console.log('Cart created successfully:', cart.id)
console.log('Original checkout URL:', cart.checkoutUrl)

// Call success callback if provided
onSuccess?.(cart)

// Replace domain in checkout URL
let finalCheckoutUrl = cart.checkoutUrl.replace('kkidz3-1h.myshopify.com', 'shop.sweet-bros.co.uk')
console.log('Final checkout URL:', finalCheckoutUrl)


// Redirect to Shopify checkout using modified URL
window.location.href = finalCheckoutUrl

    } catch (error) {
      console.error('Checkout error:', error)
      onError?.(error.message || 'Something went wrong during checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || !cartItems || cartItems.length === 0}
      className={`
        w-full font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3
        ${loading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-phlox-500 to-phlox-600 hover:from-phlox-600 hover:to-phlox-700 text-white'
        }
      `}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Creating your order...</span>
        </>
      ) : (
        <>
          <span>Checkout with Shopify</span>
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </button>
  )
}

export default CheckoutButton