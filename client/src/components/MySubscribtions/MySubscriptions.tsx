export function MySubscriptions(): JSX.Element {
    const posts = [
        {
            id: 1,
            user: 'Bob',
            text: 'kgkh kxdlfkmgnxld fghmnl bkdflm n ldghf nbdg nbdzgd bcv dzgdhng bvghd',
            date: '01.01.2023'
        },
        {
            id: 2,
            user: 'Bill',
            text: 'kgkh kxdlfkmgnxld',
            date: '01.01.2023'
        },
        {
            id: 3,
            user: 'Ben',
            text: 'kgkh fghmnl bkdflm n ldghf nbdg nbdzgd bcv dzgdhng bvghd',
            date: '01.01.2023'
        },
        {
            id: 4,
            user: 'Broke',
            text: 'kgkh fghmnl bkdflm n ldghf nbdg nbdzgd bcv dzgdhng bvghd kgkh fghmnl bkdflm n ldghf nbdg nbdzgd bcv ' +
                'dzgdhng bvghd kgkh fghmnl bkdflm n ldghf nbdg nbdzgd bcv dzgdhng bvghd kgkh fghmnl bkdflm n ldghf nbdg ' +
                'nbdzgd bcv dzgdhng bvghd kgkh fghmnl bkdflm n ldghf nbdg nbdzgd bcv dzgdhng bvghd',
            date: '01.01.2023'
        },

    ]
    return (
        <>
            <div className={'pt-10'}>
                <div className={'font-bold text-5xl flex w-2/4 mx-auto'}>Мои подписки</div>
                <div className={'card-box flex flex-col justify-center w-2/4 mx-auto'}>
                    {posts && posts.map((el) =>
                        <div className={'flex flex-col text-center mt-5 border-2 rounded-xl bg-blue-100'}>
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
