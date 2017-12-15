// import react, redux dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import store
import store from './store';

// import components
import App from './containers/App';


const Root = (
    <Provider store={ store } >
        <App />
    </Provider>
);

ReactDOM.render(
    Root,
    document.getElementById( 'task-filter' )
);
