import React from 'react'
import { ArrowRight } from 'lucide-react'

function CollectionCard({ collection, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
    >
      <div className="relative overflow-hidden rounded-3xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-90`} />
        
        {/* Shopify Image (if available) */}
        {collection.image && (
          <img 
            src={collection.image} 
            alt={collection.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        
        {/* Content */}
        <div className="relative p-8 h-64 flex flex-col justify-between text-white">
          <div>
            <h3 className="text-2xl font-extrabold mb-3 leading-tight">
              {collection.title}
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">
              {collection.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider font-medium opacity-75">
              {collection.isCustom 
                ? 'Customize' 
                : collection.productCount 
                  ? `${collection.productCount} items` 
                  : 'Explore'
              }
            </div>
            <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 transform rotate-12" />
        <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-white/5" />
      </div>
    </div>
  )
}

export default CollectionCard
