import React, { useRef, useState } from "react";

import { useNavigate } from "react-router";
import { axiosReq } from '../api/axiosDefaults';
import { AiOutlineUpload, AiOutlineDelete } from 'react-icons/ai';
import Spinner from "./Spinner";


function UploadImage() {

    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
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

        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", imageInput.current.files[0]);

        try {
            const { data } = await axiosReq.post("/posts/", formData);
            navigate(`/posts/${data.id}`);
        } catch (err) {
            // console.log(err);
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
                            className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
                        />
                    </form>
                    <form>
                        <p>Content</p>
                        <input
                            as="textarea"
                            rows={6}
                            name="content"
                            value={content}
                            onChange={handleChange}
                            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
                        />
                    </form>
                    <div className="flex justify-end items-end mt-5">
                    <button className='bg-red-400 hover:bg-red-300 text-white font-bold p-2 rounded-full outline-none' type="submit">
                        Upload Photo
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit}>

                        <form className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <img 
                                            src={image} 
                                            className='rounded'
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
                            ></input>
                        </form>
                  
                {textFields}

        </form>
    );
}
export default UploadImage