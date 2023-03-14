import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

function ImageEdit() {

    const [errors, setErrors] = useState({});
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        image: '',
    });
    const { title, content, image } = postData;

    const imageInput = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/${id}/`);
                const { title, content, image, is_owner } = data;
                is_owner ? setPostData({ title, content, image }) : navigate('/');
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
        formData.append('title', title);
        formData.append('content', content);

        if (imageInput?.current?.files[0]) {
            formData.append('image', imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/posts/${id}/`, formData);
            navigate(`/image/${id}`);
        } catch (err) {

            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
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
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <form onSubmit={handleSubmit}>
                <img
                    src={image}
                    className='rounded p-5'
                    alt='user'
                />
                <div className='flex flex-col items-center justify-center'>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Change Image</label>
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
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                        </div>
                    </div>
                </div>
            {textFields}
        </form>
    )
}

export default ImageEdit;