import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, ShoppingBag, Heart, Camera } from 'lucide-react'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const isActive = (path) => location.pathname === path

  const menuItems = [
    {
      path: '/',
      name: 'Home',
      icon: Home,
      color: 'from-phlox-500 to-red-500'
    },
    {
      path: '/shop',
      name: 'Shop',
      icon: ShoppingBag,
      color: 'from-yellow_green-500 to-dodger_blue-500'
    },
    {
      path: '/gallery',
      name: 'Gallery',
      icon: Camera,
      color: 'from-dodger_blue-500 to-phlox-500'
    },
    {
      path: '/about',
      name: 'About',
      icon: Heart,
      color: 'from-red-500 to-phlox-500'
    }
  ]

  return (
    <>
      {/* Desktop Navigation - Slightly more compact */}
      <nav className="hidden md:flex items-center gap-1 lg:gap-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative group px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg lg:rounded-xl font-bold text-sm lg:text-base transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2
                ${isActive(item.path) 
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                  : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-phlox-400 hover:to-yellow_green-400'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
              
              {/* Active page indicator - smaller */}
              {isActive(item.path) && (
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow_green-400 rounded-full animate-pulse">
                  <div className="absolute inset-0.5 bg-white rounded-full"></div>
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Mobile Menu Button - More compact */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative p-2 rounded-lg bg-gradient-to-r from-phlox-500 to-yellow_green-500 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        {isOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <Menu className="w-4 h-4" />
        )}
        
        {/* Small sparkle effect */}
        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping"></div>
      </button>

      {/* Mobile Menu Overlay - Optimized height */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* Menu Panel - Shorter on landscape */}
          <div className="absolute top-0 right-0 h-full max-h-screen w-64 max-w-[80vw] bg-gradient-to-br from-white via-phlox-50 to-yellow_green-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto">
            
            {/* Compact Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <h2 className="text-lg font-extrabold text-gray-800">Menu</h2>
              <button
                onClick={closeMenu}
                className="p-1.5 rounded-lg hover:bg-white transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Compact Menu Items */}
            <div className="p-3 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`
                      block p-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 group
                      ${isActive(item.path)
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                        : 'bg-white hover:bg-gradient-to-r hover:from-phlox-100 hover:to-yellow_green-100 text-gray-700 hover:text-gray-800 shadow-sm hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`
                        p-1.5 rounded-lg transition-all duration-300
                        ${isActive(item.path)
                          ? 'bg-white bg-opacity-20'
                          : 'bg-gradient-to-r from-phlox-400 to-yellow_green-400 text-white group-hover:scale-110'
                        }
                      `}>
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-bold text-sm">{item.name}</div>
                        <div className={`text-xs ${isActive(item.path) ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                          {item.path === '/' && 'Welcome home!'}
                          {item.path === '/shop' && 'Browse our sweets'}
                          {item.path === '/gallery' && 'Sweet memories'}
                          {item.path === '/about' && 'Meet the brothers'}
                        </div>
                      </div>
                      
                      {/* Active indicator */}
                      {isActive(item.path) && (
                        <div className="w-1.5 h-1.5 bg-yellow_green-300 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Compact Footer - Only show if there's space */}
            <div className="absolute bottom-3 left-3 right-3 hidden landscape:hidden portrait:block">
              <div className="bg-gradient-to-r from-phlox-400 via-red-400 via-yellow_green-400 to-dodger_blue-400 rounded-lg p-2 text-white text-center">
                <div className="text-lg mb-0.5">🭨</div>
                <div className="font-bold text-xs">Sweet Navigation!</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation