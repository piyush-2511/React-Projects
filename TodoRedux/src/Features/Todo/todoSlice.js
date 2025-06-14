import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: nanoid(),
      todoTitle: 'Learn React',
      todoDescription: 'This is the react description',
      completed: true,
    }
  ]
};


const todoSlice = createSlice({
  name : 'Todo',
  initialState,
  reducers : {
    addTodo : (state,action) => {
      const {todoTitle, todoDescription} = action.payload
      const newTodo = {
        id : nanoid(),
        todoTitle,
        todoDescription,
        completed : true
      }
      state.todos.push(newTodo)
    },
    removeTodo : (state,action)=>{
      const id = action.payload
      const removedTodo = state.todos.filter(todo => todo.id !== id)
      state.todos = removedTodo
    },
    updateTodo: (state, action) => {
      const { id, todoTitle, todoDescription } = action.payload;
      state.todos = state.todos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              todoTitle,
              todoDescription,
              completed: todo.completed // retain original completed status
            }
          : todo
      );
    },
    toggleTodo: (state, action) => {
      const { id } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
    
  }
})


export const {addTodo,removeTodo, updateTodo,toggleTodo} = todoSlice.actions
export default todoSlice.reducer