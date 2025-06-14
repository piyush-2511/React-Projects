import { useState } from 'react'
import React from 'react'
import { addTodo } from '../Features/Todo/todoSlice'
import {useDispatch} from 'react-redux'

function TodoForm() {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDesc, setTodoDesc] = useState('');
  const dispatch = useDispatch();
  
  const handleAddTodo = () => {
    console.log('clicked')
    // e.preventDefault();
    if (todoTitle.trim() === '') return;
    
    const newTodo = {
      todoTitle,
      todoDescription: todoDesc || ''
    };
    
    dispatch(addTodo(newTodo));
    setTodoTitle('');
    setTodoDesc('');
  };
 
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 mb-8">
      <h1 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Add New Task
      </h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            value={todoTitle}
            onChange={e => setTodoTitle(e.target.value)}
            placeholder="Todo Title"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
          <input
            type="text"
            value={todoDesc}
            onChange={e => setTodoDesc(e.target.value)}
            placeholder="Todo Description"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          onClick={handleAddTodo}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default TodoForm