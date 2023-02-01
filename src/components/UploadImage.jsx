import React, { useRef, useState } from 'react'
import { AiOutlineUpload, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';

import Spinner from './Spinner';

const UploadImage = () => {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: '',
  });

  const { title, content, image } = postData;

  const imageInput = useRef(null);
  const navigate = useNavigate();

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

    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post('/posts/', formData);
      navigate.push(`/posts/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };



  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">

      <p className="text-red-400 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>

    <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
      <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
        <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">

            <Spinner />

            <label>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-2xl">
                    <AiOutlineUpload />
                  </p>
                  <p className="text-lg">Click to upload</p>
                </div>

                <p className="mt-32 text-gray-400">
                  Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                </p>
              </div>
              <input
                type="file"
                name="upload-image"
                onChange=''
                className="w-0 h-0"
              />
            </label>

            <div className="relative h-full">
              <img
                src=''
                alt="uploaded-pic"
                className="h-full w-full"
              />
              <button
                type="button"
                className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                onClick=''
              >
                <AiOutlineDelete />
              </button>
            </div>

        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
        <input
          type="text"
          value={title}
          onChange=''
          placeholder="Add your title"
          className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
        />

          <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
            <img
              src=''
              className="w-10 h-10 rounded-full"
              alt="user-profile"
            />
            <p className="font-bold"></p>
          </div>

        <input
          type="text"
          value=''
          onChange=''
          placeholder="Content"
          className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
        />

        <div className="flex flex-col">
          <div>
            <p className="mb-2 font-semibold text:lg sm:text-xl">Choose A Category</p>
            <select
              onChange=''
              className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            >
              <option value="others" className="sm:text-bg bg-white">Select Category</option>

                <option className="text-base border-0 outline-none capitalize bg-white text-black " value=''>
                 
                </option>

            </select>
          </div>
          <div className="flex justify-end items-end mt-5">
            <button
              type="button"
              onClick=''
              className="bg-red-400 text-white font-bold p-2 rounded-full w-28 outline-none"
            >
              Save Image
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};

export default UploadImage