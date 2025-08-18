// src/utils/colourHelpers.js
// Sweet Bros Colour Palette (from your palette.txt)
export const sweetBrosColours = {
  phlox: {
    bg: 'bg-phlox-500',
    gradient: 'from-phlox-400 to-phlox-600',
    text: 'text-phlox-600',
    hover: 'hover:bg-phlox-600'
  },
  red: {
    bg: 'bg-red-500', 
    gradient: 'from-red-400 to-red-600',
    text: 'text-red-600',
    hover: 'hover:bg-red-600'
  },
  yellowGreen: {
    bg: 'bg-yellow_green-500',
    gradient: 'from-yellow_green-400 to-yellow_green-600', 
    text: 'text-yellow_green-600',
    hover: 'hover:bg-yellow_green-600'
  },
  dodgerBlue: {
    bg: 'bg-dodger_blue-500',
    gradient: 'from-dodger_blue-400 to-dodger_blue-600',
    text: 'text-dodger_blue-600', 
    hover: 'hover:bg-dodger_blue-600'
  }
}

// Get consistent random colour for an item (same item = same colour)
export const getItemColour = (itemId) => {
  const colours = Object.values(sweetBrosColours)
  // Use item ID to create consistent "random" colour per item
  const colourIndex = itemId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colours.length
  return colours[colourIndex]
}

// Get truly random colour (changes each render)
export const getRandomColour = () => {
  const colours = Object.values(sweetBrosColours)
  return colours[Math.floor(Math.random() * colours.length)]
}