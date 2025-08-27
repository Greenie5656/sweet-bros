import React, { useState, useEffect } from 'react'
import { Sparkles, Heart, Star, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import SweetPicker from './SweetPicker'
import QuantitySelector from './QuantitySelector'
import PartyTubSelector from './PartyTubSelector'
import { getItemColour } from '../../utils/colourHelpers'
import { getProductWithVariants } from '../../utils/shopify'

function ProductDetail({ product, onBack }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(product.minQuantity || 1)
  const [totalPrice, setTotalPrice] = useState(product.price)
  const [selectedSweets, setSelectedSweets] = useState([])
  const [productVariants, setProductVariants] = useState([])
  const [variantsLoaded, setVariantsLoaded] = useState(false)
  
  // Get consistent color for this product
  const productColour = getItemColour(product.id)

  // Check if this is a party tub product
  const isPartyTubProduct = product?.collection === 'party-supplies' || 
                           product?.title?.toLowerCase().includes('party') ||
                           product?.title?.toLowerCase().includes('tub')

  // Load variants for party tub products
  useEffect(() => {
    const loadVariants = async () => {
      if (isPartyTubProduct) {
        try {
          const productId = import.meta.env.VITE_PARTY_TUBS_PRODUCT_ID
          
          if (productId) {
            const productData = await getProductWithVariants(productId)
            
            if (productData && productData.variants) {
              const variants = productData.variants.edges.map(edge => edge.node)
              setProductVariants(variants)
            }
          }
        } catch (error) {
          console.error('Error loading product variants:', error)
        } finally {
          setVariantsLoaded(true)
        }
      } else {
        setVariantsLoaded(true)
      }
    }

    loadVariants()
  }, [product, isPartyTubProduct])

  // Handle party tub cart additions
  const handlePartyTubAddToCart = (cartItem) => {
    const correctVariant = productVariants.find(variant => {
      const quantityString = `${cartItem.totalTubs} Tubs`
      
      return variant.title === quantityString ||
             variant.selectedOptions.some(option => 
               option.value === quantityString || 
               option.value === cartItem.totalTubs.toString()
             )
    })

    if (!correctVariant) {
      alert('Sorry, that quantity is not available. Please try a different amount.')
      return
    }

    addToCart({
      id: `${product.id}-variant-${correctVariant.id}`,
      title: `${product.title} (${cartItem.totalTubs} tubs)`,
      price: parseFloat(correctVariant.price.amount),
      image: cartItem.image,
      variantId: correctVariant.id,
      isCustom: false,
      totalTubs: cartItem.totalTubs
    }, 1)
  }

  // Handle quantity/price changes
  const handleQuantityChange = (data) => {
    if (typeof data === 'number') {
      setQuantity(data)
      setTotalPrice(product.price * data)
    } else {
      setQuantity(data.quantity)
      setTotalPrice(data.totalPrice)
    }
  }

  const handleAddToCart = () => {
    // For custom products, validate selections
    if (product.isCustom) {
      const minRequired = product.customType === 'cables' ? 4 : 10
      const maxAllowed = product.customType === 'cables' ? 4 : 20
      
      if (selectedSweets.length < minRequired) {
        alert(`Please select at least ${minRequired} ${product.customType === 'cables' ? 'cable flavours' : 'sweets'}!`)
        return
      }
      
      if (selectedSweets.length > maxAllowed) {
        alert(`Please select no more than ${maxAllowed} ${product.customType === 'cables' ? 'cable flavours' : 'sweets'}!`)
        return
      }
    }

    // Create custom title
    let customTitle = product.title
    if (product.isCustom && selectedSweets.length > 0) {
      const sweetNames = selectedSweets.map(s => s.name).join(', ')
      customTitle = `${product.title} (${sweetNames})`
    }

    const usesDynamicPricing = product?.collection === 'party-supplies' || 
                              product?.title?.toLowerCase().includes('party') ||
                              product?.title?.toLowerCase().includes('tub')
    
    if (usesDynamicPricing && quantity !== 1) {
      customTitle = `${product.title} (${quantity} tubs)`
    }

    const effectivePrice = totalPrice / quantity

    addToCart({
      id: product.isCustom ? `${product.id}-${Date.now()}` : product.id,
      title: customTitle,
      price: effectivePrice,
      image: product.image,
      variantId: product.variantId,
      customSweets: product.isCustom && product.customType !== 'cables' ? selectedSweets : null,
      customCables: product.isCustom && product.customType === 'cables' ? selectedSweets : null,
      isCustom: product.isCustom || false,
      originalPrice: product.price,
      totalPrice: totalPrice,
      usesDynamicPricing: usesDynamicPricing
    }, quantity)

    alert(`Added ${quantity} x ${customTitle} to cart! Total: £${totalPrice.toFixed(2)}`)
    
    if (product.isCustom) {
      setSelectedSweets([])
    }
  }

  const canAddToCart = () => {
    if (!product.isCustom) return true
    
    const minRequired = product.customType === 'cables' ? 4 : 10
    const maxAllowed = product.customType === 'cables' ? 4 : 20
    
    return selectedSweets.length >= minRequired && selectedSweets.length <= maxAllowed
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Simple colored header strip */}
      <div className="relative mb-8">
        <div className={`h-3 bg-gradient-to-r ${productColour.gradient} rounded-full shadow-md opacity-70`} />
        <div className={`absolute -top-1 left-8 w-5 h-5 ${productColour.bg} rounded-full border-2 border-white shadow-sm animate-bounce`} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image with simple border */}
        <div className="relative">
          <div 
            className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-xl relative border-4 transition-colors"
            style={{
              borderColor: productColour.bg === 'bg-phlox-500' ? '#dd18fe' : 
                          productColour.bg === 'bg-red-500' ? '#ff000c' : 
                          productColour.bg === 'bg-yellow_green-500' ? '#9fd600' : 
                          productColour.bg === 'bg-dodger_blue-500' ? '#0495ff' : '#dd18fe'
            }}
          >
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-contain sm:object-cover hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-9xl drop-shadow-lg">
                  {product.customType === 'cables' ? '🪱' : '🬬'}
                </div>
              </div>
            )}
          </div>
          
          {product.isCustom && (
            <div className={`absolute top-6 left-6 ${productColour.bg} text-white px-4 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl border-2 border-white`}>
              <Sparkles className="w-5 h-5" />
              <span>Customizable</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="relative mb-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                {product.title}
              </h1>
              <div className={`h-1.5 w-16 ${productColour.bg} rounded-full mt-3 opacity-70 shadow-sm`} />
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price section with colorful border */}
          <div 
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-4 transition-colors shadow-sm"
            style={{
              borderColor: productColour.bg === 'bg-phlox-500' ? '#e348fe' : 
                          productColour.bg === 'bg-red-500' ? '#ff333d' : 
                          productColour.bg === 'bg-yellow_green-500' ? '#c4ff12' : 
                          productColour.bg === 'bg-dodger_blue-500' ? '#37acff' : '#e348fe'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-extrabold text-gray-800">
                  £{totalPrice.toFixed(2)}
                </div>
                {quantity > 1 && (
                  <div className="text-lg text-gray-600 mt-1">
                    {quantity} × {(totalPrice / quantity).toFixed(2)} each
                  </div>
                )}
                {product.minQuantity && (
                  <div className="text-sm text-red-600 font-medium mt-1">
                    Minimum order: {product.minQuantity} units
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Heart className={`w-8 h-8 ${productColour.text} opacity-60`} />
                <Star className={`w-6 h-6 ${productColour.text} opacity-40`} fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Party Tub Selector */}
          {isPartyTubProduct ? (
            <div className="border-4 border-orange-200 rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>Configure Your Party Order</span>
                <div className={`w-2 h-2 ${productColour.bg} rounded-full animate-pulse`} />
              </h3>
              
              {!variantsLoaded ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2 animate-bounce">🎉</div>
                  <div className="text-gray-600">Loading party options...</div>
                </div>
              ) : (
                <PartyTubSelector 
                  product={product}
                  onAddToCart={handlePartyTubAddToCart}
                  productColour={productColour}
                  variants={productVariants}
                />
              )}
            </div>
          ) : (
            <>
              {/* Regular Quantity Selector */}
              {!product.isCustom && (
                <div className="border-4 border-blue-200 rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>Quantity</span>
                    <div className={`w-2 h-2 ${productColour.bg} rounded-full animate-pulse`} />
                  </h3>
                  <QuantitySelector 
                    min={product.minQuantity || 1}
                    max={99}
                    onChange={handleQuantityChange}
                    product={product}
                  />
                </div>
              )}

              {/* Sweet/Cable Picker */}
              {product.isCustom && (
                <div className="border-4 border-green-200 rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>
                      {product.customType === 'cables' 
                        ? 'Choose Your Cable Flavours' 
                        : 'Build Your Perfect Mix'
                      }
                    </span>
                    <Sparkles className={`w-5 h-5 ${productColour.text} opacity-60`} />
                  </h3>
                  <SweetPicker 
                    type={product.customType || 'sweets'} 
                    onSelectionChange={setSelectedSweets}
                  />
                </div>
              )}

              {/* Selection Summary */}
              {product.isCustom && selectedSweets.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-green-100 border-4 border-green-300 rounded-2xl p-4 shadow-sm">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <span>Your Selection ({selectedSweets.length} items):</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </h4>
                  <div className="text-sm text-green-700">
                    {selectedSweets.map(sweet => sweet.name).join(', ')}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button 
                onClick={handleAddToCart}
                disabled={!canAddToCart()}
                className={`
                  w-full font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-white flex items-center justify-center gap-3
                  ${canAddToCart() 
                    ? `bg-gradient-to-r ${productColour.gradient} text-white shadow-lg` 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>
                  {product.isCustom 
                    ? (canAddToCart() ? 'Add Custom Mix to Bag' : 'Please Complete Your Selection')
                    : `Add to Bag - £${totalPrice.toFixed(2)}`
                  }
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail