import React from 'react'
import CollectionCard from './CollectionCard'

function CollectionGrid({ collections, onCollectionClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          onClick={() => onCollectionClick(collection)}
        />
      ))}
    </div>
  )
}

export default CollectionGrid