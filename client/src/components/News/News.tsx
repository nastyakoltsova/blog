import {useEffect, useState} from "react";
import {PostForm} from "../FormNews/FormNews";
import {Link} from "react-router-dom";

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

    return (
        <>
            <div className={'pt-10'}>
                <div className={'font-bold text-5xl flex w-2/4 mx-auto'}>Новости</div>
                <div className={'card-box flex flex-col justify-center w-2/4 mx-auto'}>
                    <PostForm setPosts={fetchPosts}/>
                    {posts && posts.map((el) =>
                        <div key={el.id} className={'flex flex-col text-center mt-5 border-2 bg-blue-100 rounded-xl'}>
                            <div className={'self-start ml-4 mt-2 font-bold'}>
                                <Link to={`../profile/${el.userId}`}>{el.firstName} {el.lastName}</Link>
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
