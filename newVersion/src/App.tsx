import { useState } from 'react';
import useAppContext from "./context";
import Modal from "./Modal";
import TodoItem from "./TodoItem";
function App() {
  const { modalInfo, addTodo, todos, setTodos } = useAppContext();

  const [label, setLabel] = useState('');


  function addTodoHandler(e: any) {
    e.preventDefault();
    if (!label) {
      return alert('todo must be not empty');
    }
    if (todos.find(todo => todo.label === label)) {
      return alert('todo already exist');
    }
    if (!/^\w+$/.test(label)) {
      return alert('invalid todo');
    }
    addTodo(label);
    setLabel('');
  }

  return (
    <main className="flex items-center justify-center min-h-screen py-20 transition">
      {modalInfo.show && <Modal />}
      <section className='flex flex-col gap-4 w-fit p-4 rounded-md bg-gray-600 max-w-[300px] sm:max-w-none shadow-black shadow'>
        <form className='flex flex-col justify-center gap-2'>
          <div className='flex items-center gap-2'>
            <label className='text-white basis-24'>add todo</label>
            <input type='text' autoFocus={true} value={label} onChange={(e) => setLabel(e.target.value)} className='rounded-md p-2 w-full outline-none border border-transparent focus:border active:border focus:border-red-400 active:border-red-400' placeholder='eg: clean the garden' />
          </div>
          <button onClick={(e) => addTodoHandler(e)} className='bg-blue-700 py-2 text-white font-semibold rounded-md'>add</button>
        </form>
        <ul className='flex flex-col gap-2'>
          {todos.map((todo, index: number) => <TodoItem key={index} {...todo} />)}
        </ul>
        {todos.length > 0 && <button className='bg-blue-700 py-2 text-white font-semibold rounded-md' onClick={() => setTodos([])}>clear</button>}
      </section>
    </main>
  )
}

export default App
