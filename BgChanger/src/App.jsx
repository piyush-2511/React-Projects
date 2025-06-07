import { useState, useCallback } from 'react'

const COLORS = [
  'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'
]

const COLOR_LABELS = {
  violet: 'Violet',
  indigo: 'Indigo', 
  blue: 'Blue',
  green: 'Green',
  yellow: 'Yellow',
  orange: 'Orange',
  red: 'Red'
}

function App() {
  const [colors, setColors] = useState('red')

  const changeColor = useCallback((color) => {
    if (!color || !COLORS.includes(color)) {
      console.warn(`Invalid color: ${color}`)
      return
    }
    setColors(color)
  }, [])

  return (
    <div className="min-h-screen w-full">
      <div 
        className={`w-screen h-screen bg-${colors}-500 flex transition-colors duration-300 ease-in-out`}
        role="main"
        aria-label={`Background color is ${COLOR_LABELS[colors]}`}
      >
        <div className='absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white w-full max-w-4xl h-auto mx-4 rounded-lg shadow-lg'>
          <div className='flex justify-center items-center p-4 gap-2 sm:gap-4 lg:gap-6 flex-wrap'>
            {COLORS.map((color) => (
              <button 
                key={color}
                onClick={() => changeColor(color)} 
                className={`bg-${color}-500 text-white p-3 px-5 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-${color}-500 min-w-0 flex-shrink-0 ${
                  colors === color ? 'ring-2 ring-white ring-offset-2 ring-offset-' + color + '-500' : ''
                }`}
                aria-label={`Change background to ${COLOR_LABELS[color]}`}
                aria-pressed={colors === color}
              >
                <span className="block sm:hidden">{COLOR_LABELS[color][0]}</span>
                <span className="hidden sm:block">{COLOR_LABELS[color]}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App