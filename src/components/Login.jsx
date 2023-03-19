import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';

import shareVideo from '../assets/share.mp4'
import logo from '../assets/logo-white.png'


const Login = () => {
  
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
          <video
            src={shareVideo}
            type='video/mp4'
            loop
            controls={false}
            muted
            autoPlay
            className='w-full h-full object-cover'
          />
          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
            <div className='p-5'>
              <img 
                src={logo}
                width='230px'
                alt='logo'
              />
            </div>
            <div className='shadow-2x1 pb-4'>
              <Link to='/signin'>
              <button
                type='button'
                className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
              >
                <AiOutlineLogin className='mr-4'/> Sign In
              </button>
              </Link>
            </div>
            <div className='shadow-2x1'>
              <Link to='/signup'>
              <button
                type='button'
                className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
              >
                <AiOutlineUserAdd className='mr-4'/> Create an account
              </button>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login