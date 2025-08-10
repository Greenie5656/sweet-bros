import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Sparkles, Heart } from 'lucide-react'

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-800 mb-6 leading-tight">
              Sweet Bros
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              The sweetest pick & mix experience in town. Build your perfect bag or choose from our amazing collections!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/shop"
              className="bg-gradient-to-r from-phlox-500 to-phlox-600 hover:from-phlox-600 hover:to-phlox-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3"
            >
              <ShoppingBag className="w-6 h-6" />
              Start Shopping
            </Link>
            
            <Link
              to="/shop"
              className="bg-gradient-to-r from-yellow_green-500 to-yellow_green-600 hover:from-yellow_green-600 hover:to-yellow_green-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3"
            >
              <Sparkles className="w-6 h-6" />
              Build Your Own
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-phlox-400 to-phlox-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Custom Mixes</h3>
              <p className="text-gray-600">Pick exactly what you love from our huge selection</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow_green-400 to-yellow_green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Ready Made</h3>
              <p className="text-gray-600">Grab our expertly curated themed bags</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Made Fresh</h3>
              <p className="text-gray-600">All sweets are fresh and carefully selected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gradient-to-r from-phlox-50 to-yellow_green-50 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-extrabold text-gray-800 mb-2">50+</div>
              <div className="text-gray-600">Sweet Varieties</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gray-800 mb-2">500g</div>
              <div className="text-gray-600">Perfect Bag Size</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gray-800 mb-2">£7.50</div>
              <div className="text-gray-600">Great Value</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gray-800 mb-2">100%</div>
              <div className="text-gray-600">Fresh & Tasty</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage