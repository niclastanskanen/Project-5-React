import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';
import Spinner from './Spinner';

const CategoryImages = () => {
  const { category } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosReq.get(`/posts/?image_filter=${category}`)
      .then(response => {
        const filteredImages = response.data.results.filter(image => image.image_filter === category);
        setImages(filteredImages);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  }, [category]);

  return (
    <div>
      <h2 className='capitalize'>{category} Images:</h2>
      {loading ? (
        <Spinner message="Loading images..." />
      ) : (
        <>
          {images.length === 0 ? (
            <p>This category is empty.</p>
          ) : (
            <ul>
              {images.map((image, index) => (
                <li key={index}>
                  <img src={image.image} alt={image.title} />
                  <p>{image.title}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default CategoryImages;
