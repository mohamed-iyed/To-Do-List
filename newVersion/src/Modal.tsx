import { useState } from "react";
import useAppContext from "./context"

export default function Modal() {
  const { setModalInfo, editTodo, modalInfo: { label } } = useAppContext();
  const [newLabel, setNewLabel] = useState('');

  function closeModal(e: any) {
    if (e.target === e.currentTarget) {
      setModalInfo({
        label: '',
        show: false
      })
    }
  };

  function changeTodo(e: any) {
    e.preventDefault();
    if (!newLabel) {
      return alert('todo must not be empty');
    }
    if (!/^\w+$/.test(newLabel)) {
      return alert('invalid name');
    }
    editTodo(label, newLabel);
    setModalInfo({ label: '', show: false })
  };

  return (
    <div className='modal z-[999] fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] flex items-center justify-center' onClick={closeModal}>
      <div className='modal-content flex max-w-[300px] min-h-[200px] bg-white rounded-md p-4'>
        <form className='flex flex-1 flex-col justify-center items-center gap-10'>
          <input type='text' className='border border-gray-400 px-2 py-1 rounded' placeholder='new name' value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
          <div className='flex gap-2'>
            <button className='px-4 py-2 bg-gray-400 rounded-md text-white' type='submit' onClick={(e) => changeTodo(e)}>Change</button>
            <button className='px-4 py-2 bg-gray-400 rounded-md text-white' type='button' onClick={() => setModalInfo({ label: '', show: false })}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
