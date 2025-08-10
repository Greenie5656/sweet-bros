// Shopify Storefront API configuration
const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN

// Base API function
export const shopifyFetch = async (query, variables = {}) => {
  try {
    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN
      },
      body: JSON.stringify({ query, variables })
    })

    const data = await response.json()
    
    if (data.errors) {
      console.error('Shopify API errors:', data.errors)
      throw new Error('Shopify API Error')
    }
    
    return data.data
  } catch (error) {
    console.error('Shopify fetch error:', error)
    throw error
  }
}

// Get collection by handle
export const getCollectionByHandle = async (handle) => {
  const query = `
    query getCollection($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        title
        description
        image {
          url
        }
        products(first: 20) {
          edges {
            node {
              id
              title
              description
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  
  return shopifyFetch(query, { handle })
}

// Get multiple collections at once
export const getMultipleCollections = async (handles) => {
  const query = `
    query getCollections {
      ${handles.map((handle, index) => `
        collection${index}: collectionByHandle(handle: "${handle}") {
          id
          title
          description
          handle
          image {
            url
          }
          products(first: 5) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      `).join('\n')}
    }
  `
  
  return shopifyFetch(query)
}

// Get individual sweets for custom builders (from "All Products" collection)
export const getAllSweets = async () => {
  const query = `
    query getAllProducts {
      products(first: 50, query: "tag:individual") {
        edges {
          node {
            id
            title
            description
            tags
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  
  return shopifyFetch(query)
}