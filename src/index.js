import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

import { CurrentUserProvider } from './contexts/CurrentUserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <CurrentUserProvider>
                <App />
            </CurrentUserProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);