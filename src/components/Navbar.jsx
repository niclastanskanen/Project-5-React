import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import { removeTokenTimestamp } from '../utils/utils';

const Navbar = ({ searchTerm, setSearchTerm}) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();


  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
      navigate('/login');
    } catch (err) {

    }
  };

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <AiOutlineSearch fontSize={21} className='ml-1' />
        <input
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
        />
      </div>
      <div className='flex gap-3'>
        <Link to={`/profiles/${currentUser?.profile_id}`} className='hidden md:block'>
        <img src={currentUser?.profile_image} alt='user' className='w-14 h-12 rounded-lg' />
        </Link>
        <Link to='/upload' className='bg-red-400 hover:bg-red-300 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
          <IoMdAddCircleOutline fontSize={30}/>
        </Link>
        <Link className='rounded-lg flex justify-center items-center cursor-pointer'>
          <AiOutlineLogout fontSize={30} onClick={handleSignOut} />
          </Link>
      </div>
    </div>
  )
}

export default Navbar