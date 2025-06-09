import { useState } from 'react'
import ThemeBtn from './Components/ThemeBtn'
import Card from './Components/Card'
import { ThemeProvider } from './Context/Theme'


function App() {


  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Theme Toggler</h2>
        <div className="w-full max-w-md">
          <Card />
          <div className="flex justify-center mr-13 mt-6">
            <ThemeBtn />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
