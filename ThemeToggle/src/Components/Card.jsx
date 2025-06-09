import React from 'react'
import { useTheme } from '../Context/Theme';

function Card() {

  const {themeMode} = useTheme();

  return (
    <div className='w-full max-w-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg p-6 shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300'>
   
      <div className='text-center text-3xl font-bold text-gray-800 dark:text-white'>Profile</div>
      <div className='flex flex-col justify-center items-center mt-4'>
        <img className='w-40 h-40 object-cover rounded-full shadow-lg border-4 border-white dark:border-gray-700' src="piyush.png" alt="Profile" />
        <h1 className='text-gray-800 dark:text-white text-2xl mt-4 font-bold'>Piyush</h1>
        <p className='text-gray-600 dark:text-gray-300 text-base'>Software Engineer</p>
        <p className='text-gray-500 dark:text-gray-400 text-sm mb-4'>Full Stack Developer</p>
        
        <div className="mt-2 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Current theme: <span className="font-bold capitalize">{themeMode}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card