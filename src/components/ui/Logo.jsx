import React from 'react'

function Logo() {
  return (
    <div 
      className="cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={() => window.location.href = '/'}
    >
      <img 
        src="/logo.png" 
        alt="Sweet Bros" 
        className= "h-52 max-w-3xl object-contain"
      />
    </div>
  )
}

export default Logo