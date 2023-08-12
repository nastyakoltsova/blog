import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

interface subscriptionsData {
    userId: number,
    avatar: string,
    firstName: string,
    lastName: string
}

export function ListOfSubscriptions(): JSX.Element {
    const {id} = useParams();
    const [subscriptions, setSubscriptions] = useState<subscriptionsData[]>([]);

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(`http://localhost:3000/api/followings/list/subscriptions/${id}`, {
                    credentials: 'include',
                });
                const result = await response.json();
                setSubscriptions(result.users);
            } catch (error) {
                console.log(error)
            }
        })()
    }, []);

    return (
        <>
            <div className={'pt-20'}>
                <div className={'font-bold mb-7 text-5xl flex w-2/4 mx-auto'}>Подписки</div>
                <div className={'card-box flex flex-col justify-center w-2/4 mx-auto'}>
                    {subscriptions && subscriptions.map((el) => (
                        <div key={el.userId} className={'flex text-center mb-3 h-16 border-2 rounded-md bg-blue-100'}>
                            <div className="flex items-center">
                                <img src={`http://localhost:3000${el.avatar}`} className="max-h-12 rounded-full mx-auto ml-5" />
                                <div className={'ml-4 text-lg font-bold'}>
                                    <Link to={`/profile/${el.userId}`}>
                                        {el.firstName} {el.lastName}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        ))}
                </div>
            </div>
        </>
    );
}
