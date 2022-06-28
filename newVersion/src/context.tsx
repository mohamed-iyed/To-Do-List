import { createContext, useContext, useState, useEffect } from 'react';

interface modalInfoType {
  show: boolean;
  label: string;
}
interface contextType {
  modalInfo: modalInfoType;
  setModalInfo: (obj: modalInfoType) => void;
  todos: Todos;
  addTodo: (label: string) => void;
  removeTodo: (label: string) => void;
  checkTodo: (label: string) => void;
  editTodo: (label:string, newLabel: string) => void;
  setTodos: (todos: Todos | Function) => void;
}

const defaultContext: contextType = {
  modalInfo: {
    show: false,
    label: ''
  },
  setModalInfo: () => { },
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  checkTodo: () => {},
  editTodo: () => {},
  setTodos: (elem: Todos | Function) => {}

};

const AppContext = createContext(defaultContext);

export interface Todo {
  label: string;
  createdAt: date;
  done: boolean;
}
export type Todos = Todo[]

export function ContextProvider({ children }: { children: React.Element }) {
  const [modalInfo, setModalInfo] = useState<modalInfoType>({
    show: false,
    label: ''
  });
  const [todos, setTodos] = useState<Todos>([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('data')) || [];
    if(savedTodos.length > 0) {
      setTodos(savedTodos.map(todo => ({ ...todo, createdAt: new Date(todo.createdAt) })))
    }else {
      setTodos([]);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(todos));
  }, [todos]);


  function addTodo(label: string) {
    const newTodo = {
      label,
      createdAt: new Date(),
      done: false,
    };

    setTodos(prev => [...prev, newTodo]);
  }

  function removeTodo(label: string) {
    setTodos(prev => {
      const index = prev.findIndex(todo => todo.label === label);
      prev.splice(index, 1);
      return [...prev];
    });
  }

  function editTodo(label:string, newLabel: string) {
   setTodos(prev => {
      const index = prev.findIndex(todo => todo.label === label);
      prev[index].label = newLabel;
      return [...prev];
   })
  }

  function checkTodo(label: string) {
    setTodos(prev => {
      const index = prev.findIndex(todo => todo.label === label);
      prev[index].done = !prev[index].done;
      return [...prev];
    });
  }

  return <AppContext.Provider value={{
    todos,
    modalInfo,
    addTodo,
    removeTodo,
    checkTodo,
    setModalInfo,
    editTodo,
    setTodos
  }}>{ children }</AppContext.Provider>
}


export default function useAppContext() {
  return useContext(AppContext);
}
