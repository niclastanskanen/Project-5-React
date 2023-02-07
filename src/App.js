import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './api/axiosDefaults';
// import { useCurrentUser } from './contexts/CurrentUserContext';

import Home from './container/Home';

import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import { Login } from './components';

const App = () => {
  // const navigate = useNavigate();
  // const currentUser = useCurrentUser();

  // useEffect(() => {
  //   if (!currentUser) navigate('/login');
  // }, [currentUser, navigate]);

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signin' element={<SignInForm />} />
      <Route path='/signup' element={<SignUpForm />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  );
};

export default App;