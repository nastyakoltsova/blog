import React, { useState, ChangeEvent, FormEvent } from 'react';
// @ts-ignore
import { Icon } from 'react-icons-kit';
// @ts-ignore
import { ic_add_a_photo } from 'react-icons-kit/md';
import {PostData} from '../News/News'

interface PostFormProps {
    setPosts: (posts: PostData) => void;
}

export function PostForm({ setPosts }: PostFormProps): JSX.Element {
    const [text, setText] = useState<string>('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<string | null>(null);

    const generateThumbnail = (file: File) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setThumbnail(reader.result as string);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', text);
        if (photo) {
            formData.append('photo', photo);
        }
        try {
            const response = await fetch('http://localhost:3000/api/news/new', {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const data = await response.json();
            setPosts(data.posts);
            setText('');
            setPhoto(null);
            setThumbnail(null);
            const inputFile = document.getElementById('photo-input') as HTMLInputElement;
            inputFile.value = '';
        } catch (error) {
            console.error(error);
        }
    };

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setPhoto(file);
            generateThumbnail(file);
        }
    };

    const PhotoIcon = ({ onClick }: { onClick: () => void }) => (
        <div onClick={onClick} className={'ml-3'}>
            {thumbnail ? (
                <img src={thumbnail} alt="Thumbnail" width={24} height={24} />
            ) : (
                <Icon icon={ic_add_a_photo} size={24} />
            )}
        </div>
    );

    const handleIconClick = () => {
        const inputFile = document.getElementById('photo-input') as HTMLInputElement;
        inputFile.click();
    };

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
                    <PhotoIcon onClick={handleIconClick} />
                    <input
                        id="photo-input"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className={'hidden'}
                    />
                    <div className={'self-end mt-2 ml-auto'}>
                        <button type="submit" className={'text-white bg-blue-300 hover:bg-blue-400 px-4 py-2 mr-3 mb-2 rounded-md'}>
                            Опубликовать
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
