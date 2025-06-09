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

// Static class mapping to ensure Tailwind includes these classes
const COLOR_CLASSES = {
  violet: {
    bg: 'bg-violet-500',
    button: 'bg-violet-500',
    ringOffset: 'focus:ring-offset-violet-500'
  },
  indigo: {
    bg: 'bg-indigo-500',
    button: 'bg-indigo-500',
    ringOffset: 'focus:ring-offset-indigo-500'
  },
  blue: {
    bg: 'bg-blue-500',
    button: 'bg-blue-500',
    ringOffset: 'focus:ring-offset-blue-500'
  },
  green: {
    bg: 'bg-green-500',
    button: 'bg-green-500',
    ringOffset: 'focus:ring-offset-green-500'
  },
  yellow: {
    bg: 'bg-yellow-500',
    button: 'bg-yellow-500',
    ringOffset: 'focus:ring-offset-yellow-500'
  },
  orange: {
    bg: 'bg-orange-500',
    button: 'bg-orange-500',
    ringOffset: 'focus:ring-offset-orange-500'
  },
  red: {
    bg: 'bg-red-500',
    button: 'bg-red-500',
    ringOffset: 'focus:ring-offset-red-500'
  }
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
        className={`w-screen h-screen ${COLOR_CLASSES[colors].bg} flex transition-colors duration-300 ease-in-out`}
        role="main"
        aria-label={`Background color is ${COLOR_LABELS[colors]}`}
      >
        <div className='absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white w-full max-w-4xl h-auto mx-4 rounded-lg shadow-lg'>
          <div className='flex justify-center items-center p-4 gap-2 sm:gap-4 lg:gap-6 flex-wrap'>
            {COLORS.map((color) => (
              <button 
                key={color}
                onClick={() => changeColor(color)} 
                className={`${COLOR_CLASSES[color].button} text-white p-3 px-5 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${COLOR_CLASSES[color].ringOffset} min-w-0 flex-shrink-0 ${
                  colors === color ? `ring-2 ring-white ring-offset-2 ${COLOR_CLASSES[color].ringOffset}` : ''
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