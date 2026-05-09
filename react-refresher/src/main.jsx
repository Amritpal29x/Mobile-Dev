import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';



//const h1 = React.createElement("h1" , null ,"Hello world")


 //createRoot(document.getElementById("root")).render(
 // <h1>Hello world</h1>
 //)

 let name = "Amrit"

 createRoot(document.getElementById("root")).render(
  <>
  <h1  className="title" id="heading">
    Welcome to Mobile Dev ! {name}
  </h1>
  <App/>
  </>
 );