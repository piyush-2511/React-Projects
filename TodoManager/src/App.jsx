import React,{ useState, useEffect, useContext } from 'react'

// Mock Context for demonstration
const TodoContext = React.createContext();
export const useTodo = () => React.useContext(TodoContext);
export const TodoProvider = TodoContext.Provider;

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todoTitle) => {
    setTodos((prev) => [{id: Date.now(), ...todoTitle}, ...prev]);
  }

  const updateTodo = (id, todoTitle) => {
    setTodos((prev) => prev.map((prevTodo) => 
      prevTodo.id === id ? todoTitle : prevTodo
    ));
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleTodo}}>
      <div className="bg-gradient-to-br from-indigo-900 to-blue-800 min-h-screen py-8 px-4">
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-white mb-8">Todo List</h1>
            <TodoForm />
            
            <div className="mt-8">
              {todos.length === 0 ? (
                <p className="text-center text-white/70 italic">No todos yet. Add one above!</p>
              ) : (
                <div className="space-y-3">
                  {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="px-6 py-4 bg-white/5 border-t border-white/10">
            <p className="text-xs text-center text-white/60">
              {todos.filter(t => t.completed).length} of {todos.length} tasks completed
            </p>
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

function TodoForm() {
  const [todoTitle, setTodoTitle] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todoTitle.trim()) return;
    
    addTodo({
      todoTitle: todoTitle.trim(),
      completed: false
    });
    setTodoTitle("");
  }

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Add a new task..."
        className="w-full rounded-l-lg px-4 py-3 outline-none text-gray-700 bg-white/80 border-0 focus:ring-2 focus:ring-blue-500/50"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button 
        onClick={add}
        className="rounded-r-lg px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add
      </button>
    </div>
  );
}

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todoTitle);
  const { updateTodo, deleteTodo, toggleTodo } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todoTitle: todoMsg.trim() });
    setIsTodoEditable(false);
  }

  const toggleTodos = () => {
    toggleTodo(todo.id);
  }

  return (
    <div className={`group flex items-center rounded-lg p-3 transition-all duration-300 ${
      todo.completed 
        ? "bg-emerald-400/20 border border-emerald-400/30" 
        : "bg-white/20 border border-white/20 hover:bg-white/30"
    }`}>
      <div className="flex items-center flex-1">
        <label className="relative flex items-center justify-center">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={todo.completed}
            onChange={toggleTodos}
          />
          <div className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${
            todo.completed 
              ? "bg-emerald-500 border-emerald-600" 
              : "border-white/30 peer-hover:border-white/50"
          }`}>
            {todo.completed && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </label>
        
        <div className="ml-3 flex-1">
          <input
            type="text"
            className={`w-full bg-transparent outline-none text-white ${
              isTodoEditable 
                ? "border-b border-white/50 focus:border-white" 
                : "border-transparent"
            } ${todo.completed ? "line-through text-white/60" : ""}`}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
          />
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          className={`p-2 rounded-full transition-colors ${
            todo.completed 
              ? "text-white/40 cursor-not-allowed" 
              : "text-white/60 hover:text-white hover:bg-white/20"
          }`}
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              editTodo();
            } else {
              setIsTodoEditable(true);
            }
          }}
          disabled={todo.completed}
          title={isTodoEditable ? "Save" : "Edit"}
        >
          {isTodoEditable ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          )}
        </button>
        
        <button
          className="p-2 rounded-full text-white/60 hover:text-white hover:bg-red-500/20 transition-colors"
          onClick={() => deleteTodo(todo.id)}
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;