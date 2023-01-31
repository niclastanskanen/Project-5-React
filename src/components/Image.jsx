import React, { useState } from 'react';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Image = () => {

  const [loading, setLoading] = useState(false);

  if(loading) return <Spinner message='Loading more photos to your feed!'/>

  return (
    <div>
        <MasonryLayout />
    </div>
  )
}

export default Image