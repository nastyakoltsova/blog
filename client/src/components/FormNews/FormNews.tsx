import React, {useState} from 'react';

export function PostForm({setPosts}) {
    const [text, setText] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', text);
        formData.append('photo', photo);
        try {
            const response = await fetch('http://localhost:3000/api/news/new', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            setPosts(data.posts);
        } catch (error) {
            console.error(error);
        }

    };
    return (
        <form onSubmit={handleSubmit} className={'mt-2'}>
            <div className={'flex flex-col h-48 items-start content-start'}>
        <textarea
            className={'w-full h-28 p-2 resize-none border-2 rounded-md'}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Что у вас нового?'
        />
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className={'mt-0.5'}
                    />
                    <div className={'self-end mt-2 ml-auto'}>
                        <button type="submit" className={'text-white bg-blue-500 px-4 py-2 rounded-md'}>
                            Опубликовать
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

