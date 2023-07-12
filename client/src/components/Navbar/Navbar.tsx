import {Link} from "react-router-dom";

export function Navbar(): JSX.Element {
    return (
        <>
            <nav className={'bg-blue-300 h-14'}>
                <div className={'flex justify-around items-center h-full text-2xl text-blue-700'}>
                    <Link to={'/login'}>Вход</Link>
                    <Link to={'/registration'}>Регистрация</Link>
                    <Link to={'/'}>Новости</Link>
                </div>
            </nav>
        </>
    );
}
