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

        <div className="relative animate-float">
          <Logo />
        </div>
       
        <div className="absolute right-4">
          <CartIcon />
        </div>
      </div>
    </header>
  )
}

export default Header