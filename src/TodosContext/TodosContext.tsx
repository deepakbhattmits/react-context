import  { createContext, useState,useEffect, FC } from "react";
import {TodosContextState, Itodos} from "./types";

const contextDefaultValues: TodosContextState = {
  todos: [],
  addTodo: () => { },
  removeTodo: () => { },
  markCompleted:()=>{}
};

export const TodosContext = createContext<TodosContextState>(
  contextDefaultValues
);

const TodosProvider: FC=({children}) =>
{
  const [todos,setTodos]=useState<Itodos[]>(contextDefaultValues?.todos);
  const addTodo=(title: string) =>
  {
    console.log('ADD TODO ',todos,title);
    setTodos((todos: Itodos[]) => [...todos,{id: Math?.random()?.toString(),title,completed:false}]);
  }
  const removeTodo=(id: string) =>
  {
    const updatedTodos=todos?.filter(el => el?.id!==id);
    setTodos(updatedTodos);
  }
  const markCompleted=(id: string) =>
  {
    const updatedTodo=todos?.map(el => el?.id===id? {...el,completed: !el?.completed}:el);
      setTodos(updatedTodo);
  }

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
        addTodo,
        removeTodo,
        markCompleted
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
