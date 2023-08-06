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
                console.log(posts)
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
                <div className={'font-bold text-5xl flex w-2/4 mx-auto mb-5'}>Новости</div>
                <div className={'card-box flex flex-col justify-center w-2/4 mx-auto'}>
                    <div className={'mb-5'}>
                        <PostForm setPosts={fetchPosts}/>
                    </div>
                    {posts && posts.map((el) =>
                        <div key={el.id} className={'flex flex-col text-center mb-5 border-2 bg-blue-100 rounded-xl'}>
                            <div className={'self-start ml-4 mt-2 font-bold'}>
                                <Link to={`../profile/${el.userId}`}>{el.firstName} {el.lastName}</Link>
                            </div>
                            <div className={'self-start text-left m-4'}>
                                {el.text}
                            </div>
                            <div className={'self-end mr-4 font-light'}>
                                {el.date}
                            </div>
                            {el.photo && (
                                <div className={'flex justify-center'}>
                                    <img src={`http://localhost:3000${el.photo}`} className={'max-h-96 mx-auto'}/>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}
