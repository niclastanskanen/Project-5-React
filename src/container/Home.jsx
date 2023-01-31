import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { Sidebar, Profile } from '../components';
import Feed from './Feed';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from '../components/Avatar';

const Home = () => {
  const currentUser = useCurrentUser();
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar />
      </div>
      <div className='flex md:hidden flex-row'>
        <AiOutlineMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
        <Link to='/'>
          <img src={logo} alt='logo' className='w-40' />
        </Link>
        <Link to={`/profiles/${currentUser?.profile_id}`}>
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
        </Link>
      </div>
    </div>
  )
}

export default Home