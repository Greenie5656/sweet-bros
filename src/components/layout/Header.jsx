import React from 'react'
import Logo from '../ui/Logo'
import CartIcon from '../ui/CartIcon'
import Navigation from './Navigation'

function Header() {
  return (
    <header className="sticky top-0 bg-gradient-to-r from-phlox-50 to-dodger_blue-50 shadow-lg z-50 border-b-2 sm:border-b-4 border-phlox-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        
        {/* Mobile Layout: Single row with nav, logo, cart */}
        <div className="block sm:hidden">
          <div className="flex justify-between items-center py-2">
            {/* Left - Navigation */}
            <Navigation />
            
            {/* Center - Bigger Mobile Logo */}
            <div className="flex-1 flex justify-center mx-2">
              <div className="cursor-pointer hover:scale-105 transition-transform duration-200"
                   onClick={() => window.location.href = '/'}>
                <img 
                  src="/logo.png" 
                  alt="Sweet Bros" 
                  className="h-28 object-contain" // Bigger on mobile - was h-12
                />
              </div>
            </div>
            
            {/* Right - Cart */}
            <CartIcon />
          </div>
          
          {/* Minimal rainbow bar for mobile */}
          <div className="pb-0.5">
            <div className="h-0.5 bg-gradient-to-r from-red-400 via-yellow_green-400 via-dodger_blue-400 via-phlox-400 to-red-400 rounded-full opacity-40"></div>
          </div>
        </div>

        {/* Desktop Layout: Original design */}
        <div className="hidden sm:block">
          {/* Top Row - Navigation + Cart */}
          <div className="flex justify-between items-center py-1">
            
            {/* Left - Navigation */}
            <div className="flex items-center">
              <Navigation />
            </div>

            {/* Right - Cart */}
            <div className="flex items-center">
              <CartIcon />
            </div>
          </div>

          {/* Logo Row - Centered with decorations */}
          <div className="relative py-1">
            
            {/* Fun floating candy decorations - Desktop only */}
            <div className="absolute left-4 top-2 text-xl animate-bounce" style={{animationDelay: '0s'}}>
              🍭
            </div>
            <div className="absolute left-12 top-8 text-lg animate-bounce" style={{animationDelay: '0.5s'}}>
              🍬
            </div>
            <div className="absolute right-12 top-2 text-xl animate-bounce" style={{animationDelay: '1s'}}>
              🧁
            </div>
            <div className="absolute right-4 top-8 text-lg animate-bounce" style={{animationDelay: '1.5s'}}>
              🍪
            </div>

            {/* Centered Logo - Full size on desktop */}
            <div className="flex justify-center animate-float">
              <Logo />
            </div>
          </div>

          {/* Rainbow Bar - Desktop */}
          <div className="pb-0.5">
            <div className="h-1 bg-gradient-to-r from-red-400 via-yellow_green-400 via-dodger_blue-400 via-phlox-400 to-red-400 rounded-full opacity-40 animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header