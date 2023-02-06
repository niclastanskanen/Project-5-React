import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';


const Navbar = ({ searchTerm, setSearchTerm}) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
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
          className='p-2 w-full bg-white outline-none'
        />
      </div>
      <div className='flex gap-3'>
        <Link to={`/profiles/${currentUser?.profile_id}`} className='hidden md:block'>
        <img src={currentUser?.profile_image} alt='user' className='w-14 h-12 rounded-lg' />
        </Link>
        <Link to='/upload' className='bg-red-400 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
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