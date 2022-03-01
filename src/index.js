import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
// import { orm } from './orm/orm';


// const emptyDBState = orm.getEmptyState();
// const session = orm.session(emptyDBState);
// console.log(session)


ReactDOM.render(
    <App />,
  document.getElementById('root')
);


