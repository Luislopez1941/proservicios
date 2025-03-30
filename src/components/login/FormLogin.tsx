'use client'

import React, {useState } from 'react'
import './FormLogin.css'
import { storeLogin } from '@/zustand/Login'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import useUserStore from '@/zustand/UserStore'
import { getCookie } from '@/utils/cookie.utility';


interface FormData {
    email: string;
    password: string;
}

export const UserKey = 'user';

const FormLogin: React.FC = () => {
    const router = useRouter()
    const setFormStatus = storeLogin(state => state.setFormStatus)
    const { updateUser } = useUserStore();
               

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let response: any = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json',}, body: JSON.stringify(formData),});
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            
            console.log('Todo bien')
            // Convertir la respuesta a JSON
            const result = await response.json();
            const initialUser = getCookie(UserKey)
            updateUser(initialUser)
            console.log(initialUser)
         
            if(result.status == 'success') {
                toast.success(result.message)
                
                
                setTimeout(() => {
                    router.push('/')
                }, 500);
            } 
            if(result.status == 'warning') {
                return toast.error(result.message);
            }
          
        } catch (error) {
            
        }


    };

    

    return (
        <form className='form__login' onSubmit={handleSubmit}>
            <div className='titles'>
                <div className='title__main'>Iniciar sesión</div>
                <div className='title__warning'>
                    <p>Ingresa para encontrar expertos confiables que llevarán tus proyectos al siguiente nivel.</p>
                </div>
            </div>
            <div><Toaster/></div>
            <div className='form__login_container'>
                <div className='container__inputs'>
                    <div className='inputs__general_icons'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                        <input
                        className='inputs__generic'
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="given-name"
                    />
                    </div>
                </div>
                <div className='container__inputs'>
                    <div className='inputs__general_icons'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-key"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z" /><path d="M15 9h.01" /></svg>
                        <input
                        className='inputs__generic'
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="given-name"
                    />
                    </div>
                </div>   
            </div>
            <div className='btn'>
                <button className='btn__create' onClick={() => setFormStatus(false)} >Iniciar sesion</button>
            </div>
            <div className='btn__change'>
                <button className='btn' type='button' onClick={() => setFormStatus(true)}>Crear cuenta</button>
            </div>
        </form>
    )
}

export default FormLogin
