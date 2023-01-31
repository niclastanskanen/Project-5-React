import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <CurrentUserProvider>
                <App />
            </CurrentUserProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);