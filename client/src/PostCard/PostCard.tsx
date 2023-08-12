import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    photo: string | null,
    text: string |null,
    avatar: string;
    date: string
}

interface PostCardProps {
    post: Post;
    handleDeletePost: (postId: number) => void;
}

export function PostCard({ post, handleDeletePost }: PostCardProps): JSX.Element {
    const [userId, setUserId] = useState();

    useEffect(() => {
        async function fetchCurrentUser() {
            try {
                const response = await fetch(`http://localhost:3000/api/profile/current_user`, {
                    credentials: 'include',
                });
                const user = await response.json();
                setUserId(user.userId);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCurrentUser();
    }, []);

    return (
        <div>
            <div className="justify-between flex ml-4 mt-2">
                <div className="flex">
                    <img src={`http://localhost:3000${post.avatar}`} className="max-h-12 rounded-full mx-auto mr-5" />
                    <div className="flex flex-col">
                        <div className="font-bold">
                            <Link to={`../profile/${post.userId}`}>{post.firstName} {post.lastName}</Link>
                        </div>
                        <div className="font-light self-start">{post.date}</div>
                    </div>
                </div>
            </div>
            <div className="self-start text-left m-4">
                {post.text}
            </div>
            {post.photo && (
                <div className="flex justify-center mb-2">
                    <img src={`http://localhost:3000${post.photo}`} className="max-h-96 mx-auto" />
                </div>
            )}
            {userId === post.userId && (
                <div className="w-full flex justify-end">
                    <button onClick={() => handleDeletePost(post.id)} className="mr-3 mb-2">
                        Удалить пост
                    </button>
                </div>
            )}
        </div>
    );
}
