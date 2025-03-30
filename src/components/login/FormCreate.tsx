"use client"

import React, { useState } from 'react'
import { storeLogin } from '@/zustand/Login'
import './FormCreate.css'

interface FormData {
    firstName: string
    lastName: string
    phone: string
    email: string
    password: string
    acceptTerms: boolean
}

const FormCreate: React.FC = () => {
    const setFormStatus = storeLogin((state) => state.setFormStatus)

    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        acceptTerms: false,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            acceptTerms: e.target.checked,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData.acceptTerms) {
            alert("Debes aceptar los términos y condiciones para continuar")
            return
        }
        console.log(formData)
    }

    const handleSocialLogin = (provider: string) => {
        console.log(`Login with ${provider}`)
        // Implement social login logic here
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>Crear cuenta</h2>
                <p>Inicia sesión para ser parte de nuestra comunidad de profesionales.</p>
            </div>

            <div className="social-login">
                <div className='container__buttons'>
                <button className="social-button google-button" onClick={() => handleSocialLogin("google")} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"> <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/> <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /> <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /> <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /> <path d="M1 1h22v22H1z" fill="none" /></svg>
                    <p>Continuar con Google</p>
                </button>
                <button className="social-button apple-button" onClick={() => handleSocialLogin("apple")} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" /> <path d="M10 2c1 .5 2 2 2 5" /> </svg>
                    <p>Continuar con Apple</p>
                </button>
                </div>
                <div className="separator">
                    <span>o</span>
                </div>
            </div>

            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group half">
                        <input
                        className='inputs__general'
                            type="text"
                            name="firstName"
                            placeholder="Primer nombre"
                            value={formData.firstName}
                            onChange={handleChange}
                            autoComplete="given-name"
                            required
                        />
                    </div>
                    <div className="form-group half">
                        <input
                        className='inputs__general'
                            type="text"
                            name="lastName"
                            placeholder="Primer apellido"
                            value={formData.lastName}
                            onChange={handleChange}
                            autoComplete="family-name"
                            required
                        />
                    </div>
                </div>

                

                <div className="form-group">
                    <input
                    className='inputs__general'
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                    className='inputs__general'
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                    className='inputs__general'
                        type="tel"
                        name="phone"
                        placeholder="Número telefónico"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        required
                    />
                </div>

                <div className="form-group checkbox-group">
                    <input
                        type="checkbox"
                        id="terms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms">
                        Acepto los <a href="#">Términos y Condiciones</a> y la <a href="#">Política de Privacidad</a>
                    </label>
                </div>

                <button type="submit" className="submit-button">
                    Crear cuenta
                </button>

                <div className="login-link">
                    <p>
                        ¿Ya tienes una cuenta?{" "}
                        <button type="button" onClick={() => setFormStatus(false)} className="text-link">
                            Iniciar sesión
                        </button>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default FormCreate

