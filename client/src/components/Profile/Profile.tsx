import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {PostForm} from "../FormNews/FormNews";

export function Profile(): JSX.Element {
    const {id} = useParams();
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState({});

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(`http://localhost:3000/api/profile/${id}/posts`, {
                    credentials: 'include',
                });
                const result = await response.json();
                setPosts(result.data);
            } catch (error) {
                console.log(error)
            }
        })()
    }, [id]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/profile/${id}/posts`, {
                credentials: 'include',
            });
            const result = await response.json();
            setPosts(result.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(`http://localhost:3000/api/profile/${id}/user`, {
                    credentials: 'include',
                });
                const result = await response.json();
                if (result.formattedData !== undefined) {
                    setName(result.formattedData);
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [id]);

    const handleDeletePost = async (id: number) => {
        await fetch(`http://localhost:3000/api/news/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        fetchPosts()
    }

    const handleSubscribe =  async (followsToId: string | undefined) => {
        await fetch(`http://localhost:3000/api/followings/subscribe`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({followsToId}),
            headers: {'Content-Type': 'application/json'},
        })
    }

    return (
        <>
            <div className={'pt-10'}>
                <div className={'font-bold text-5xl flex w-2/4 mx-auto'}>Профиль</div>
                <div className={'flex w-2/4 h-56 m-5 border-2 bg-blue-100 rounded-xl mx-auto'}>
                    <div
                        className={'flex w-1/4 h-4/5 m-5 border-2 border-amber-500 bg-blue-500 rounded-xl my-auto'}></div>
                    <div className={'flex justify-around w-2/3'}>
                        <div className={'flex flex-col mt-6 font-semibold'}>
                            {name !== undefined && <p>{name.firstName} {name.lastName}</p>}
                            <p>Birthday: </p>
                            {name.isUser && <Link to={'/profile/edit'} className={'text-center bg-blue-500 w-56 rounded-md'}>Редактировать профиль</Link>}
                            {!name.isUser && <button onClick={() => handleSubscribe(id)} className={'bg-blue-500 w-56 rounded-md'}>Подписаться</button>}
                        </div>
                        <div className={'flex flex-col mt-6 font-semibold'}>
                            <p>Подписки: ХХХ</p>
                            <p>Подписчики: ХХХ</p>
                        </div>
                    </div>
                </div>
                <div className={'card-box flex flex-col justify-center w-2/4 mx-auto'}>
                    {name.isUser && <PostForm setPosts={fetchPosts}/>}
                    <p className={'font-semibold text-2xl mt-5'}>Мои записи</p>
                    {posts && posts.map((el) =>
                        <div key={el.id} className={'flex flex-col text-center mt-5 border-2 bg-blue-100 rounded-xl'}>
                            <div className={'justify-between flex ml-4 mt-2'}>
                                <div className={'font-bold'}>{el.firstName} {el.lastName}</div>
                                <button onClick={() =>handleDeletePost(el.id)} className={'mr-3'}>Удалить пост</button>
                            </div>
                            <div className={'self-start text-left m-4'}>
                                {el.text}
                            </div>
                            <div className={'flex ml-4 justify-between mb-2 font-light'}>
                                <p>{el.date}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
