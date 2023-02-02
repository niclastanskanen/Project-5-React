import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import MasonryLayout from './MasonryLayout';
import { AiOutlineDownload } from 'react-icons/ai';
import Spinner from './Spinner';
import { axiosReq } from '../api/axiosDefaults';
import Image from './Image';

function ImageDetail () {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);
  
  
  return (
    <div>
      <img {...post.results[0]} setPosts={setPost} postPage />
    </div>
  )
}

export default ImageDetail