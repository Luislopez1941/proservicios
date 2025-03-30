"use client"

import React, { useRef, useState, ChangeEvent, useEffect } from 'react'
import './EditProfile.css'
import Image from 'next/image'
import userImg from '../../../assets/img/user.jpeg'
import { ArrowUpFromLine } from 'lucide-react';
import APIs from '@/services/APIS'
import useUserStore from '@/zustand/UserStore'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone';

const services = [
  { id: 1, name: 'Plomero' },
  { id: 2, name: 'Electricista' },
  { id: 3, name: 'Carpintero' },
  { id: 4, name: 'Jardinero' },
  { id: 5, name: 'Pintor' },
  { id: 6, name: 'Albañil' },
  { id: 7, name: 'Gasfitter' },
  { id: 8, name: 'Servicio de limpieza' },
  { id: 9, name: 'Montador de muebles' },
  { id: 10, name: 'Reparador de electrodomésticos' },
];

interface Skills {
  id: number,
  name: string
}


interface Skill {
  name: string; // Define la habilidad con un nombre
}

// Define un tipo que es un arreglo de habilidades

// Interfaz para los datos de actualización del usuario
interface UpdateUserData {
  id: any; // ID del usuario
  type: string; // Tipo de usuario
  profilePhoto: string;
  background: string; // Ruta de la imagen de perfil
  description?: string;
  workPhotos: any; // Descripción del usuario (opcional)
  professions: any; // Arreglo de habilidades
}

interface UserInfo {
  id: number;
  name: string;
  email: string;
  typeUser: string;
  token: string;

};




const EditProfile = () => {
  const [professions, setProfessions] = useState<any>([]);

  const [imageBase64_1, setImageBase64_1] = useState<string | null>(null);
  const [imageBase64_2, setImageBase64_2] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);

  const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setImageBase64_1(base64String); // Guardamos la cadena base64 para la primera imagen
          console.log('Imagen 1 en base64:', base64String);
        };
        reader.readAsDataURL(file);
      }
    }
  });

  console.log('professions', professions)

  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setImageBase64_2(base64String); // Guardamos la cadena base64 para la segunda imagen
          console.log('Imagen 2 en base64:', base64String);
        };
        reader.readAsDataURL(file);
      }
    }
  });


  const { getRootProps: getRootProps3, getInputProps: getInputProps3 } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setPhotos([...photos, base64String]); // Guardamos la cadena base64 para la segunda imagen
        };
        reader.readAsDataURL(file);
      }
    }
  });

  const userState = useUserStore(state => state.user);
  const userGlobal: UserInfo = userState;

  const [user, setUser] = useState<any>()

  const [description, setDescription] = useState<string>()

  const getUser = async () => {
    try {
      
      let result: any = await APIs.getUser(userGlobal);
      setUser(result.data);
      setDescription(result.data.description)
      setImageBase64_2(result.data.profilePhoto)
      // setPhotos(result.workPhotos)
      setProfessions(result.data.professions)
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user)

  useEffect(() => {
    getUser()

  }, [])

  console.log(photos)



  const [selectedServices, setSelectedServices] = useState<Skills | undefined>(undefined);
  const [selectServices, setSelectServices] = useState<boolean>(false);

  const openSelectServices = () => setSelectServices((prev) => !prev);

  const handleServicesChange = (service: Skills) => {
    setSelectedServices(service);
    setSelectServices(false); // Cerrar el select al seleccionar un servicio
  };

  const handleAddSkill = () => {
    if (selectedServices) {  // Aseguramos que selectedServices no sea undefined
      let find = professions.find((x: { id: number }) => x.id == selectedServices.id);
      if (!find) {
        setProfessions([...professions, selectedServices]);  // Solo si selectedServices está definido
        setSelectedServices(undefined);
      }
    } else {
      console.log('selectedServices is undefined');
    }
  };


  const handleRemoveSkill = (index: number) => {
    setProfessions(professions.filter((_: any, i: number) => i !== index));

  };




  const router = useRouter();

  const update = async () => {
    // Crear el objeto de datos
    let data: any = {
      id: userGlobal.id,
      type: userGlobal.typeUser,
      profilePhoto: imageBase64_2, // Asegúrate de que `selectedImage` es Base64
      background: imageBase64_1 || '',
      workPhotos: photos,  // Si tienes fondo, reemplaza esta cadena vacía con el valor adecuado
      description: description,
      professions: professions
    };

    try {
      // Llamar a la API para actualizar el usuario
      await APIs.updateUser(data);

      // Notificar éxito
      toast.success('Usuario actualizado exitosamente');

      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push('/user/profile');
      }, 2000);

    } catch (error) {
      // Manejo de errores: mostrar el error
      console.error('Error al actualizar el usuario:', error);
      toast.error('Hubo un problema al actualizar tu perfil. Intenta de nuevo.');
    }
  };




  const clickPhotos = () => {

  }


  return (
    <div className="user__profile_update">
      <Toaster richColors position="top-right" />
      <div className='backgorund-profile' style={{ backgroundImage: imageBase64_1 ? `url(${imageBase64_1})` : 'none' }}>
        <div className='field__button-background' {...getRootProps1()} >
          <input {...getInputProps1()} />
          <p>Imagen aquí</p>
        </div>
      </div>
      <div className="row__one">
        <div className="left">
          <div className='profile-information__container'>
            <div className='left'>
              <div className="img__container">
                <div className="user-false" {...getRootProps2()} style={{
                  cursor: 'pointer',
                  backgroundImage: imageBase64_2 ? `url(${imageBase64_2})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                  <ArrowUpFromLine strokeWidth={1.25} />
                </div>
                <input {...getInputProps2()} />
              </div>
              <div className='name__conatiner'>
                <p className='name'>{user?.first_name} {user?.first_surname}</p>
              </div>

              <div className='description'>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='textarea__general' placeholder='Descripción'></textarea>
              </div>
              <div className="skills__container">
                <div className='add'>
                  <div className='select__container'>
                    <div className='select-btn__general'>
                      <div className={`select-btn ${selectServices ? 'active' : ''}`} onClick={openSelectServices}>
                        <div>
                          <p>{selectedServices ? selectedServices.name : 'Selecciona'}</p>
                          <svg className='chevron__down' fill='#6c6c6e' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </div>
                      </div>
                      <div className={`content ${selectServices ? 'active' : ''}`}>
                        <ul className={`options ${selectServices ? 'active' : ''}`} style={{ opacity: selectServices ? '1' : '0' }}>
                          {services.map((service) => (
                            <li key={service.id} onClick={() => handleServicesChange(service)}>
                              {service.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleAddSkill} className="add-skill-button">
                    Agregar
                  </button>
                </div>
                <div className="skills-add">
                  {professions?.map((x: Skills, index: number) => (
                    <div key={index} className="skill-item">
                      <span>{x.name}</span>
                      <button onClick={() => handleRemoveSkill(index)} className="remove-skill-button">X</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="about">
              <div className='about__container'>
                <div className='btn__edit_container'>
                  <div>
                    <button className='btn__general-purple' onClick={update}>Guardar perfil</button>
                  </div>
                </div>
                {/* <div className='options__profile'>
                  <li>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
                      (7.8)
                    </div>
                    Calificaciones
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
                    Enviar mensaje
                  </li>
                </div> */}
              </div>
            </div>
          </div>
          <div className='image__portfolio'>
            <div className='tags'>
              <a>
                <p>Trabajos</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /></svg>
              </a>
              <a>
                <p>Opiniones</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
              </a>
            </div>
            <div className='image__portfolio_container'>
              <div className='upload__image' {...getRootProps3()}>
                <ArrowUpFromLine strokeWidth={1.25} />
                <input {...getInputProps3()} />
              </div>
              {photos.length > 0 ? (
                photos.map((x, index) => (
                    <div key={index} className="photos__update" style={{ backgroundImage: `url("${x}")` }}> 
                    </div>
                  
                ))
              ) : (
                <p>Cargando fotos...</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default EditProfile
