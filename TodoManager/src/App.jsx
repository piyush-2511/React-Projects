import { useState, useEffect } from "react";
import { useTodoContext, TodoContextProvider } from "./Contexts/Todo";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
import TodoList from "./Components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // Add this flag

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos))
      } catch (error) {
        console.error('Error parsing saved todos:', error)
        // Set default todo if parsing fails
        setTodos([{
          id: 1,
          todoTitle: "Learn React",
          todoDescription: "Learn React to build modern web applications",
          completed: false
        }])
      }
    } else {
      // Set default todo if no saved data
      setTodos([{
        id: 1,
        todoTitle: "Learn React",
        todoDescription: "Learn React to build modern web applications",
        completed: false
      }])
    }
    setIsLoaded(true) // Mark as loaded after initial setup
  }, [])

  // Save todos to localStorage whenever todos change (but only after initial load)
  useEffect(() => {
    if (isLoaded) { // Only save if we've finished loading
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, isLoaded])

  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now(),
      ...todoData,
      completed: false
    }
    setTodos(prevTodos => [...prevTodos, newTodo])
  }

  const updateTodo = (id, updatedTodo) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, ...updatedTodo }
          : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const toggleTodoCompletion = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  return (
    <TodoContextProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleTodoCompletion}}>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Todo Manager</h1>
          <p className="text-center text-gray-600 mb-8">
            {completedCount} of {totalCount} todos completed
          </p>
          
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App