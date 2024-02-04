import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
 const [data, setData] = useState("");

 useEffect(() => {
   fetch('/hello_world')
   .then(response => response.text())
   .then(data => setData(data))
   .catch(error => console.error('Error!', error));
 }, []);

 return (
   <div className>
     {/* <p>Hello</p> */}
     <p>{data}</p>
   </div>
 );
}

export default App;
