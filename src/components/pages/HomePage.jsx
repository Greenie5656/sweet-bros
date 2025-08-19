import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Sparkles, Heart, Star, Gift, Zap } from 'lucide-react'
import { getItemColour, getRandomColour } from '../../utils/colourHelpers'

function HomePage() {
  // Create consistent "random" colours for different sections
  const heroButtonColours = {
    shop: getItemColour('hero-shop-button'),
    build: getItemColour('hero-build-button')
  }

  const featureColours = {
    custom: getItemColour('feature-custom'),
    ready: getItemColour('feature-ready'), 
    fresh: getItemColour('feature-fresh')
  }

  const statColours = {
    varieties: getItemColour('stat-varieties'),
    size: getItemColour('stat-size'),
    price: getItemColour('stat-price'),
    quality: getItemColour('stat-quality')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - ZERO white space, edge to edge */}
      <section className="text-center">
        <div className="w-full">
          {/* Floating Hero Logo - PULLED UP HARD against header */}
          <div className="flex justify-center -mt-6">
            <div className="animate-float hover:scale-105 transition-transform duration-300 cursor-pointer drop-shadow-2xl">
              <img 
                src="/sweet-bros-logo-hero.png" 
                alt="Sweet Bros" 
                className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-88 max-w-full object-contain filter drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
              />
            </div>
          </div>
          
          {/* Text directly under logo, minimal space */}
          <p className="text-base md:text-lg text-gray-600 mb-2 max-w-2xl mx-auto leading-tight px-4 -mt-8">
            The sweetest pick & mix experience in town. Build your perfect bag or choose from our amazing collections!
          </p>

          {/* CTA Buttons with Random Colours - Right under text */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-2">
            <Link
              to="/shop"
              className={`bg-gradient-to-r ${heroButtonColours.shop.gradient} hover:shadow-lg hover:shadow-${heroButtonColours.shop.bg.split('-')[1]}-300/50 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3`}
            >
              <ShoppingBag className="w-6 h-6" />
              Start Shopping
            </Link>
            
            <Link
              to="/shop"
              className={`bg-gradient-to-r ${heroButtonColours.build.gradient} hover:shadow-lg hover:shadow-${heroButtonColours.build.bg.split('-')[1]}-300/50 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3`}
            >
              <Sparkles className="w-6 h-6" />
              Build Your Own
            </Link>
          </div>

          {/* Features Grid with Random Colours - Edge to edge */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto px-4">
            <div className="text-center p-4 group">
              <div className={`w-16 h-16 bg-gradient-to-br ${featureColours.custom.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 animate-float shadow-lg`}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold text-gray-800 mb-2 group-hover:${featureColours.custom.text} transition-colors`}>
                Custom Mixes
              </h3>
              <p className="text-gray-600">Pick exactly what you love from our huge selection</p>
            </div>

            <div className="text-center p-4 group">
              <div 
                className={`w-16 h-16 bg-gradient-to-br ${featureColours.ready.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 animate-float shadow-lg`}
                style={{animationDelay: '0.5s'}}
              >
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold text-gray-800 mb-2 group-hover:${featureColours.ready.text} transition-colors`}>
                Ready Made
              </h3>
              <p className="text-gray-600">Grab our expertly curated themed bags</p>
            </div>

            <div className="text-center p-4 group">
              <div 
                className={`w-16 h-16 bg-gradient-to-br ${featureColours.fresh.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 animate-float shadow-lg`}
                style={{animationDelay: '1s'}}
              >
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold text-gray-800 mb-2 group-hover:${featureColours.fresh.text} transition-colors`}>
                Made Fresh
              </h3>
              <p className="text-gray-600">All sweets are fresh and carefully selected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats with Colourful Background - Minimal spacing */}
      <section className="bg-gradient-to-r from-phlox-50 via-yellow_green-50 to-dodger_blue-50 py-8 relative overflow-hidden">
        {/* Fun floating elements */}
        <div className="absolute top-4 left-4 text-4xl animate-bounce">🬬</div>
        <div className="absolute top-8 right-8 text-3xl animate-pulse">🭭</div>
        <div className="absolute bottom-4 left-1/4 text-2xl animate-float">🌈</div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${statColours.varieties.bg} rounded-full mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className={`text-3xl font-extrabold text-gray-800 mb-2 group-hover:${statColours.varieties.text} transition-colors`}>
                50+
              </div>
              <div className="text-gray-600">Sweet Varieties</div>
            </div>
            
            <div className="group">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${statColours.size.bg} rounded-full mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Gift className="w-8 h-8 text-white" />
              </div>
              <div className={`text-3xl font-extrabold text-gray-800 mb-2 group-hover:${statColours.size.text} transition-colors`}>
                500g
              </div>
              <div className="text-gray-600">Perfect Bag Size</div>
            </div>
            
            <div className="group">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${statColours.price.bg} rounded-full mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className={`text-3xl font-extrabold text-gray-800 mb-2 group-hover:${statColours.price.text} transition-colors`}>
                £7.50
              </div>
              <div className="text-gray-600">Great Value</div>
            </div>
            
            <div className="group">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${statColours.quality.bg} rounded-full mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className={`text-3xl font-extrabold text-gray-800 mb-2 group-hover:${statColours.quality.text} transition-colors`}>
                100%
              </div>
              <div className="text-gray-600">Fresh & Tasty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Call-to-Action Section - Minimal spacing */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-white to-gray-50 rounded-3xl p-12 shadow-lg border border-gray-100 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-phlox-400 to-phlox-600 rounded-full opacity-10"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-yellow_green-400 to-yellow_green-600 rounded-full opacity-10"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
                Ready for Your Sweet Adventure?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of happy customers who've discovered their perfect sweet mix!
              </p>
              
              <Link
                to="/shop"
                className={`inline-flex items-center gap-3 bg-gradient-to-r ${getRandomColour().gradient} hover:shadow-xl text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
              >
                <span>Start Your Sweet Journey</span>
                <div className="text-2xl animate-bounce">🬬</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage