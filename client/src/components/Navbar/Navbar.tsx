import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export function Navbar(): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const userLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const result = await response.json();
            if (result.status === 200) {
                localStorage.removeItem('userData');
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        setIsLoggedIn(!!userData);
        setUser(userData ? JSON.parse(userData) : null);;
    }, [localStorage.getItem('userData')]);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        setIsLoggedIn(!!userData);
    }, [isLoggedIn]);

    return (
        <>
            <nav className={'bg-blue-300 h-screen w-52 fixed left-0'}>
                <div className={'flex flex-col justify-around items-center h-full text-2xl text-blue-700'}>
                    {isLoggedIn ? (
                        <>
                            <Link to={'/news'}>Новости</Link>
                            <Link to={'/mysubscriptions'}>Мои подписки</Link>
                            <Link to={`/profile/${user.id}`}>Профиль</Link>
                            <Link to={'/login'}>
                                <button onClick={() => userLogout()} className="bg-gray-200 hover:shadow-yellow-100 hover:bg-yellow-100 shadow-md shadow-white/50 ml-3 cursor-pointer rounded-md py-2 px-4 text-md font-medium">
                                    <h4>Выход</h4>
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to={'/news'}>Новости</Link>
                            <Link to={'/login'}>Вход</Link>
                            <Link to={'/registration'}>Регистрация</Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}
