import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const UserPasswordForm = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      navigate('/');
    }
  }, [currentUser, navigate, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new_password1" className="block text-sm font-semibold leading-6 text-gray-900">
          New Password
        </label>
        <input
          type='password'
          placeholder='New password'
          value={new_password1}
          onChange={handleChange}
          name='new_password1'
          className="mt-1 block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
        />
        {errors?.new_password1?.map((message, idx) => (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" key={idx}>
            {message}
          </div>
        ))}
        <label htmlFor="new_password2" className="block text-sm font-semibold leading-6 text-gray-900">
          Confirm Password
        </label>
        <input
          type='password'
          placeholder='Confirm new password'
          value={new_password2}
          onChange={handleChange}
          name='new_password2'
          className="mt-1 block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
        />
        {errors?.new_password2?.map((message, idx) => (
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

export default UserPasswordForm