import  { createContext, useState,useEffect, FC } from "react";
import {TodosContextState} from "./types";

const contextDefaultValues: TodosContextState = {
  todos: [],
  addTodo: () => {}
};

export const TodosContext = createContext<TodosContextState>(
  contextDefaultValues
);

const TodosProvider: FC=({children}) =>
{
  const [todos, setTodos] = useState<string[]>(contextDefaultValues.todos);

  const addTodo=(newTodo: string) => setTodos((todos) => [...todos,newTodo]);


  useEffect(() =>
  {
    if(todos?.length) {
      localStorage.setItem('todos',JSON.stringify(todos));
    }
  },[todos]);
  useEffect(() =>
  {
    const todosLocal=JSON.parse(localStorage.getItem('todos')||'{}');
    
    if(!todos?.length&& todosLocal?.length) {
      setTodos(todosLocal)     
    }
  },[todos]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
