import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, ShoppingBag } from 'lucide-react'

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
    }
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative group px-4 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl font-bold text-sm lg:text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2 lg:gap-3
                ${isActive(item.path) 
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                  : 'text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-phlox-400 hover:to-yellow_green-400'
                }
              `}
            >
              <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>{item.name}</span>
              
              {/* Fun rainbow underline effect */}
              <div className={`
                absolute bottom-0 left-0 right-0 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
                bg-gradient-to-r from-red-400 via-yellow_green-400 via-dodger_blue-400 to-phlox-400
              `} />
              
              {/* Active page indicator */}
              {isActive(item.path) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-yellow_green-400 rounded-full animate-pulse">
                  <div className="absolute inset-1 bg-white rounded-full"></div>
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative p-2 lg:p-3 rounded-lg lg:rounded-xl bg-gradient-to-r from-phlox-500 to-yellow_green-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        {isOpen ? (
          <X className="w-5 h-5 lg:w-6 lg:h-6" />
        ) : (
          <Menu className="w-5 h-5 lg:w-6 lg:h-6" />
        )}
        
        {/* Fun sparkle effect */}
        <div className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-red-400 rounded-full animate-ping"></div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-gradient-to-br from-white via-phlox-50 to-yellow_green-50 shadow-2xl transform transition-transform duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-extrabold text-gray-800">Menu</h2>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-3">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`
                      block p-3 rounded-xl transition-all duration-300 transform hover:scale-105 group
                      ${isActive(item.path)
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                        : 'bg-white hover:bg-gradient-to-r hover:from-phlox-100 hover:to-yellow_green-100 text-gray-700 hover:text-gray-800 shadow-sm hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        p-2 rounded-lg transition-all duration-300
                        ${isActive(item.path)
                          ? 'bg-white bg-opacity-20'
                          : 'bg-gradient-to-r from-phlox-400 to-yellow_green-400 text-white group-hover:scale-110'
                        }
                      `}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div>
                        <div className="font-bold text-base">{item.name}</div>
                        <div className={`text-xs ${isActive(item.path) ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                          {item.path === '/' ? 'Welcome home!' : 'Browse our sweets'}
                        </div>
                      </div>
                      
                      {/* Active indicator */}
                      {isActive(item.path) && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 bg-yellow_green-300 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Fun Footer */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-gradient-to-r from-phlox-400 via-red-400 via-yellow_green-400 to-dodger_blue-400 rounded-xl p-3 text-white text-center">
                <div className="text-xl mb-1">🍭</div>
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