import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { Sidebar, Profile } from '../components';
import Feed from './Feed';
import Logo from '../assets/logo.png';

const Home = () => {
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar />
      </div>
      <div className='flex md:hidden flex-row'>
        <AiOutlineMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
      </div>
    </div>
  )
}

export default Home