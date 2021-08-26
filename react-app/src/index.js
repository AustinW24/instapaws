import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import {getAllPosts} from  './store/posts'

const store = configureStore();

//testing purposes
if(process.env.NODE_ENV === 'development') {
    window.dispatch = store.dispatch;
    window.getAllPosts = getAllPosts;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
