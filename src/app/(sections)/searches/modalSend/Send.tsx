import React, { useEffect, useState } from 'react'
import { storeJobs } from '@/zustand/Jobs'
import './Send.css'

import APIs from '@/services/APIS';
import Swal from 'sweetalert2'
import useUserStore from '@/zustand/UserStore';


interface UserInfo {
    id: number;
    name: string;
    email: string;
    typeUser: string;
    token: string;

};

const Send = ({job}: any) => {
    const userState = useUserStore(state => state.user);
    const userGlobal: UserInfo = userState;

    const { modal }: any = storeJobs()

    const setModal = storeJobs(state => state.setModal)
    


    const closeModal = () => {
        setModal('')
    }

    const sendMessage = async () => {
        const data = {
            userId: userGlobal.id,
            content: job.job_description,
            id_employer: job.id_user
        };

        try {
            let response = await APIs.createMessage(data);

            // Si la respuesta es exitosa

            Swal.fire({
                icon: 'success',
                title: 'Mensaje enviado',
                text: 'Tu mensaje ha sido enviado correctamente.',
            });

        } catch (error) {
            // En caso de error en la solicitud
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo enviar el mensaje. Intenta de nuevo más tarde.',
            });
        }
    };


    return (
        <div className={`overlay__modal_send ${modal == 'modal-send' ? 'active' : ''}`}>
            <div className={`popup__modal_send ${modal == 'modal-send' ? 'active' : ''}`}>
                <div className='header__modal'>
                    <a href="#" className="btn-cerrar-popup__modal_send" onClick={closeModal}>
                        <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </a>
                    <p className='title__modals'>Crear una oferta</p>
                </div>
                <div>
                    Se guro que quieres enviar una oferta?
                    <button onClick={sendMessage}>Enviar oferta</button>
                </div>
            </div>

        </div>
    )
}

export default Send
