import React, { useState, useEffect } from 'react'
import { Plus, Minus, Check } from 'lucide-react'
import sweetsData from '../../data/sweets.json'
import cablesData from '../../data/cables.json'
import { getItemColour } from '../../utils/colourHelpers'

function SweetPicker({ type = 'sweets', onSelectionChange }) {
  const [selectedItems, setSelectedItems] = useState([])
  
  // Configuration based on type
  const config = {
    sweets: {
      data: sweetsData,
      maxItems: 20,
      minItems: 10,
      title: 'Choose Your Sweets',
      subtitle: 'Pick your favourites for the perfect mix'
    },
    cables: {
      data: cablesData,
      maxItems: 4,
      minItems: 4,
      title: 'Choose Your Cable Flavours', 
      subtitle: 'Pick exactly 4 cable flavours'
    }
  }

  const currentConfig = config[type]
  const { data, maxItems, minItems, title, subtitle } = currentConfig

  // Notify parent component when selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedItems)
    }
  }, [selectedItems, onSelectionChange])

  const isSelected = (itemId) => {
    return selectedItems.find(s => s.id === itemId) !== undefined
  }

  const toggleItem = (item) => {
    setSelectedItems(prevItems => {
      const isCurrentlySelected = prevItems.find(s => s.id === item.id)
      
      if (isCurrentlySelected) {
        // Remove item
        return prevItems.filter(s => s.id !== item.id)
      } else {
        // Add item (if under limit)
        if (prevItems.length < maxItems) {
          return [...prevItems, item]
        }
        return prevItems
      }
    })
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

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data.map((item) => {
          const selected = isSelected(item.id)
          const itemColour = getItemColour(item.id) // Get consistent random colour per item
          
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
              {/* Background - Only show when NO image */}
              <div className={`aspect-square ${item.image ? 'bg-gray-100' : `bg-gradient-to-br ${itemColour.gradient}`} p-4 flex flex-col items-center justify-center text-white relative overflow-hidden`}>
                
                {/* Real Image (NO overlay) or Emoji Fallback */}
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-4xl mb-2">
                    {type === 'cables' ? '🪱' : '🬬'}
                  </div>
                )}
                
                {/* Item Name - Only show overlay behind text for readability */}
                <div className="absolute top-3 left-3 right-12 z-10 text-left text-sm font-bold leading-tight text-white drop-shadow-lg bg-black bg-opacity-50 rounded-lg px-2 py-1">
                  {item.name}
                </div>

                {/* Selection Indicator */}
                {selected && (
                  <div className="absolute top-3 right-3 bg-white text-phlox-500 rounded-full p-2 shadow-lg animate-pulse">
                    <Check className="w-5 h-5" />
                  </div>
                )}

                {/* Add/Remove Button */}
                <div className={`
                  absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white
                  ${selected 
                    ? 'bg-red-500 hover:bg-red-600 animate-bounce' 
                    : `${itemColour.bg} ${itemColour.hover} hover:scale-110`
                  }
                  transition-all duration-200 transform
                `}>
                  {selected ? (
                    <Minus className="w-5 h-5 font-bold" />
                  ) : (
                    <Plus className="w-5 h-5 font-bold" />
                  )}
                </div>

                {/* Fun Selection Badge */}
                {selected && (
                  <div className="absolute bottom-3 left-3 bg-yellow_green-400 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                    ✨ PICKED!
                  </div>
                )}
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
            {selectedItems.map((item) => {
              const itemColour = getItemColour(item.id)
              return (
                <span
                  key={item.id}
                  className={`${itemColour.bg} text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm`}
                >
                  {item.name}
                </span>
              )
            })}
          </div>
          
          {!isValidSelection && (
            <div className="mt-3 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
              {type === 'cables' 
                ? `Please select exactly ${minItems} cable flavours`
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