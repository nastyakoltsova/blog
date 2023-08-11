import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {PostForm} from "../FormNews/FormNews";
import {PostCard} from "../../PostCard/PostCard";

export function Profile(): JSX.Element {
    const {id} = useParams();
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState({});
    const [follow, setFollow] = useState({});

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
                console.log(name)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [id, name.avatar]);

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(`http://localhost:3000/api/followings/${id}`, {
                    credentials: 'include',
                });
                const result = await response.json();
                if (result) {
                    setFollow(result);
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, []);

    const handleDeletePost = async (id: number) => {
        await fetch(`http://localhost:3000/api/news/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        fetchPosts()
    }

    const handleSubscribe = async (followsToId: string | undefined) => {
        try {
            const response = await fetch(`http://localhost:3000/api/followings/subscribe`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({followsToId}),
                headers: {'Content-Type': 'application/json'},
            })
            const data = await response.json();
            setFollow((prevFollow) => ({
                isFollow: true,
                followsToNum: prevFollow.followsToNum,
                followersNum: prevFollow.followersNum + 1,
            }));
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnsubscribe = async (followsToId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/followings/unsubscribe`, {
                method: 'DELETE',
                credentials: 'include',
                body: JSON.stringify({followsToId}),
                headers: {'Content-Type': 'application/json'},
            })
            const data = await response.json();
            setFollow((prevFollow) => ({
                isFollow: false,
                followsToNum: prevFollow.followsToNum,
                followersNum: prevFollow.followersNum - 1,
            }));
        } catch (error) {
            console.log(error)
        }
    }

    const handlePhotoUpload = async () => {
        const fileInput = document.getElementById('upload-photo');
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch(`http://localhost:3000/api/profile/changeAvatar`, {
                method: 'PATCH',
                credentials: 'include',
                body: formData,
            })
            const data = await response.json();
            if (response.ok) {
                // Обновление состояния
                setName((prevName) => ({
                    ...prevName,
                    avatar: data.newAvatar
                }));

                // // Сохранение URL аватара в localStorage
                // localStorage.setItem('avatar', data.newAvatar);
            } else {
                console.log('Ошибка при загрузке фото');
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className={'pt-20'}>
                <div className={'font-bold text-5xl flex w-2/4 mx-auto mb-7'}>Профиль</div>
                <div className={'flex h-56 m-5 border-2 bg-gray-100 rounded-xl mx-auto'} style={{width: '48rem'}}>
                    {name.isUser &&

                        <label htmlFor="upload-photo" className="h-48 w-48 flex items-center justify-center">
                            <div className={'flex flex-col mt-7'}>
                                <div>
                                    <input
                                        type="file"
                                        id="upload-photo"
                                        className="hidden"
                                        onChange={handlePhotoUpload}
                                    />
                                    <img
                                        src={`http://localhost:3000${name.avatar}`}
                                        className="h-44 w-44 rounded-full object-cover"
                                        alt="Uploaded Avatar"
                                    />
                                </div>
                                <div className={'text-xs text-gray-400 text-center'}>
                                    Нажмите чтобы изменить
                                </div>
                            </div>
                        </label>
                    }
                    {!name.isUser &&
                        <img src={`http://localhost:3000${name.avatar}`}
                             className="h-48 w-48 object-cover rounded-full mx-auto my-auto max-h-full max-w-full"/>
                    }
                    <div className={'flex justify-around w-2/3'}>
                        <div className={'flex flex-col mt-6 font-semibold'}>
                            {<p>{name.firstName} {name.lastName}</p>}
                            <p>Birthday: </p>
                            {name.isUser &&
                                <Link to={'/profile/edit'} className={'text-center bg-blue-500 w-56 rounded-md'}>Редактировать
                                    профиль</Link>}
                            {!name.isUser && !follow.isFollow && <button onClick={() => handleSubscribe(id)}
                                                                         className={'bg-blue-500 w-56 rounded-md'}>Подписаться</button>}
                            {!name.isUser && follow.isFollow && <button onClick={() => handleUnsubscribe(id)}
                                                                        className={'bg-blue-500 w-56 rounded-md'}>Отписаться</button>}
                        </div>
                        <div className={'flex flex-col mt-6 font-semibold'}>
                            <Link to={`/subscriptions/list/${id}`}>Подписки: {follow.followsToNum}</Link>
                            <Link to={`/subscribers/list/${id}`}>Подписчики: {follow.followersNum}</Link>
                        </div>
                    </div>
                </div>
                <div className={'card-box flex flex-col justify-center w-2/4 mx-auto'}>
                    {name.isUser && <PostForm setPosts={fetchPosts}/>}
                    <p className={'font-semibold text-2xl mb-5'}>Мои записи</p>
                    {posts && posts.map((el) =>
                            <div key={el.id} className={'flex flex-col text-center mb-5 border-2 bg-gray-50 rounded-xl'}>
                                <PostCard key={el.id} post={el} handleDeletePost={handleDeletePost}/>
                            </div>
                        // <div key={el.id} className={'flex flex-col text-center mb-5 border-2 bg-gray-50 rounded-xl'}>
                        //     <div className={'justify-between flex ml-4 mt-2'}>
                        //         <div className={'flex'}>
                        //             <img src={`http://localhost:3000${name.avatar}`} className={'max-h-12 rounded-full mx-auto mr-5'}/>
                        //             <div className={'flex flex-col'}>
                        //                 <div className={'font-bold'}>{el.firstName} {el.lastName}</div>
                        //                 <div className={'font-light self-start'}>{el.date}</div>
                        //             </div>
                        //         </div>
                        //     </div>
                        //     <div className={'self-start text-left m-4'}>
                        //         {el.text}
                        //     </div>
                        //     {el.photo && (
                        //         <div className={'flex justify-center mb-2'}>
                        //             <img src={`http://localhost:3000${el.photo}`} className={'max-h-96 mx-auto'}/>
                        //         </div>
                        //     )}
                        //     {name.isUser &&
                        //         <button onClick={() => handleDeletePost(el.id)} className={'mr-3 self-end mb-2'}>Удалить
                        //             пост</button>}
                        // </div>
                    )}
                </div>
            </div>
        </>
    );
}
