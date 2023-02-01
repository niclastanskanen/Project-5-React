import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { ProfileDataProvider } from './contexts/ProfileDataContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <CurrentUserProvider>
                <ProfileDataProvider>
                    <App />
                </ProfileDataProvider>
            </CurrentUserProvider>
        </Router>
    </React.StrictMode>,
);