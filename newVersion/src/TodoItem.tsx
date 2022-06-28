import useAppContext, { Todo } from './context';

export default function TodoItem({ label, createdAt: ca, done }: Todo) {
  const { removeTodo, setModalInfo, checkTodo } = useAppContext();

  return <li className='flex justify-between items-center min-h-[32px] gap-2 relative group'>
    <span className={`${done ? 'line-through' : ''} text-white cursor-pointer max-w-[170px] whitespace-normal break-words`} title='change to done' onClick={() => checkTodo(label)}>{label}</span>
    <span className='hidden absolute top-0 translate-y-[-100%] p-2 bg-white text-black transition rounded-md group-hover:flex'>createdAt : {ca.toLocaleDateString()}</span>
    <div className='justify-center gap-2 hidden group-hover:flex'>
      <button className='px-4 py-1 bg-blue-700 text-white rounded-md shadow-indigo-900 shadow' onClick={() => setModalInfo({
        show: true,
        label
      })}>edit</button>
      <button className='px-4 py-1 bg-blue-700 text-white rounded-md shadow-indigo-900 shadow' onClick={() => removeTodo(label)}>remove</button>
    </div>
  </li>
}


