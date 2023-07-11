import React from 'react'
import { useSelector, useDispatch } from "react-redux"; 
import { increment, decrement } from './actions';
import Login from './auth/login'


function App() {
  const counter = useSelector(state => state.counter)
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Hello {counter}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      { isLogged ? <h2>Some Valuable Info</h2>:''}

      <Login/>
    </div>
  );
}

export default App;
