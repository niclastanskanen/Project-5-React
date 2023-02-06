import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { axiosReq } from '../api/axiosDefaults';


const ImageDetail = ({ user }) => {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;

  const imageInput = useRef(null);
  const navigate = useNavigate
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`);
        const { title, content, image, is_owner } = data;

        is_owner ? setPostData({ title, content, image }) : navigate("/");
      } catch (err) {

      }
    };

    handleMount();
  }, [navigate, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}`, formData);
      navigate(`/posts/${id}`);
    } catch (err) {

      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };


  
  return (
    <div>
      <h1>ImageDetail</h1>
      <form
        type='text'
        name='title'
        value={title}
        onChange={handleChange}
      >

      </form>
    </div>

  );
};

export default ImageDetail