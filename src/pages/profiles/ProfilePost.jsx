import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import Masonry from 'react-masonry-css';


const ProfilePost = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        updated_at,
        postPage,
        setPosts,
      } = props;

      const currentUser = useCurrentUser();
      const is_owner = currentUser?.username === owner;
      const navigate = useNavigate();
      
      const handleDelete = async () => {
        try {
          await axiosRes.delete(`/posts/${id}/`);
          history.goBack();
        } catch (err) {
          // console.log(err);
        }
      };

      const breakpointColumnsObj = {
        default: 4,
        3000: 6,
        2000: 5,
        1200: 3,
        1000: 2,
        500: 1,
      };

  return (
    <div className='px-2'>
      <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
        
      {/* <p>{updated_at}</p>
      <p>{title}</p> 
      <p>{content}</p>
     */}
    <img src={image} alt={title} className='w-max' />
    {/* <p>{likes_count}</p>
    <p>{comments_count}</p> */}
    
    </Masonry>
    </div>

  )
}

export default ProfilePost