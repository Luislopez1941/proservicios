"use client";


import React, { useEffect, useState } from 'react'
import './Configurations.css'

import Link from 'next/link';
import APIs from '@/services/APIS';
import useUserStore from '@/zustand/UserStore';


interface UserInfo {
    id: number;
    name: string;
    email: string;
    typeUser: string;
    token: string;

};

interface UserData {
    first_name: string;
    second_name: String;
    first_surname: string;
    second_last_name: string;
    background: string;
    profilePhoto: string;
    typeUser: string;
    skills: []
    phone: string;
    email: string;
    password: string;
    workPhotos: any;
    description: string
}


const Configurations = () => {
    const userState = useUserStore(state => state.user);
    const userGlobal: UserInfo = userState;

    console.log('userGlobal', userGlobal)

    const { updateUser } = useUserStore();
    const resetUser = useUserStore(state => state.resetUser);

    const [user, setUser] = useState<UserData>()

    const getUser = async () => {
        try {
            let result: any = await APIs.getUser(userGlobal) as UserData;
            console.log('user', user)
            setUser(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser()

    }, [])

    
    console.log('userGlobal', userGlobal)

    const logout = () => {
        updateUser({})
        resetUser();
    }

    


    return (
        <div className="configurations">
            {userGlobal.email ?
                <div className='configurations__container'>
                    <div className='row__one'>
                        <div className='row__one'>
                            Luis Lopez
                        </div>
                        <Link href={'/configurations/profile'}>
                            <div className='circle__profil'>
                                <svg xmlns="http://www.w3.org/2000/svg" width='17' height="17" fill="#d4d4d4" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" /></svg>
                            </div>
                        </Link>
                    </div>
                    <div className='row__two'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#d4d4d4"><path d="M433-80q-27 0-46.5-18T363-142l-9-66q-13-5-24.5-12T307-235l-62 26q-25 11-50 2t-39-32l-47-82q-14-23-8-49t27-43l53-40q-1-7-1-13.5v-27q0-6.5 1-13.5l-53-40q-21-17-27-43t8-49l47-82q14-23 39-32t50 2l62 26q11-8 23-15t24-12l9-66q4-26 23.5-44t46.5-18h94q27 0 46.5 18t23.5 44l9 66q13 5 24.5 12t22.5 15l62-26q25-11 50-2t39 32l47 82q14 23 8 49t-27 43l-53 40q1 7 1 13.5v27q0 6.5-2 13.5l53 40q21 17 27 43t-8 49l-48 82q-14 23-39 32t-50-2l-60-26q-11 8-23 15t-24 12l-9 66q-4 26-23.5 44T527-80h-94Zm49-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z" /></svg>
                            <p>Configuración</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#d4d4d4" className="icon icon-tabler icons-tabler-filled icon-tabler-graph"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12zm-2.293 6.293a1 1 0 0 0 -1.414 0l-2.293 2.292l-1.293 -1.292a1 1 0 0 0 -1.414 0l-3 3a1 1 0 0 0 0 1.414l.094 .083a1 1 0 0 0 1.32 -.083l2.293 -2.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -.083l2.293 -2.292l1.293 1.292a1 1 0 0 0 1.414 -1.414l-2 -2z" /></svg>
                            <p>Tablero de ingresos</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="#d4d4d4"><path d="M760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120ZM240-400h480v-80H240v80Zm0 120h480v-60H240v60Z" /></svg>
                            <p>Mis publicaciones</p>
                        </div>
                    </div>
                    <div className='row__three'>
                        <button className='btn__close' type='button' onClick={logout}>Cerrar sesion</button>
                    </div>
                </div>
                :
                <div className='profile__container-login' >
                    <a className='btn__login' href={'/login'}>Iniciar sesion</a>
                </div>

            }
        </div>
    )
}

export default Configurations
