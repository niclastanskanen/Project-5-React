import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import MasonryLayout from './MasonryLayout';
import { AiOutlineDownload } from 'react-icons/ai';
import Spinner from './Spinner';

const ImageDetail = () => {
  
  
  return (
    <div>
      <img className='rounded-lg w-full' alt='user' src={image} />
    </div>
  )
}

export default ImageDetail