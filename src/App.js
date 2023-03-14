import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './api/axiosDefaults';

import Home from './container/Home';
import { useCurrentUser } from './contexts/CurrentUserContext';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import { Login } from './components';


const App = () => {
  const currentUser = useCurrentUser();

  return (
    <Routes>
      {/* <Route
        path='/*'
        element={currentUser
          ? <Home />
          : <Navigate to='/login' replace />
        }
      /> */}
      <Route path='/login' element={<Login />} />
      <Route path='/signin' element={<SignInForm />} />
      <Route path='/signup' element={<SignUpForm />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  );
};

export default App;