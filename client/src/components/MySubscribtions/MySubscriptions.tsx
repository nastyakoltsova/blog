import React, { useEffect, useState } from "react";
import { PostCard } from "../../PostCard/PostCard";

interface PostData {
    avatar: string,
    date: string,
    firstName: string,
    postId: number,
    lastName: string,
    photo: string | null,
    text: string |null,
    userId: number,
}

export function MySubscriptions(): JSX.Element {
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`http://localhost:3000/api/news/mysubscriptions`, {
                    credentials: 'include',
                });
                const result = await response.json();
                setPosts(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="pt-20">
            <div className="font-bold mb-7 text-5xl flex w-2/4 mx-auto">Мои подписки</div>
            <div className="card-box flex flex-col justify-center w-2/4 mx-auto">
                {posts.map((post) => (
                    <div key={post.postId} className="flex flex-col text-center mb-5 border-2 bg-gray-50 rounded-xl">
                        <PostCard post={post} handleDeletePost={null}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
