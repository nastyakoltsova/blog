export function Profile(): JSX.Element {
    const posts = [
        {
            id: 1,
            user: 'Bob James',
            text: 'kgkh fghmnl bkdflm n ldghf nbdg nbdzgd bcv dzgdhng bvghd',
            date: '01.01.2023'
        },
        {
            id: 2,
            user: 'Bob James',
            text: 'kgk',
            date: '01.01.2023'
        }
    ]

    const userData = {
        name: 'Bob',
        lastName: 'James',
        birthday: '04.12.2002'

    }

    return (
        <>
            <div className={'pt-10'}>
                <div className={'font-bold text-5xl flex w-2/4 mx-auto'}>Профиль</div>
                <div className={'flex w-2/4 h-56 m-5 border-2 bg-blue-100 rounded-xl mx-auto'}>
                    <div className={'flex w-1/4 h-4/5 m-5 border-2 border-amber-500 bg-blue-500 rounded-xl my-auto'}></div>
                    <div className={'flex justify-around w-2/3'}>
                        <div className={'flex flex-col mt-6 font-semibold'}>
                            <p>{userData.name} {userData.lastName}</p>
                            <p>Birthday: {userData.birthday}</p>
                            <button className={'bg-blue-500 w-56 rounded-md'}>Редактировать профиль</button>
                        </div>
                        <div className={'flex flex-col mt-6 font-semibold'}>
                            <p>Подписки: 332</p>
                            <p>Подписчики: 432</p>
                        </div>
                    </div>
                </div>
                <div className={'card-box flex flex-col justify-center w-2/4 mx-auto'}>
                    <p className={'font-semibold text-2xl mt-5'}>Мои записи</p>
                    {posts && posts.map((el) =>
                        <div className={'flex flex-col text-center mt-5 border-2 bg-blue-100 rounded-xl'}>
                            <div className={'self-start ml-4 mt-2 font-bold'}>
                                {el.user}
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
