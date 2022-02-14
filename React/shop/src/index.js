import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {combineReducers, createStore} from 'redux';

let defaultAlert = true;

function reducer2 (curState=defaultAlert, action){
  if (action.type === "enable") {
    return true;
  } else if (action.type === "disable") {
    return false;
  } else {
    return curState;
  }
}

let defaultState = [
  {id : 0, name : '멋진신발', quan : 2},
  {id : 1, name : '멋진신발1', quan : 1}
];

function reducer (curState = defaultState, action){
  if (action.type === "addItem"){
    let copied = [...curState];
    let payload = action.payload;
    let found = copied.find((e)=>{ return e.id === payload.id})
    if (found){
      found.quan++;
    } else {
      copied.push(action.payload);
    }
    return copied;
  } else if (action.type === "inc"){
    let copied = [...curState];
    let found = copied.find((e)=>{ return e.id === action.payload.id })
    if (found){
      found.quan++;
    }
    return copied;
  } else if (action.type === "dec") {
    let copied = [...curState];
    let found = copied.find((e)=>{ return e.id === action.payload.id })
    if (found){
      if (found.quan > 0){
        found.quan--;
      }
    }
    return copied;
  } else {
    return curState;
  }
}

let store = createStore(combineReducers({reducer, reducer2}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
