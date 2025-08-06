import React, { useState, useEffect } from 'react'
import { getCollectionByHandle } from '../utils/shopify'

function ShopifyTest() {
  const [collection, setCollection] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const testShopifyConnection = async () => {
      try {
        setLoading(true)
        const data = await getCollectionByHandle('build-your-own-pick-n-mix-bag')
        setCollection(data.collectionByHandle)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Shopify test failed:', err)
      } finally {
        setLoading(false)
      }
    }

    testShopifyConnection()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-4xl mb-4">🔄</div>
        <h2 className="text-xl font-bold text-gray-800">Testing Shopify Connection...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <div className="text-4xl mb-4">❌</div>
        <h2 className="text-xl font-bold text-red-800 mb-2">Connection Failed</h2>
        <p className="text-red-600">{error}</p>
        <p className="text-sm text-red-500 mt-2">Check your .env file and Shopify credentials</p>
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-yellow-800">Collection Not Found</h2>
        <p className="text-yellow-600">Could not find "build-your-own-pick-n-mix-bag" collection</p>
      </div>
    )
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-8">
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-green-800">Shopify Connected Successfully!</h2>
      </div>

      {/* Collection Info */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{collection.title}</h3>
        {collection.image && (
          <img 
            src={collection.image.url} 
            alt={collection.title}
            className="max-w-xs mx-auto rounded-lg shadow-md mb-4"
          />
        )}
        <p className="text-gray-600">{collection.description}</p>
      </div>

      {/* Products List */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Products Found: {collection.products.edges.length}
        </h4>
        <div className="grid gap-4">
          {collection.products.edges.slice(0, 5).map(({ node }) => (
            <div key={node.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                {node.images.edges[0] && (
                  <img 
                    src={node.images.edges[0].node.url} 
                    alt={node.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">{node.title}</h5>
                  <p className="text-sm text-gray-600 line-clamp-2">{node.description}</p>
                  {node.variants.edges[0] && (
                    <p className="text-sm font-semibold text-green-600 mt-1">
                      £{node.variants.edges[0].node.price.amount}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {collection.products.edges.length > 5 && (
          <p className="text-sm text-gray-500 mt-4 text-center">
            ...and {collection.products.edges.length - 5} more products
          </p>
        )}
      </div>
    </div>
  )
}

export default ShopifyTest