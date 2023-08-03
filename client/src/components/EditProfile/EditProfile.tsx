import {useEffect, useState} from "react";
import {createLogger} from "vite";

export function EditProfile(): JSX.Element {
    const [data, setData] = useState();
    const [userId, setUserId] = useState();
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: ''});

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(`http://localhost:3000/api/profile/current_user`, {
                    credentials: 'include',
                });
                const user = await response.json();
                console.log(user)
                setUserId(user.userId);
            } catch (error) {
                console.log(error)
            }
        })()
    }, []);

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(`http://localhost:3000/api/profile/${userId}/user`, {
                    credentials: 'include',
                });
                const result = await response.json();
                if (result.formattedData !== undefined) {
                    setData(result.formattedData);
                    setFormData(result.formattedData)
                    console.log(data)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [userId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        try {
            const response = await fetch(`http://localhost:3000/api/profile/edit`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName: formData.firstName, lastName: formData.lastName, email: formData.email }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.status === 200) {
                console.log(data);
        //         setNameButtonType(true);
        //         setIsNameReadOnly(true);
        //         setUser((prevState) => {
        //             return {
        //                 ...prevState,
        //                 name: newName,
        //             };
        //         });
            } else if (response.status === 400) {
                // console.log(data);
            }
        } catch (error) {
            // console.log('Ошибка при обновлении пользователя:', error);
        }
    }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        console.log(formData)
    };

    return (
        <>
            <div className={'pt-10'}>
                <div className={'font-bold text-5xl flex w-2/4 mx-auto'}>Редактирование профиля</div>
                <div className={'card-box flex flex-col justify-center w-2/4 mx-auto'}>
                    {data !== undefined &&
                    <form onSubmit={handleSubmit} className={'flex flex-col mt-5'}>
                        <input name='firstName' value={formData.firstName} onChange={handleChange} className={'h-8 text-xl pl-2'}/>
                        <input name='lastName' value={formData.lastName} onChange={handleChange} className={'mt-3 mb-3 h-8 text-xl pl-2'}/>
                        <input name='email' value={formData.email} onChange={handleChange} className={'mb-3 h-8 text-xl pl-2'}/>
                        <input type='submit' className={'mt-3 mb-3 self-end'}/>
                    </form>}
                </div>
            </div>
        </>
    );
}
