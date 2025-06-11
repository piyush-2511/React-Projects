import React,{useState} from 'react'
import { useTodoContext } from '../Contexts/Todo'

function TodoItem({ todo }) {
  const { updateTodo, deleteTodo, toggleTodoCompletion } = useTodoContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.todoTitle)
  const [editDescription, setEditDescription] = useState(todo.todoDescription)

  const handleEdit = () => {
    setIsEditing(true)
    setEditTitle(todo.todoTitle)
    setEditDescription(todo.todoDescription)
  }

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTodo(todo.id, {
        todoTitle: editTitle.trim(),
        todoDescription: editDescription.trim()
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditTitle(todo.todoTitle)
    setEditDescription(todo.todoDescription)
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
      todo.completed ? 'border-green-500 bg-gray-50' : 'border-blue-500'
    }`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodoCompletion(todo.id)}
          className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />

        {/* Content */}
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="2"
                placeholder="Description (optional)..."
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className={`text-lg font-medium ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}>
                {todo.todoTitle}
              </h3>
              {todo.todoDescription && (
                <p className={`text-sm mt-1 ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
                }`}>
                  {todo.todoDescription}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default TodoItem