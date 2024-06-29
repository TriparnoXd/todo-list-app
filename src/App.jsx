import { useEffect, useState } from "react"
export default function App() {

  const getLocalStorage = () =>{
    let list = localStorage.getItem('list');
    if(list){
      return JSON.parse(list);
    }else{
      return [];
    }
  }

  const [todos, setTodos] = useState(getLocalStorage());
  const [input, setInput] = useState("");
  const [id, setId] = useState(0);

  const addTodo = () => {
    const newTodo = [...todos, {index: id, todo: input}];
    setTodos(newTodo);
    const newId = id + 1;
    setId(newId);
    console.log("added todo")
  }

  const deleteTodo = (index) => {
    const newTodo = todos.filter((todo) => todo.index !== index)
    setTodos(newTodo);
    console.log(todos)
  }

  const displayTodos = () => {
    let arrayLength = todos.length;
    if(arrayLength>0){
      return <>
        {
          todos.map((item)=>(
            <li key={item.index} className="w-96 bg-slate-400 p-4 rounded-xl m-4 text-xl font-bold flex justify-between">
              <div className="max-w-64 break-words">
                {item.todo}
              </div>
              <button onClick={()=>deleteTodo(item.index)} className="bg-red-700 text-slate-50 p-2 rounded-md py-1 max-h-10">delete</button>
            </li>
          ))
        }
      </>
    }else{
      return <h1 className="text-slate-50 text-xl font-bold w-96 mx-4 my-4">Please Add you Todos</h1>
    }
  }

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(todos))
  },[todos]);

  return (
    <div className='bg-zinc-900 min-h-lvh flex flex-col items-center py-10'>
      <h1 className="text-sky-500 text-5xl font-bold">Todo List App</h1>
      <div id="input-area" className="flex items-center my-8 py-2 gap-6">
        <input type="text" placeholder="Enter you text here" onChange={(e)=>setInput(e.target.value)} className="py-2 px-2 w-96 rounded-xl outline-none"/>
        <button onClick={addTodo} className="px-4 bg-fuchsia-50 rounded-xl py-2 font-bold">Add</button>
      </div>
      <div id="TodoList" className="flex flex-col">
        <h1 className="text-orange-500 text-3xl font-bold mx-4">Your Todos</h1>
        <ul className="list-none">
          {displayTodos()}
        </ul>
      </div>
    </div>
  )
}
