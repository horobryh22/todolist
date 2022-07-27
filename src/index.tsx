import React from 'react';

// eslint-disable-next-line import/order
import ReactDOM from 'react-dom/client';

import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'App';
import { store } from 'store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
);
