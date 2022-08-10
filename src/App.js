import { collection, onSnapshot, query, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import db from './firebase'
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CBFE0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center  text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2  w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2 `
}
function App() {
  const [todos, setTodos] = useState([]);
  // read todos from firebase
  useEffect(()=>{
    const q= query(collection(db,'todos'));
    const unsubscribe = onSnapshot(q,(querySnapshot)=>{
      let todosArr = [];
      querySnapshot.forEach((doc)=>{
        todosArr.push({...doc.data(),id: doc.id,})
      });
      setTodos(todosArr)
    });
    return ()=> unsubscribe()
  },[])

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>TODO List</h3>
        <form className={style.form}>
          <input className={style.input} type="text" placeholder='Add TODO' />
          <button className={style.button}><span style={{ 'font-size': '30px' }}>+</span></button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo}></Todo>
          ))}
        </ul>
        <p className={style.count}>You have 2 ToDos </p>
      </div>
    </div>
  );
}

export default App;
