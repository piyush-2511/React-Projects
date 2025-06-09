import { useState } from 'react'
import InputBox from './Components/InputBox'
import useCurrency from './hooks/useCurrency'

function App() {
  const [amount, setAmount] = useState(0)
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')

  const { data: currencyInfo, loading, error } = useCurrency(from)
  const options = currencyInfo ? Object.keys(currencyInfo) : []

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to])
    }
  }

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='text-xl'>Loading currency data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='text-xl text-red-500'>Error: {error}</div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-200'>
        <h1 className='text-center font-bold text-2xl mb-6 text-gray-800'>
          Currency Converter
        </h1>

        <form onSubmit={(e) => { e.preventDefault(); convert() }}>
          <div className='flex flex-col gap-4'>

            {/* From Currency InputBox */}
            <InputBox
              label='From'
              amount={amount}
              onAmountChange={setAmount}
              currency={from}
              onCurrencyChange={setFrom}
              amountDisabled={false}
              currencyDisabled={false}
              currencyOptions={options}
            />

            {/* Swap Button */}
            <div className='flex justify-center'>
              <button
                type='button'
                onClick={swap}
                className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors'
              >
                ↕ Swap
              </button>
            </div>

            {/* To Currency InputBox */}
            <InputBox
              label='To'
              amount={convertedAmount}
              onAmountChange={setConvertedAmount}
              currency={to}
              onCurrencyChange={setTo}
              amountDisabled={true}
              currencyDisabled={false}
              currencyOptions={options}
            />

            {/* Convert Button */}
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors'
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App