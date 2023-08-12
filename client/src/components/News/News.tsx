import {useEffect, useState} from "react";
import {PostForm} from "../FormNews/FormNews";
import {Link} from "react-router-dom";
import {PostCard} from "../../PostCard/PostCard";

interface ProfileData {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string
}

export interface PostData {
    avatar: string,
    date: string,
    firstName: string,
    id: number,
    lastName: string,
    photo: string | null,
    text: string |null,
    userId: number,
}

export function News(): JSX.Element {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [userId, setUserId] = useState<string | undefined>();
    const [name, setName] = useState<ProfileData>({ id: 0, firstName: '', lastName: '', email: '', avatar: ''});

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(`http://localhost:3000/api/news`, {
                    credentials: 'include',
                });
                const result = await response.json();
                setPosts(result.data);
            } catch (error) {
                console.log(error)
            }
        })()
    }, []);

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(`http://localhost:3000/api/profile/current_user`, {
                    credentials: 'include',
                });
                const user = await response.json();
                setUserId(user.userId);
            } catch (error) {
                console.log(error)
            }
        })()
    }, []);

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(`http://localhost:3000/api/profile/${userId}/user`, {
                    credentials: 'include',
                });
                const result = await response.json();
                if (result.formattedData !== undefined) {
                    setName(result.formattedData);
                    console.log(name)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/news`, {
                credentials: 'include',
            });
            const result = await response.json();
            setPosts(result.data);
        } catch (error) {
            console.log(error)
        }
    };

    const handleDeletePost = async (id: number) => {
        await fetch(`http://localhost:3000/api/news/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        fetchPosts()
    }

    return (
        <>
            <div className={'pt-20'}>
                <div className={'font-bold text-5xl flex w-2/4 mx-auto mb-5'}>Новости</div>
                <div className={'card-box flex flex-col justify-center w-2/4 mx-auto'}>
                    <div className={'mb-5'}>
                        <PostForm setPosts={fetchPosts}/>
                    </div>
                    {posts && posts.map((el) =>
                        <div key={el.id} className={'flex flex-col text-center mb-5 border-2 bg-gray-50 rounded-xl'}>
                            <PostCard post={el} handleDeletePost={handleDeletePost}/>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}
