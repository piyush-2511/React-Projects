import { useState,useContext, useEffect, createContext } from "react";

const TodoContext = createContext({
  todos : [{
    id : 23134335,
    todoTitle : "Learn React",
    todoDescription : "Learn React to build modern web applications",
    completed : false
  }],
  addTodo : (todo) => {},
  updateTodo : (id, updatedTodo) => {},
  deleteTodo : (id) => {},
  toggleTodoCompletion : (id) => {}
});

const useTodoContext = () => {
  return useContext(TodoContext);
}

const TodoContextProvider = TodoContext.Provider;

export { TodoContext, useTodoContext, TodoContextProvider };

