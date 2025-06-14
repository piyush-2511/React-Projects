import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo, removeTodo, toggleTodo } from "../Features/Todo/todoSlice";

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todoTitle);
  const [todoDescMsg, setTodoDescMsg] = useState(todo.todoDescription);
  const dispatch = useDispatch();

  const handleSave = () => {
    const updatedTodo = {
      id: todo.id,
      todoTitle: todoMsg,
      todoDescription: todoDescMsg,
    };
    dispatch(updateTodo(updatedTodo));
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 mb-4 hover:shadow-2xl transition-all duration-300 hover:border-purple-500/50">
      <div className="flex items-start space-x-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            console.log('changed');
            dispatch(toggleTodo({id : todo.id}))}}
          className="mt-2 w-5 h-5 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
        />
        
        {isEditing ? (
          <div className="flex-1 space-y-4">
            <input
              type="text"
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="text"
              value={todoDescMsg}
              onChange={(e) => setTodoDescMsg(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="flex space-x-2">
              <button 
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Save
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <h1 className={`text-xl font-bold mb-2 ${
              todo.completed 
                ? 'line-through text-gray-500' 
                : 'text-white'
            }`}>
              {todo.todoTitle}
            </h1>
            <p className={`text-sm mb-4 ${
              todo.completed 
                ? 'line-through text-gray-600' 
                : 'text-gray-300'
            }`}>
              {todo.todoDescription}
            </p>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Edit
              </button>
              <button 
                onClick={() => dispatch(removeTodo(todo.id))}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default TodoItem;
