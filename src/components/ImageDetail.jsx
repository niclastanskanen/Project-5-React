import React from 'react'

const ImageDetail = (props) => {
  const {
    image,
  } = props;
  
  return (
    <div>
      <img className='rounded-lg w-full' alt='user' src={image} />
    </div>
  )
}

export default ImageDetail