import React, { useState, useRef, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineCloseCircle, AiOutlineLogout } from 'react-icons/ai';

import Feed from './Feed';
import logo from '../assets/logo.png'

import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { Sidebar, Profile } from '../components';
import Avatar from '../components/Avatar';
import axios from 'axios';

const Home = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef(null);

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, []);

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <AiOutlineMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
          <Link to='/'>
            <img src={logo} alt='logo' className='w-40' />
          </Link>
          <Link to={`/profiles/${currentUser?.profile_id}`}>
            <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
          </Link>
          <AiOutlineLogout fontSize={40} className='cursor-pointer' onClick={handleSignOut} />
        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiOutlineCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/profiles/:id' element={<Profile />} />
          <Route path='/*' element={<Feed />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home