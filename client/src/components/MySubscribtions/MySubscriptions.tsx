import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export function MySubscriptions(): JSX.Element {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(`http://localhost:3000/api/news/mysubscriptions`, {
                    credentials: 'include',
                });
                const result = await response.json();
                setPosts(result.data);
                console.log(posts);
            } catch (error) {
                console.log(error)
            }
        })()
    }, []);

    return (
        <>
            <div className={'pt-10'}>
                <div className={'font-bold mb-7 text-5xl flex w-2/4 mx-auto'}>Мои подписки</div>
                <div className={'card-box flex flex-col justify-center w-2/4 mx-auto'}>
                    {posts && posts.map((el) => (
                        (el.posts && el.posts.map((post) => (
                            <div key={post.postId} className={'flex flex-col text-center mb-7 border-2 rounded-xl bg-blue-100'}>
                                <div className={'self-start ml-4 mt-2 font-bold'}>
                                    <Link to={`/profile/${el.userId}`}>
                                        {el.firstName} {el.lastName}
                                    </Link>
                                </div>
                                <div className={'self-start text-left m-4'}>
                                    {post.text}
                                </div>
                                <div className={'self-end m-4'}>
                                    {post.date}
                                </div>
                            </div>
                        )))
                    ))}
                </div>
            </div>
        </>
    );
}
