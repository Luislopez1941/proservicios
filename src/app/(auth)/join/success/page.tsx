import React from 'react'
import './page.css'
import Link from 'next/link'

const Page = () => {
  return (
    <div className='success'>
      <div className='success__container'>
        <div className='success__message'>
          <div className='container-check'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l5 5l10 -10" /></svg>
          </div>
          <h1>¡Registro Exitoso!</h1>
          <p>Aquí tienes algunas sugerencias para empezar:</p>
          <ul>
            <li>Completa tu perfil para recibir recomendaciones personalizadas.</li>
          </ul>
          <button className='btn-login'>
            <Link href='/login'>
              Iniciar Sesión
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
