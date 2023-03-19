import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';

const UsernameForm = () => {

  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      navigate('/');
    }
  }, [currentUser, navigate, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="block text-sm font-semibold leading-6 text-gray-900">
          Change Username
        </label>
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="mt-1 block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
        />
        {errors?.username?.map((message, idx) => (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" key={idx}>
            {message}
          </div>
        ))}
        <div className='flex justify-end items-end pt-5 space-x-4'>
          <button
            className='bg-red-400 hover:bg-red-300 text-white font-bold p-2 rounded-full outline-none'
            onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className='bg-red-400 hover:bg-red-300 text-white font-bold p-2 rounded-full outline-none'
            type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default UsernameForm