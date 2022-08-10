import { addDoc, collection, deleteDoc, doc, onSnapshot, query, QuerySnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import db from './firebase'
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-cyan-500 to-blue-500`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center  text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2  w-full text-xl`,
  button: `border p-4 ml-2 bg-blue-500 text-slate-100`,
  count: `text-center p-2 `
}
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  console.log(input)
  // create todos
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Enter Your TODO');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,

    })
    setInput('');
  }

  // read todos from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id, })
      });
      setTodos(todosArr)
    });
    return () => unsubscribe()
  }, [])
  // Update todo
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  //  delete Todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>TODO List</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e) => setInput(e.target.value)} className={style.input} type="text" placeholder='Add TODO' />
          <button className={style.button}><span style={{ 'font-size': '20px' }}>+</span></button>
        </form>
        {todos.length < 1 ? <p className='text-center mt-5'>Loading...</p> : <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}></Todo>
          ))}
        </ul>}

        {todos.length < 1 ? null : <p className={style.count}>{`You have ${todos.length} ToDos`}</p>}
      </div>
    </div>
  );
}

export default App;
