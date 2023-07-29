import {useEffect, useState} from "react";
import {PostForm} from "../FormNews/FormNews";
import fetchPosts from "../Profile/Profile"

export function News(): JSX.Element {
    const [posts, setPosts] = useState([]);

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

    return (
        <>
            <div className={'pt-10'}>
                <div className={'font-bold text-5xl flex w-2/4 mx-auto'}>Новости</div>
                <PostForm setPosts={fetchPosts}/>
                <div className={'card-box flex flex-col justify-center w-2/4 mx-auto'}>
                    {posts && posts.map((el) =>
                        <div key={el.id} className={'flex flex-col text-center mt-5 border-2 bg-blue-100 rounded-xl'}>
                            <div className={'self-start ml-4 mt-2 font-bold'}>
                                <p>{el.firstName} {el.lastName}</p>
                            </div>
                            <div className={'self-start text-left m-4'}>
                                {el.text}
                            </div>
                            <div className={'self-end mr-4 font-light'}>
                                {el.date}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}
