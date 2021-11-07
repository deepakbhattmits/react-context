export type TodosContextState = {
  // todos: string[];
  todos: {id: string,title: string;completed:boolean}[];
  addTodo: (name: string) => void;
  removeTodo: (id: string) => void;
  markCompleted: (id: string) => void;
};

export interface Itodos{
  id: string,title: string; completed: boolean;
}