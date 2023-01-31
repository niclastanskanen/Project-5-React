import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Image = () => {
  const [loading, setLoading] = useState(true);

  if(loading) return <Spinner message='Loading more photos to your feed!'/>

  return (
    <div>Image</div>
  )
}

export default Image