import{useState} from "react";

function App(){
    const[state, setState] = useState(0)


return(
<div>
    <h1>  {count}</h1>
    <button onClick={setCount(count+1)}>+</button>
    <button onClick={()=>setCount(count-1)}>-</button>
    </div>
);
}

export default App;
