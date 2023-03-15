import React, { useRef, useState } from "react";

import { useNavigate } from "react-router";
import { axiosReq } from '../api/axiosDefaults';
import { AiOutlineUpload } from 'react-icons/ai';



function UploadImage() {

    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
        image_filter: "",
    });
    const { title, content, image, image_filter } = postData;

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

        formData.append("title", title);
        formData.append("content", content);
        formData.append("image_filter", image_filter);
        formData.append("image", imageInput.current.files[0]);

        try {
            const { data } = await axiosReq.post("/posts/", formData);
            navigate(`/image/${data.id}`);
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
            <p className="text-red-400 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>
            <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
                    <form>
                        <p>Title</p>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        />
                    </form>
                    <form>
                        <p>Content</p>
                        <textarea
                            rows={6}
                            name="content"
                            value={content}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        />
                    </form>
                    <form>
                        <p>Category</p>
                        <select
                            name="image_filter"
                            value={image_filter}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        >
                            <option value='art'>Art</option>
                            <option value='cats'>Cats</option>
                            <option value='dogs'>Dogs</option>
                            <option value='food'>Food</option>
                            <option value='nature'>Nature</option>
                            <option value='photo'>photo</option>
                            <option value='travel'>Travel</option>
                            <option value='wallpaper'>Wallpaper</option>
                        </select>
                    </form>
                    <div className="flex justify-end items-end mt-5 space-x-4">
                        <button
                            className='bg-red-400 hover:bg-red-300 text-white font-bold p-2 rounded-full outline-none'
                            onClick={() => navigate(-1)}
                        >
                            Go Back
                        </button>
                        <button className='bg-red-400 hover:bg-red-300 text-white font-bold p-2 rounded-full outline-none' type="submit">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit}>
                {image ? (
                    <>
                        <figure>
                            <img
                                src={image}
                                className='rounded p-5'
                                alt="user"
                            />
                        </figure>
                        <div>
                            <button
                                className='bg-red-400 hover:bg-red-300 text-white font-bold p-2 rounded-full outline-none'
                                htmlFor="image-upload"
                            >
                                Change the image
                            </button>
                        </div>
                    </>
                ) : (

                    <p
                        className="font-bold text-2xl"
                        htmlFor="image-upload"
                    >
                        <AiOutlineUpload />
                    </p>
                )}
                <input
                    type='file'
                    id="image-upload"
                    accept="image/*"
                    onChange={handleChangeImage}
                    ref={imageInput}
                    className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-400 file:text-white hover:file:bg-red-300'
                ></input>
            {textFields}
        </form>
    );
}
export default UploadImage