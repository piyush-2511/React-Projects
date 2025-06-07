import { useEffect, useState,useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [isNumberAllowed, setIsNumberAllowed] = useState(true);
  const [isSpecialCharAllowed, setIsSpecialCharAllowed] = useState(true);

  const passwordGenerator = useCallback(() => {
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?'
    let pass = ''

    if (isNumberAllowed){
      str += '0123456789'
    }
    if (isSpecialCharAllowed){
      str += specialChars
    }

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex) // Fixed: += instead of =
    }
    setPassword(pass)
  }, [length, isNumberAllowed, isSpecialCharAllowed]) // Removed password from dependencies

  useEffect(()=>{
    passwordGenerator()
  },[passwordGenerator])


  return (
    <>
      <div className='flex items-center justify-center w-screen h-screen bg-indigo-900'>
        <div className='h-auto w-11/12 max-w-xl flex flex-col gap-6 items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-white shadow-lg'>

          <h1 className='text-center font-bold text-3xl'>Password Generator</h1>

          <div className='flex flex-col sm:flex-row items-center gap-4 w-full'>
            <input 
              type="text"
              value={password}
              readOnly
              className='flex-1 bg-transparent border border-white/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 w-full'
              placeholder="Generated password"
            />
            <button
              className='bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 transition-colors w-full sm:w-auto'

            >
              Copy
            </button>
          </div>

          <div className='flex flex-col sm:flex-row items-center justify-between gap-4 w-full text-sm'>
            <div className='flex items-center gap-2'>
              <input 
              type="range" 
              min={6}
              max={18}
              id="length" 
              className="cursor-pointer" 
              value={length}
              onChange={(e)=> setLength(Number(e.target.value))}
              />
              <label htmlFor="length">Length : {length}</label>
            </div>

            <div className='flex items-center gap-2'>
              <input 
              type="checkbox" 
              id="number" 
              value={isNumberAllowed}
              onChange={e=> setIsNumberAllowed(e.target.value)}
              />
              <label htmlFor="number">Number</label>
            </div>

            <div className='flex items-center gap-2'>
              <input 
              type="checkbox" 
              id="special" 
              value={isSpecialCharAllowed}
              onChange={e=> setIsSpecialCharAllowed(e.target.value)}
              />
              <label htmlFor="special">Special Characters</label>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
