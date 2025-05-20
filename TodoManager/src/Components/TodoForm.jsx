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
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Add a new task..."
        className="w-full rounded-l-lg px-4 py-3 outline-none text-gray-700 bg-white/80 border-0 focus:ring-2 focus:ring-blue-500/50"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button 
        type="submit"
        className="rounded-r-lg px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add
      </button>
    </form>
  );
}
