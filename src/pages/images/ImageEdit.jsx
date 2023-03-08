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
                const { data } = await axiosReq.get(`/posts/${id}`);
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


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        if (imageInput?.current?.files[0]) {
            formData.append('image', imageInput.current.files[0]);
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
            <form className="text-center">
                <img
                    src={image}
                    className='rounded p-5'
                    alt='user'
                />
                <div>
                    <button
                        className='bg-red-400 hover:bg-red-300 text-white font-bold p-2 rounded-full outline-none'
                        htmlFor="image-upload"
                    >
                        Change the image
                    </button>
                </div>
            </form>
            {textFields}
        </form>
    )
}

export default ImageEdit;