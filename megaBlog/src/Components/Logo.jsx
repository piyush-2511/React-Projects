import React from 'react'

function Logo({
  width = '100px',
  className = 'text-white'
}) {
  return (
    <div className={`text-bold text-3xl ${className}`}>
      Logo
    </div>
  )
}

export default Logo