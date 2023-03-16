import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineArrowRight } from 'react-icons/ai';

import { axiosReq } from '../api/axiosDefaults';
import logo from '../assets/logo.png';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle }) => {
  const currentUser = useCurrentUser();

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  }

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosReq.get('/posts/')
      .then(response => {
        setData(response.data.results);
      })
      .catch(error => {

      });
  }, []);

  useEffect(() => {
    const allCategories = ['art', 'cats', 'dogs', 'food', 'nature', 'photo', 'travel', 'wallpaper'];
    const dataCategories = data.map(item => item.image_filter);
    const categoriesSet = new Set([...allCategories, ...dataCategories]);
    const categoriesArray = Array.from(categoriesSet);
    setCategories(categoriesArray);
  }, [data]);

  const filteredCategories = categories.filter(category => category !== 'normal');

  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link
          to='/'
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt='logo' className='w-full' />
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSidebar}
          >
            <AiOutlineHome />
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Categories</h3>
          {filteredCategories.map((category, index) => (
            <NavLink
              key={index}
              to={`/category/${category}`}
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
              onClick={handleCloseSidebar}
            >
              {category}
            </NavLink>
          ))}
        </div>
      </div>
      <Link
        className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={handleCloseSidebar}
      >
        <img src={currentUser?.profile_image} className='w-10 h-10 rounded-full' alt='User Profile' />
        <p>{currentUser?.username}</p>
        <AiOutlineArrowRight fontSize={24} />
      </Link>
    </div>
  );
};

export default Sidebar;