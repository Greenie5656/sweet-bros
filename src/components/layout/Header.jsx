import React from 'react'
import Logo from '../ui/Logo'
import CartIcon from '../ui/CartIcon'
import Navigation from './Navigation'

function Header() {
  return (
    <header className="sticky top-0 bg-gradient-to-r from-phlox-50 to-dodger_blue-50 shadow-lg z-50 border-b-2 sm:border-b-4 border-phlox-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        
        {/* Mobile Layout: Compact for both portrait and landscape */}
        <div className="block sm:hidden">
          <div className="flex justify-between items-center py-1.5 landscape:py-1">
            {/* Left - Navigation */}
            <Navigation />
            
            {/* Center - Responsive Mobile Logo */}
            <div className="flex-1 flex justify-center mx-2">
              <div className="cursor-pointer hover:scale-105 transition-transform duration-200"
                   onClick={() => window.location.href = '/'}>
                <img 
                  src="/logo.png" 
                  alt="Sweet Bros" 
                  className="h-20 portrait:h-24 landscape:h-14 object-contain" // Much smaller on landscape
                />
              </div>
            </div>
            
            {/* Right - Cart */}
            <CartIcon />
          </div>
          
          {/* Minimal rainbow bar for mobile - thinner on landscape */}
          <div className="pb-0.5 landscape:pb-0">
            <div className="h-0.5 landscape:h-0.25 bg-gradient-to-r from-red-400 via-yellow_green-400 via-dodger_blue-400 via-phlox-400 to-red-400 rounded-full opacity-40"></div>
          </div>
        </div>

        {/* Desktop Layout: More compact version */}
        <div className="hidden sm:block">
          {/* Single Row Layout - Navigation + Logo + Cart */}
          <div className="flex items-center py-2 md:py-3 lg:py-4">
            
            {/* Left - Navigation (fixed width) */}
            <div className="flex items-center w-64">
              <Navigation />
            </div>

            {/* Center - Logo (truly centered) */}
            <div className="flex-1 flex justify-center">
              <div className="cursor-pointer hover:scale-105 transition-transform duration-200"
                   onClick={() => window.location.href = '/'}>
                <img 
                  src="/logo.png" 
                  alt="Sweet Bros" 
                  className="h-24 md:h-28 lg:h-32 xl:h-36 object-contain" // Much more compact
                />
              </div>
            </div>

            {/* Right - Cart (fixed width to match left) */}
            <div className="flex items-center justify-end w-64">
              <CartIcon />
            </div>
          </div>

          {/* Compact Rainbow Bar - Desktop */}
          <div className="pb-0.5">
            <div className="h-0.5 md:h-1 bg-gradient-to-r from-red-400 via-yellow_green-400 via-dodger_blue-400 via-phlox-400 to-red-400 rounded-full opacity-40 animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header