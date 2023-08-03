import React, {useState} from 'react';

export function PostForm({setPosts}) {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/news/new', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({text}),
                headers: {'Content-Type': 'application/json'},
            });
            const data = await response.json();
            console.log(data);
            setPosts(data.posts);
        } catch (error) {
            console.error(error);
        }
        setText('');
    };
    return (
        <form onSubmit={handleSubmit} className={'mt-2'}>
            <div className={'flex flex-col h-32 items-start content-start'}>
                <textarea
                    className={'w-full h-full p-2 resize-none border-2 rounded-md'}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Что у вас нового?'
                />
                <div className={'flex self-end mt-2'}>
                    <button type="submit" className={'text-white bg-blue-500 px-4 py-2 rounded-md'}>
                        Опубликовать
                    </button>
                </div>
            </div>
        </form>
    );
}

