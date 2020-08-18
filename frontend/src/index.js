import React from 'react';
import ReactDOM from 'react-dom';

import App from "./components/App"

import axios from "axios"

const promise = axios.get("http://localhost:3001/api/measures")
promise.then(data => console.log(data))

ReactDOM.render(
  <App />,
  document.getElementById('root')
);