import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

export function ListOfSubscriptions(): JSX.Element {
    const {id} = useParams();
    const [subscriptions, setSubscriptions] = useState([]);

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
            <div className={'pt-10'}>
                <div className={'font-bold mb-7 text-5xl flex w-2/4 mx-auto'}>Подписки</div>
                <div className={'card-box flex flex-col justify-center w-2/4 mx-auto'}>
                    {subscriptions && subscriptions.map((el) => (
                        <div key={el.userId}
                             className={'flex flex-col text-center mb-7 border-2 rounded-md bg-blue-100'}>
                            <div className={'self-start ml-4 mt-2 font-bold'}>
                                <Link to={`/profile/${el.userId}`}>
                                    {el.firstName} {el.lastName}
                                </Link>
                            </div>
                        </div>
                        ))}
                </div>
            </div>
        </>
    );
}
