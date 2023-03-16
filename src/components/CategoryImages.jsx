import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';

const CategoryImages = () => {
  const { category } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    axiosReq.get(`/posts/?image_filter=${category}`)
      .then(response => {
        const filteredImages = response.data.results.filter(image => image.image_filter === category);
        setImages(filteredImages);
      })
      .catch(error => {
        console.log(error);
      });
  }, [category]);

  return (
    <div>
      <h2 className='capitalize'>{category} Images:</h2>
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
    </div>
  );
}

export default CategoryImages;