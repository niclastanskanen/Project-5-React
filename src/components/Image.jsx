import React from "react";

import { useCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";

import { Link } from "react-router-dom";


const Image = (props) => {
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



  return (
    <div className=''>
      <div>
        <div className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <img src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && "..."}
          </div>
        </div>
      </div>
      <Link to={`/posts/${id}`}>
        <img src={image} alt={title} />
      </Link>

    </div>
  );
};

export default Image;