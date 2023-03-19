import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './api/axiosDefaults';

import Home from './container/Home';

import { Login } from './components';
import { SignInForm, SignUpForm } from './pages';

const App = () => {
  return (
    <Routes>
      <Route path='/*' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signin' element={<SignInForm />} />
      <Route path='/signup' element={<SignUpForm />} />
    </Routes>
  );
};

export default App;
