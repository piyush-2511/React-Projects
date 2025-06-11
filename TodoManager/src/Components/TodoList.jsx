import React from 'react'
import { useTodoContext } from '../Contexts/Todo'
import TodoItem from './TodoItem'

function TodoList() {
  const { todos } = useTodoContext()

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg">No todos yet!</p>
        <p>Add your first todo above.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList