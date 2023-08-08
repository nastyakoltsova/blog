import React, {useState} from 'react';
import {Icon} from 'react-icons-kit';
import {ic_add_a_photo} from 'react-icons-kit/md';

export function PostForm({setPosts}) {
    const [text, setText] = useState('');
    const [photo, setPhoto] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    const generateThumbnail = (file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setThumbnail(reader.result);
        };

        reader.readAsDataURL(file);
    };


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

            setText('');
            setPhoto(null);
            setThumbnail(null);
            const inputFile = document.getElementById('photo-input');
            inputFile.value = '';
        } catch (error) {
            console.error(error);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);

        if (file) {
            generateThumbnail(file);
        }
    };


    const PhotoIcon = ({onClick}) => (
        <div onClick={onClick} className={'ml-3'}>
            {thumbnail ? (
                <img src={thumbnail} alt="Thumbnail" width={24} height={24}/>
            ) : (
                <Icon icon={ic_add_a_photo} size={24}/>
            )}
        </div>
    );

    const handleIconClick = () => {
        const inputFile = document.getElementById('photo-input');
        inputFile.click();
    }

    return (
        <div className={'mt-2 border-2 rounded-sm w-full bg-gray-100'}>
            <form onSubmit={handleSubmit} className={'mt-2'}>
                <div className={'flex flex-col h-48'}>
                    <textarea
                        className={'flex justify-center h-28 p-2 ml-3 mr-3 resize-none border-2 rounded-md'}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Что у вас нового?'
                    />
                    <PhotoIcon onClick={handleIconClick}/>
                    <input
                        id="photo-input"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className={'hidden'}
                    />
                    <div className={'self-end mt-2 ml-auto'}>
                        <button type="submit" className={'text-white bg-blue-500 px-4 py-2 mr-3 mb-2 rounded-md'}>
                            Опубликовать
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
