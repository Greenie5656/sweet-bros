import React from 'react'
import Logo from '../ui/Logo'
import CartIcon from '../ui/CartIcon'

function Header() {
  return (
    <header className="sticky top-0 bg-gradient-to-r from-phlox-50 to-dodger_blue-50 shadow-lg z-50 border-b-4 border-phlox-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center items-center relative">
        
        {/* Fun floating candy decorations */}
        <div className="absolute left-8 top-2 text-2xl animate-bounce" style={{animationDelay: '0s'}}>
          🍭
        </div>
        <div className="absolute left-16 top-6 text-xl animate-bounce" style={{animationDelay: '0.5s'}}>
          🍬
        </div>
        <div className="absolute right-16 top-2 text-2xl animate-bounce" style={{animationDelay: '1s'}}>
          🧁
        </div>
        <div className="absolute right-24 top-6 text-xl animate-bounce" style={{animationDelay: '1.5s'}}>
          🍪
        </div>

        {/* Centered Logo with fun animated rainbow shadow */}
        <div className="relative transform transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-phlox-400 via-dodger_blue-400 to-yellow_green-400 blur-sm opacity-15 rounded-2xl transform rotate-1 animate-pulse"></div>
          <Logo />
        </div>

        {/* Cart floats on right */}
        <div className="absolute right-4">
          <CartIcon />
        </div>
      </div>
    </header>
  )
}

export default Header