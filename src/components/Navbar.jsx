import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai'
import { useCurrentUser } from '../contexts/CurrentUserContext';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();


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
        <Link to={`/profiles/${currentUser?.profile_id}`}>
        <img src={currentUser?.profile_image} alt='user image' className='w-14 h-12 rounded-lg' />
        </Link>
      </div>
    </div>
  )
}

export default Navbar