import {Link} from "react-router-dom";

export function Navbar(): JSX.Element {
    return (
        <>
            <nav className={'bg-blue-300 h-screen w-52 fixed left-0'}>
                <div className={'flex flex-col justify-around items-center h-full text-2xl text-blue-700'}>
                    <Link to={'/login'}>Вход</Link>
                    <Link to={'/registration'}>Регистрация</Link>
                    <Link to={'/news'}>Новости</Link>
                    <Link to={'/mysubscriptions'}>Мои подписки</Link>
                    <Link to={'/profile'}>Профиль</Link>
                    <Link to={'#'}>Выход</Link>
                </div>
            </nav>
        </>
    );
}
