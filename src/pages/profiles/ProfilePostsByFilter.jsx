import React from 'react';
import ProfilePost from './ProfilePost';

const ProfilePostsByFilter = ({ filter, posts }) => {
  const filteredPosts = posts.filter(post => post.image_filter === filter);

  if (filteredPosts.length === 0) {
    return <h1 className='flex justify-center capitalize font-bold'>No images found</h1>;
  }

  return (
    <div>
      <h1 className='flex justify-center capitalize font-bold'>{filter}</h1>
      {filteredPosts.map(post => (
        <ProfilePost key={post.id} {...post} />
      ))}
    </div>
  );
};

export default ProfilePostsByFilter;