import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Spinner from "./Spinner";

function LikedImage() {
    const [likedPosts, setLikedPosts] = useState([]);
    const currentUser = useCurrentUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axiosReq
            .get("/likes/")
            .then((response) => {
                const likedPostsData = response.data.results.filter(
                    (post) => post.owner === currentUser.username
                );
                const promises = likedPostsData.map((likedPost) =>
                    axiosReq.get(`/posts/${likedPost.post}/`)
                );
                Promise.all(promises).then((postResponses) => {
                    const likedPosts = postResponses.map((postResponse, index) => ({
                        ...likedPostsData[index],
                        post_image: postResponse.data.image,
                        post_title: postResponse.data.title,
                        post_content: postResponse.data.content,
                        post_owner: postResponse.data.owner,
                    }));
                    setLikedPosts(likedPosts);
                    setIsLoading(false);
                });
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, [currentUser]);

    return (
        <div className="min-h-screen py-8">
            <h2 className="text-2xl font-bold mb-4">Liked Posts</h2>
            {isLoading ? (
                <Spinner />
            ) : likedPosts.length > 0 ? (
                <ul>
                    {likedPosts.map((likedPost) => (
                        <Link to={`/image/${likedPost.post}`} key={likedPost.id}>
                            <li
                                className="bg-white shadow-md p-4 rounded-lg mb-4 flex"
                            >
                                <img
                                    src={likedPost.post_image}
                                    alt="post"
                                    className="w-2/3 mr-4"
                                />
                                <div className="w-1/3">
                                    <h2>Your favorite image from <span className="font-bold">{likedPost.post_owner}</span> at {likedPost.created_at}</h2>
                                    <hr />
                                    <p className="text-gray-700 capitalize pt-10">
                                        <span className="font-bold">Title: </span>{likedPost.post_title}
                                    </p>
                                    <p className="text-gray-700 capitalize">
                                    <span className="font-bold">Content: </span>{likedPost.post_content}
                                    </p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-700 text-center">
                    You haven't liked any pictures yet.
                </p>
            )}
        </div>
    );
}

export default LikedImage;