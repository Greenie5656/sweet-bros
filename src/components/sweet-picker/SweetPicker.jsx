import React, { useState } from 'react'
import { Plus, Minus, Check } from 'lucide-react'
import sweetsData from '../../data/sweets.json'
import cablesData from '../../data/cables.json'

function SweetPicker({ type = 'sweets' }) {
  const [selectedItems, setSelectedItems] = useState([])
  
  // Configuration based on type
  const config = {
    sweets: {
      data: sweetsData,
      maxItems: 10,
      minItems: 5,
      title: 'Choose Your Sweets',
      subtitle: 'Pick your favorites for the perfect mix'
    },
    cables: {
      data: cablesData,
      maxItems: 4,
      minItems: 4,
      title: 'Choose Your Cable Flavors', 
      subtitle: 'Pick exactly 4 cable flavors'
    }
  }

  const currentConfig = config[type]
  const { data, maxItems, minItems, title, subtitle } = currentConfig

  const isSelected = (itemId) => {
    return selectedItems.find(s => s.id === itemId) !== undefined
  }

  const getCategoryColor = (category) => {
    const colors = {
      'jelly': 'from-red-400 to-red-500',
      'fizzy': 'from-yellow_green-400 to-yellow_green-500',
      'chocolate': 'from-yellow-600 to-yellow-700',
      'soft': 'from-pink-400 to-pink-500',
      'hard': 'from-dodger_blue-400 to-dodger_blue-500',
      'sour': 'from-purple-400 to-purple-500',
      // Cable colors by flavor
      'Vimto': 'from-purple-500 to-purple-600',
      'Apple': 'from-green-500 to-green-600',
      'Sour Watermelon': 'from-green-400 to-pink-400',
      'Fizzy Cola': 'from-yellow-800 to-yellow-900',
      'Rainbow': 'from-red-400 to-blue-400',
      'Blackcurrant': 'from-purple-600 to-purple-800'
    }
    return colors[category] || 'from-gray-400 to-gray-500'
  }

  const isValidSelection = selectedItems.length >= minItems && selectedItems.length <= maxItems

  return (
    <div className="space-y-6">
      {/* Selection Counter */}
      <div className="bg-gradient-to-r from-phlox-50 to-yellow_green-50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-gray-800">
              {selectedItems.length} / {maxItems} {type} selected
            </div>
            <div className="text-sm text-gray-600">
              {subtitle}
            </div>
          </div>
          {isValidSelection && (
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <Check className="w-5 h-5" />
              Ready to add!
            </div>
          )}
        </div>
      </div>

      {/* Category Filter for Sweets */}
      {type === 'sweets' && (
        <div className="flex flex-wrap gap-2">
          {['all', 'jelly', 'fizzy', 'soft', 'sour'].map(category => (
            <button
              key={category}
              className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-colors capitalize"
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data.map((item) => {
          const selected = isSelected(item.id)
          const colorKey = type === 'cables' ? item.flavor : item.category
          
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item)}
              className={`
                relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform
                ${selected 
                  ? 'scale-105 shadow-lg ring-4 ring-phlox-400' 
                  : 'hover:scale-102 hover:shadow-md'
                }
                ${selectedItems.length >= maxItems && !selected && type === 'sweets'
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
                }
              `}
            >
              {/* Background Gradient */}
              <div className={`aspect-square bg-gradient-to-br ${getCategoryColor(colorKey)} p-4 flex flex-col items-center justify-center text-white`}>
                {/* Item Image Placeholder */}
                <div className="text-4xl mb-2">
                  {type === 'cables' ? '🪱' : '🍬'}
                </div>
                
                {/* Item Name */}
                <div className="text-center text-sm font-medium leading-tight">
                  {item.name}
                </div>

                {/* Selection Indicator */}
                {selected && (
                  <div className="absolute top-2 right-2 bg-white text-phlox-500 rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                {/* Add/Remove Button */}
                <div className={`
                  absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-white
                  ${selected ? 'bg-red-500' : 'bg-white/20'}
                  transition-colors duration-200
                `}>
                  {selected ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Items Summary */}
      {selectedItems.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md border">
          <h4 className="font-bold text-gray-800 mb-3">
            Your {type === 'cables' ? 'Cable' : 'Sweet'} Selection:
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((item) => (
              <span
                key={item.id}
                className="bg-phlox-100 text-phlox-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {item.name}
              </span>
            ))}
          </div>
          
          {!isValidSelection && (
            <div className="mt-3 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
              {type === 'cables' 
                ? `Please select exactly ${minItems} cable flavors`
                : `Please select ${minItems}-${maxItems} sweets to continue`
              }
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SweetPicker