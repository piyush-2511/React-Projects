import React from 'react'

function InputBox({
  label,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  amountDisabled = false,
  currencyDisabled = false,
  currencyOptions = [],
  className = ''
}) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md flex flex-col gap-2 ${className}`}>
      <label className='text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      
      <div className='flex items-center gap-4'>
        <div className='w-1/2'>
          <input 
            id={label}
            type="number" 
            value={amount || ''}
            onChange={e => onAmountChange && onAmountChange(Number(e.target.value) || 0)}
            disabled={amountDisabled}
            placeholder='Enter amount'
            className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'        
          />
        </div>
        
        <div className='w-1/2'>
          <select 
            value={currency}
            onChange={e => onCurrencyChange && onCurrencyChange(e.target.value)}
            disabled={currencyDisabled}
            className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            {currencyOptions.map(currency => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default InputBox