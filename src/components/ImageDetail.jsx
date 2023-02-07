import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePost from '../pages/profiles/ProfilePost';
import { axiosReq } from '../api/axiosDefaults';



function ImageDetail() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });




  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}/`),

        ]);
        setPost({ results: [post] });

      } catch (err) {

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