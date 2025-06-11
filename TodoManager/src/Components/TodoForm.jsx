import { useState } from 'react'
import React from 'react'
import { useTodoContext } from '../Contexts/Todo'

function TodoForm() {
  const { addTodo } = useTodoContext()
  const [todoTitle, setTodoTitle] = useState('')
  const [todoDescription, setTodoDescription] = useState('')

  const handleSubmit = () => {
    if (todoTitle.trim()) {
      addTodo({
        todoTitle: todoTitle.trim(),
        todoDescription: todoDescription.trim()
      })
      setTodoTitle('')
      setTodoDescription('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="mb-4">
        <input
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter todo title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-4">
        <textarea
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          placeholder="Enter todo description (optional)..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="3"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 font-medium"
      >
        Add Todo
      </button>
    </div>
  )
}

export default TodoForm