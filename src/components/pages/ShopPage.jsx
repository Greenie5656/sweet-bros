import React, { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import CollectionGrid from '../sweet-picker/CollectionGrid'
import ProductGrid from '../sweet-picker/ProductGrid'
import ProductDetail from '../sweet-picker/ProductDetail'
import { getMultipleCollections, getCollectionByHandle } from '../../utils/shopify'
import { useScrollToTop } from '../../utils/scrollHelpers'

function ShopPage() {
  const [currentView, setCurrentView] = useState('collections')
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [collections, setCollections] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Use our enhanced scroll hook
  const { scrollWithDelay } = useScrollToTop()

  // Your actual Shopify collection handles - MUST match what's in Shopify!
  const collectionHandles = [
    'pick-mix-bags',
    'build-your-own-pick-n-mix-bag',
    'cable-bags', 
    'themed-picks',
    'mystery-boxes',
    'party-supplies',
    'bundles'
  ]

  // Collection display config - Custom names for display
  const collectionConfig = {
    'pick-mix-bags': {
      title: 'Pick & Mix Bags',
      description: 'Pre-mixed themed bags ready to go',
      color: 'from-phlox-400 to-phlox-600'
    },
    'build-your-own-pick-n-mix-bag': {
      title: 'Build Your Own Bag',
      description: 'Create your own perfect 500g Sweet Bros pick n mix bag',
      color: 'from-yellow_green-400 to-yellow_green-600',
      isCustom: true
    },
    'cable-bags': {
      title: 'Cable Bags', 
      description: 'Giant cables in a variety of flavours',
      color: 'from-red-400 to-red-600'
    },
    'themed-picks': {
      title: 'Themed Mixes',
      description: 'Specially selected mixes by our little CEOs',
      color: 'from-dodger_blue-400 to-dodger_blue-600'
    },
    'mystery-boxes': {
      title: 'Treat Boxes',
      description: 'Sweet tooth activated, grab a treat box loaded with goodies for every craving', 
      color: 'from-purple-400 to-purple-600'
    },
    'party-supplies': {
      title: 'Party Supplies',
      description: 'Perfect for parties, events and special occasions',
      color: 'from-orange-400 to-orange-600'
    },
    'bundles': {
      title: 'Bundles',
      description: 'Great value bundle deals',
      color: 'from-pink-400 to-pink-600'
    }
  }

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true)
        const data = await getMultipleCollections(collectionHandles)
        
        const collectionsData = collectionHandles.map((handle, index) => {
          const shopifyCollection = data[`collection${index}`]
          const config = collectionConfig[handle]
          
          if (config) {
            return {
              id: handle,
              handle: handle,
              title: config.title,
              description: config.description,
              image: shopifyCollection?.image?.url,
              productCount: shopifyCollection?.products?.edges?.length || 1,
              color: config.color,
              isCustom: config.isCustom || false,
              shopifyData: shopifyCollection
            }
          }
          return null
        }).filter(Boolean)
        
        setCollections(collectionsData)
        
        // Check if we should go directly to custom bag
        checkForDirectNavigation(collectionsData)
        
      } catch (err) {
        console.error('Error fetching collections:', err)
        setError('Failed to load collections')
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  // Check for direct navigation to custom bag
  const checkForDirectNavigation = (collectionsData) => {
    const hash = window.location.hash
    if (hash === '#custom-sweet-bag') {
      const customCollection = collectionsData.find(c => c.handle === 'build-your-own-pick-n-mix-bag')
      if (customCollection) {
        handleCollectionClick(customCollection, true)
      }
      window.history.replaceState(null, null, '/shop')
    }
  }

  const handleCollectionClick = async (collection, goDirectToProduct = false) => {
    try {
      setLoading(true)
      
      // For custom collections, create frontend-only products
      if (collection.isCustom) {
        let customProducts = []
        
        if (collection.handle === 'build-your-own-pick-n-mix-bag') {
          customProducts = [{
            id: 'custom-sweet-bag',
            title: 'Build Your Own Sweet Bag (500g)',
            description: 'Pick 10-20 of your favourite sweets for a custom 500g bag',
            price: 7.50,
            image: '/images/custom-bag-placeholder.jpg',
            variantId: null,
            collection: collection.handle,
            isCustom: true,
            customType: 'sweets'
          }]
        }
        
        setProducts(customProducts)
        
        // Update state first, then scroll after DOM updates
        setSelectedCollection(collection)
        
        if (goDirectToProduct && customProducts.length > 0) {
          setSelectedProduct(customProducts[0])
          setCurrentView('detail')
        } else {
          setCurrentView('products')
        }
        
        // Scroll after state updates with delay for DOM render
        scrollWithDelay(300)
        return
      } else {
        // For regular collections, fetch from Shopify
        const data = await getCollectionByHandle(collection.handle)
        
        if (data.collectionByHandle) {
          const productsData = data.collectionByHandle.products.edges.map(edge => ({
            id: edge.node.id,
            title: edge.node.title,
            description: edge.node.description,
            image: edge.node.images.edges[0]?.node.url || null,
            price: parseFloat(edge.node.variants.edges[0]?.node.price.amount || 0),
            variantId: edge.node.variants.edges[0]?.node.id,
            collection: collection.handle,
            isCustom: false
          }))
          
          // Handle cable bags custom logic
          if (collection.handle === 'cable-bags') {
            const customCableProduct = {
              id: 'custom-cable-bag',
              title: 'Build Your Own Cable Bag',
              description: 'Pick any 4 cable flavours you love most',
              price: 5.00,
              image: '/images/custom-cable-placeholder.jpg',
              variantId: null,
              collection: collection.handle,
              isCustom: true,
              customType: 'cables'
            }
            
            const hasCustom = productsData.some(p => p.title.includes('Build Your Own'))
            if (!hasCustom) {
              productsData.push(customCableProduct)
            } else {
              const customIndex = productsData.findIndex(p => p.title.includes('Build Your Own'))
              if (customIndex >= 0) {
                productsData[customIndex] = { ...productsData[customIndex], ...customCableProduct }
              }
            }
          }
          
          setProducts(productsData)
        }
      }
      
      // Update state first
      setSelectedCollection(collection)
      setCurrentView('products')
      
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to load products')
    } finally {
      setLoading(false)
      // Scroll after loading is complete and DOM has updated
      setTimeout(() => {
        scrollWithDelay(200)
      }, 100)
    }
  }

  const handleProductClick = (product) => {
    // Update state first
    setSelectedProduct(product)
    setCurrentView('detail')
    
    // Scroll after state update
    scrollWithDelay(250)
  }

  const handleBackToCollections = () => {
    // Update state first
    setCurrentView('collections')
    setSelectedCollection(null)
    setProducts([])
    
    // Scroll after state update
    scrollWithDelay(200)
  }

  const handleBackToProducts = () => {
    // Update state first
    setCurrentView('products')
    setSelectedProduct(null)
    
    // Scroll after state update
    scrollWithDelay(200)
  }

  // Loading state for initial collections load
  if (loading && currentView === 'collections') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🍬</div>
          <div className="text-xl font-semibold text-gray-600">Loading sweet collections...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <div className="text-xl font-semibold text-gray-600 mb-2">Oops!</div>
          <div className="text-gray-500">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-phlox-500 text-white px-6 py-2 rounded-lg hover:bg-phlox-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Enhanced Back Button with better mobile tap targets */}
      {currentView !== 'collections' && (
        <button
          onClick={currentView === 'products' ? handleBackToCollections : handleBackToProducts}
          className="fixed bottom-6 left-6 bg-gradient-to-r from-phlox-500 to-phlox-600 hover:from-phlox-600 hover:to-phlox-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl z-50 flex items-center gap-2 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 min-h-[56px] min-w-[56px]"
          disabled={loading}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">
            {currentView === 'products' ? 'Collections' : 'Products'}
          </span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow_green-400 rounded-full animate-pulse"></div>
        </button>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'collections' && (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">
                Sweet Bros Shop
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose your adventure! From pick & mix bags to custom creations
              </p>
            </div>
            <CollectionGrid 
              collections={collections}
              onCollectionClick={handleCollectionClick}
            />
          </div>
        )}

        {currentView === 'products' && selectedCollection && (
          <div>
            {loading ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-bounce">🍬</div>
                <div className="text-xl font-semibold text-gray-600">Loading products...</div>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-2">
                    {selectedCollection.title}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {selectedCollection.description}
                  </p>
                </div>
                <ProductGrid 
                  products={products}
                  onProductClick={handleProductClick}
                />
              </>
            )}
          </div>
        )}

        {currentView === 'detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onBack={handleBackToProducts}
          />
        )}
      </div>
    </div>
  )
}

export default ShopPage