import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosRes } from '../api/axiosDefaults';
import ProfilePostsByFilter from '../pages/profiles/ProfilePostsByFilter';
import Spinner from './Spinner';


const CategoryImages = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosRes.get('/posts/');
        setPosts(data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Spinner message="Loading images..." />;
  }

  return (
  <div>
      <ProfilePostsByFilter filter={category} posts={posts} />
  </div>
  );
};

export default CategoryImages;
