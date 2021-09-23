import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import {getAllPosts, getPost} from  './store/posts'


const store = configureStore();

//testing purposes
if(process.env.NODE_ENV === 'development') {
    window.dispatch = store.dispatch;
    window.getAllPosts = getAllPosts;
    window.getAllPosts = getPost;

}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

//postgres://kmokqprtxlgkdw:58b3fb22a2aefcb5623af09bb0bc6a6f06e7f93a4563e5218bbc2a3c628d5656@ec2-44-196-170-156.compute-1.amazonaws.com:5432/dcuqodcin6r0a0
