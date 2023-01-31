import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';


import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Image = (props) => {
  const {

    owner,
    profile_id,
    profile_image,
    title,
    content,
    image,
    updated_at,

  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useNavigate();

  const [loading, setLoading] = useState(false);

  if(loading) return <Spinner message='Loading more photos to your feed!'/>

  return (
    <div>
      <div className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
        </div>
    </div>
  )
}

export default Image