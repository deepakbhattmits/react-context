import { useState, useContext } from "react";
import TodosProvider, { TodosContext } from "./TodosContext";

const Todos = () => {
  const [todo, setTodo] = useState<string>("");
  const { todos, addTodo } = useContext(TodosContext);
  const handleSubmit=(e: any) =>
  {
    e.preventDefault();
    addTodo(todo);
    setTodo('');
  };
  return (
    <div className='app'>
       <form onSubmit={handleSubmit}>
        <label>Enter todo </label>
        <input
          name="todo"
          value={todo}
          onChange={(e) => {
            setTodo(e?.target?.value);
          }}
        />
        <button type="submit">submit</button>
      </form>
      <div>
        <ul className='todo-list'>
        {todos.map((todo, i) => (
          <li key={i}>{todo}</li>
        ))}
        </ul>
      </div>

     
    </div>
  );
};

export default () => (
  <TodosProvider>
    <Todos />
  </TodosProvider>
);
