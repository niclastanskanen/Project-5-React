import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../utils/utils';
import { useParams } from 'react-router-dom';
import ProfilePost from '../pages/profiles/ProfilePost';
import { axiosReq } from '../api/axiosDefaults';



function ImageDetail() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}/`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <div>
      <ProfilePost {...post.results[0]} setPosts={setPost} postPage />
    </div>
  )
}

export default ImageDetail