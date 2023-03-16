import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { LikedPosts, Navbar, Search, } from '../components';
import { ImageEdit, ImageFeed, ImageDetail, ImageUpload, ImageCategory, ProfileEditForm, UsernameForm, UserPasswordForm } from '../pages';
import { useRedirect } from '../hooks/useRedirect';

const Feed = () => {
  useRedirect("loggedOut");
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<ImageFeed />} />
          <Route path='/image' element={<ImageFeed />} />
          <Route path='/image/:id' element={<ImageDetail />} />
          <Route path='/image/:id/edit' element={<ImageEdit />} />
          <Route path='/upload' element={<ImageUpload />} />
          <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path='/profiles/:id/edit' element={<ProfileEditForm />} />
          <Route path='/profiles/:id/edit/username' element={<UsernameForm />} />
          <Route path='/profiles/:id/edit/password' element={<UserPasswordForm />} />
          <Route path='/category/:category' element={<ImageCategory />} />
          <Route path='/likedposts' element={<LikedPosts />} />
        </Routes>
      </div>
    </div>
  )
}

export default Feed