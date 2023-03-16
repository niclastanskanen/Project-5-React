import React, { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

function LikedPosts() {
    const [likedPosts, setLikedPosts] = useState([]);
    const currentUser = useCurrentUser();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axiosReq.get("/likes/")
            .then((response) => {
                setLikedPosts(
                    response.data.results.filter(
                        (post) => post.owner === currentUser.username
                    )
                );
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, [currentUser]);

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <h2 className="text-2xl font-bold mb-4">Liked Posts</h2>
            {isLoading ? (
                <Spinner />
            ) : likedPosts.length > 0 ? (
                <ul className="max-w-md mx-auto">
                    {likedPosts.map((likedPost) => (
                        <Link to={`/image/${likedPost.post}`}>
                        <li
                            key={likedPost.id}
                            className="bg-white shadow-md p-4 rounded-lg mb-4"
                        >
                            <p className="text-gray-700">
                                Post{" "}
                                {likedPost.post}{" "}
                                liked by {likedPost.owner} on {likedPost.created_at}
                            </p>
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

export default LikedPosts;