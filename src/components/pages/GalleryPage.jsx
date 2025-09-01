import React, { useState } from 'react'
import { Calendar, Tag, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { getItemColour } from '../../utils/colourHelpers'
import galleryData from '../../data/gallery.json'

function GalleryCard({ post, onClick }) {
  const cardColour = getItemColour(post.id);
  const mainImage = post.images[0];
  
  return (
    <div
      onClick={() => onClick(post)}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
    >
      <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
        
        {/* Solid Color Background Container with Full Image */}
        <div className={`relative h-80 ${cardColour.bg} overflow-hidden rounded-2xl p-4`}>
          
          {/* Decorative transparent balls - like other sections */}
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-8 h-8 rounded-full bg-white/20 animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/3 left-4 w-6 h-6 rounded-full bg-white/15 opacity-80" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 right-8 w-4 h-4 rounded-full bg-white/25 animate-pulse" style={{animationDelay: '0.3s'}}></div>
          
          {/* Full Image - visible and contained */}
          {mainImage ? (
            <img 
              src={mainImage}
              alt={post.title}
              className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700 rounded-xl relative z-10"
              onError={(e) => {
                // Hide broken images gracefully
                e.target.style.display = 'none'
              }}
            />
          ) : (
            // Fallback for missing images
            <div className="w-full h-full flex items-center justify-center relative z-10">
              <div className="text-6xl text-white opacity-80">📸</div>
            </div>
          )}
          
          {/* Corner decoration */}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border-4 border-gray-200 opacity-80 group-hover:scale-110 transition-all duration-300 z-20"></div>
        </div>

        {/* Content - Clean Title Only */}
        <div className="p-6">          
          <h3 className={`font-bold text-xl text-gray-800 group-hover:text-phlox-600 transition-colors leading-tight text-center`}>
            {post.title}
          </h3>
          
          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`${cardColour.bg} ${cardColour.hover} text-white px-3 py-1 rounded-full text-xs font-medium transition-all duration-300`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function GalleryModal({ post, onClose, onNext, onPrevious }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  if (!post) return null
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === post.images.length - 1 ? 0 : prev + 1
    )
  }
  
  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? post.images.length - 1 : prev - 1
    )
  }
  
  const cardColour = getItemColour(post.id)
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all duration-300 z-10"
      >
        <X className="w-6 h-6 text-gray-800" />
      </button>
      
      {/* Modal Content */}
      <div className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Image Section - Full Image Display */}
        <div className={`relative ${cardColour.bg} h-96 overflow-hidden rounded-2xl p-4`}>
          
          {/* Decorative transparent balls */}
          <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-white/10 animate-float"></div>
          <div className="absolute bottom-8 left-8 w-10 h-10 rounded-full bg-white/20 animate-bounce" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-1/4 left-6 w-6 h-6 rounded-full bg-white/15 opacity-60" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute bottom-1/3 right-12 w-8 h-8 rounded-full bg-white/25 animate-pulse" style={{animationDelay: '0.4s'}}></div>
          
          <img 
            src={post.images[currentImageIndex]}
            alt={`${post.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-contain rounded-xl relative z-10"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" fill="%23666" font-size="20">📸 Image not found</text></svg>'
            }}
          />
          
          {/* Image navigation */}
          {post.images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-bold z-20">
                {currentImageIndex + 1} / {post.images.length}
              </div>
            </>
          )}
        </div>
        
        {/* Content Section - Title and Tags Only */}
        <div className="p-8">          
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            {post.title}
          </h2>
          
          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3">
            <Tag className="w-5 h-5 text-gray-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`${cardColour.bg} text-white px-4 py-2 rounded-full text-sm font-medium`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function GalleryPage() {
  const [selectedPost, setSelectedPost] = useState(null)
  const [filterTag, setFilterTag] = useState('all')
  
  // Get all unique tags
  const allTags = ['all', ...new Set(galleryData.posts.flatMap(post => post.tags))]
  
  // Filter posts by tag
  const filteredPosts = filterTag === 'all' 
    ? galleryData.posts 
    : galleryData.posts.filter(post => post.tags.includes(filterTag))
  
  const openModal = (post) => {
    setSelectedPost(post)
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  }
  
  const closeModal = () => {
    setSelectedPost(null)
    document.body.style.overflow = 'unset'
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      
      {/* Header */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">
            📸 Sweet Memories 📸
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Follow our <span className="font-bold text-phlox-600">sweet journey</span> through photos! From <span className="font-semibold text-red-600">brother bonding</span> to <span className="font-bold text-dodger_blue-600">business success</span>.
          </p>
          
          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  filterTag === tag
                    ? 'bg-gradient-to-r from-phlox-500 to-phlox-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-phlox-300'
                }`}
              >
                {tag === 'all' ? '🍭 All Photos' : `#${tag}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No photos found</h3>
              <p className="text-gray-500">Try selecting a different tag!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <GalleryCard
                  key={post.id}
                  post={post}
                  onClick={openModal}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedPost && (
        <GalleryModal
          post={selectedPost}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default GalleryPage