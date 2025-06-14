import { useState } from 'react'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'
import { useSelector } from 'react-redux'


function App() {

  const todos = useSelector(state => state.todos.todos);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Todo App
          </h1>
          <p className="text-gray-400 text-lg">Organize your tasks with style</p>
        </div>

        <TodoForm />
        
        <div className="space-y-4">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
       
        {todos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-400 text-lg">No tasks yet. Add your first task above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;