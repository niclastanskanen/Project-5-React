import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";

import { axiosReq } from '../../api/axiosDefaults';
import { useRedirect } from "../../hooks/useRedirect";

function ImageUpload() {
    useRedirect("loggedOut");
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

            if (err.response?.status !== 401) {
                setErrors(err.response?.data);

            }
        }
    };

    const textFields = (
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
            <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
                        <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        />
                    {errors?.title?.map((message, idx) => (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" key={idx}>
                            {message}
                        </div>
                    ))}
                        <label htmlFor="content" className="block text-sm font-semibold leading-6 text-gray-900">Content</label>
                        <textarea
                            rows={6}
                            name="content"
                            id="content"
                            value={content}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        />
                    {errors?.content?.map((message, idx) => (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" key={idx}>
                            {message}
                        </div>
                    ))}
                        <label htmlFor="image_filter" className="block text-sm font-semibold leading-6 text-gray-900">Category</label>
                        <select
                            name="image_filter"
                            id="image_filter"
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
                    {errors?.image_filter?.map((message, idx) => (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" key={idx}>
                            {message}
                        </div>
                    ))}
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            {image ? (
                <>
                    <div>
                        <img
                            src={image}
                            className='rounded p-5'
                            alt="user"
                        />
                    </div>
                            <label htmlFor="file-upload" className="flex justify-center cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                                <span>Change Image</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleChangeImage}
                                    ref={imageInput}
                                    accept='image/*'
                                />
                            </label>
                            {errors?.image?.map((message, idx) => (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" key={idx}>
                                    {message}
                                </div>
                            ))}
                </>
            ) : (
                <>
                <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Upload a file</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleChangeImage}
                                    ref={imageInput}
                                    accept='image/*'
                                />
                            </label>
                            {errors?.image?.map((message, idx) => (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" key={idx}>
                                    {message}
                                </div>
                            ))}
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                    </div>
                </div>
                        </>    )}
            {textFields}
        </form>
    );
}
export default ImageUpload