import React from 'react'
import Logo from '../ui/Logo'
import CartIcon from '../ui/CartIcon'
import Navigation from './Navigation'

function Header() {
  return (
    <header className="sticky top-0 bg-gradient-to-r from-phlox-50 to-dodger_blue-50 shadow-lg z-50 border-b-4 border-phlox-300">
      <div className="max-w-7xl mx-auto px-4">
        
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

        {/* Logo Row - Centered with minimal spacing */}
        <div className="relative py-1">
          
          {/* Fun floating candy decorations - Better positioned */}
          <div className="absolute left-4 top-2 text-xl animate-bounce hidden sm:block" style={{animationDelay: '0s'}}>
            🍭
          </div>
          <div className="absolute left-12 top-8 text-lg animate-bounce hidden sm:block" style={{animationDelay: '0.5s'}}>
            🍬
          </div>
          <div className="absolute right-12 top-2 text-xl animate-bounce hidden sm:block" style={{animationDelay: '1s'}}>
            🧁
          </div>
          <div className="absolute right-4 top-8 text-lg animate-bounce hidden sm:block" style={{animationDelay: '1.5s'}}>
            🍪
          </div>

          {/* Centered Logo */}
          <div className="flex justify-center animate-float">
            <Logo />
          </div>
        </div>

        {/* Rainbow Bar */}
        <div className="pb-0.5">
          <div className="h-1 bg-gradient-to-r from-red-400 via-yellow_green-400 via-dodger_blue-400 via-phlox-400 to-red-400 rounded-full opacity-40 animate-pulse"></div>
        </div>
      </div>
    </header>
  )
}

export default Header