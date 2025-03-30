import React, { useEffect, useState } from 'react'
import './ModalPostJob.css'
import { storeSJobs } from '@/zustand/sections/Searches/Jobs';
import { useDropzone } from 'react-dropzone';
import { ArrowUpFromLine, MapPin } from 'lucide-react';
import APIs from '@/services/APIS';
import Swal from 'sweetalert2';
import useUserStore from '@/zustand/UserStore';

interface FormData {
    title: string
    description: string
    phone: string
    email: string
    password: string
    id_state: number | null
    id_locality: number | null
    id_municipality: number | null
    acceptTerms: boolean
}

interface State {
    id: number
    name: string
}

interface City {
    id: number
    name: string
    id_state: number
}

interface Municipality {
    id: number;
    name: string;
    id_locality: number;
    type: string;
}

interface UserInfo {
    id: number;
    name: string;
    email: string;
    typeUser: string;
    token: string;

};



const ModalAddJob = () => {
    const { modal }: any = storeSJobs()
    const userState = useUserStore(state => state.user);
    const userGlobal: UserInfo = userState;

    const [data, setData] = useState<any>({
        id_user: userGlobal.id, 
        title: '',
        description: '',
        location: '',
        professions: [{ id: 1, name: 'Plomero' }, { id: 2, name: 'Electricista' }],
        photos: [],
        id_state: null,
        id_municipality: null,
        id_locality: null
    })
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setData((prev: any) => ({
                        ...prev,
                        photos: [...prev.photos, base64String]
                    }));
                    console.log('Imagen 1 en base64:', base64String);
                };
                reader.readAsDataURL(file);
            }
        }
    });

    const [next, setNext] = useState<number>(0)
    const [selectState, setSelectState] = useState<boolean>(false)
    const [states, setStates] = useState<State[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [municipalities, setMunicipalities] = useState<Municipality[]>([])

    const fetchStates = async () => {
        try {
            const resultStates: any = (await APIs.getStates()) as State[]
            setStates(resultStates.data)
        } catch (error) {
            console.error("Error fetching states:", error)
        }
    }

    useEffect(() => {
        fetchStates()
    }, [])


    ////////////////////////////State//////////////////////////////////////////

    const handleStatesChange = async (state: State) => {
        setData((prevFormData: any) => ({
            ...prevFormData,
            id_state: state.id,
        }))
        try {
            const result: any = (await APIs.getMunicipalities(state.id)) as Municipality[]
            setMunicipalities(result.data)
        } catch (error) {
            console.error("Error fetching cities:", error)
        }
        setSelectState(false)
    }
    const openSelectStore = () => {
        setSelectState(!selectState)
    }




    ////////////////////////////Municipality//////////////////////////////////////////

    const [selectMunicipality, setSelectMunicipality] = useState<boolean>(false)
    const [localities, setLocalities] = useState<any>()

    const openSelectMunicipality = () => {
        setSelectMunicipality((prev) => !prev)
    }


    const handleMunicipalityChange = async (municipality: Municipality) => {
        setData((prevFormData: any) => ({
            ...prevFormData,
            id_municipality: municipality.id,
        }))

        try {
            const result: any = (await APIs.getLocalities(municipality.id)) as Municipality[]
            setLocalities(result.data)
        } catch (error) {
            console.error("Error fetching cities:", error)
        }
        setSelectMunicipality(false)
    }



    ///////////////////////////////Locality/////////////////////////////////////////

    const [selectLocality, setSelectLocality] = useState<boolean>(false)

    const openSelectLocalities = () => {
        setSelectLocality((prev) => !prev)
    }

    const handleLocalitiesChange = async (locality: City) => {
        setData((prevFormData: any) => ({
            ...prevFormData,
            id_locality: locality.id,
        }))

        setSelectLocality(false)
    }




    const [typesServices, setTypesServices] = useState<any>([])
    const [typeService, setTypeService] = useState<any>(null)
    const [sendTypeService, setSendTypeService] = useState<any>()
    const [searchTypeServiceLenght, setSearchTypeServiceLenght] = useState('');

    const handleSearchTypeServiceChange = async (e: any) => {
        setTypeService(e.target.value)
        setSearchTypeServiceLenght(e.target.value)
        let response = await APIs.searchSkills(e.target.value)
        setTypesServices(response.data)
    }

    const addTypeService = (x: any) => {
        setData((prev: any) => ({
            ...prev,
            professions: [...data.professions, x]
        }))
        setTypeService(x.name)
        setSearchTypeServiceLenght('')
        setSendTypeService(x)
    }


    console.log('typesServices', typesServices)

    const setModal = storeSJobs(state => state.setModal)

    const createJob = async () => {
        try {
            // Intenta crear el trabajo
            await APIs.createJob(data);

            // Si se crea correctamente, muestra un mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Trabajo creado con éxito',
                text: 'El trabajo ha sido creado correctamente.',
                confirmButtonText: 'Aceptar'
            });
        } catch (error) {
            // Si ocurre un error, muestra un mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al crear el trabajo. Inténtalo nuevamente.',
                confirmButtonText: 'Aceptar'
            });
        }
    };


    return (
        <div className={`overlay__modal_add_job ${modal == 'modal_add_job' ? 'active' : ''}`}>
            <div className={`popup__modal_add_job ${modal == 'modal_add_job' ? 'active' : ''}`}>


                <div className='modal_add_job'>
                    <div className='header__modal'>
                        <a href="#" className="btn-cerrar-popup__modal_add_job" onClick={() => setModal('')}>
                            <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </a>
                        <p className='title__modals'>Crear nuevo trabajo</p>
                    </div>
                    <div className='modal_add_job_container'>
                        <div className='row__one'>
                            <div className='input'>
                                <input className='inputs__general' type="text" placeholder='Título de trabajo' value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })}
                                />
                            </div>
                            <div className='input'>
                                <input className='inputs__general' type="text" placeholder='Descripción' value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
                            </div>
                        </div>
                        <div className='row__seven'>
                            <div className="select__container">
                                <div className="select-btn__general">
                                    <div className={`select-btn ${selectState ? "active" : ""}`} onClick={openSelectStore}>
                                        <MapPin strokeWidth={1.5} />
                                        <div>
                                            <p>
                                                {data.id_state ? states.find((s) => s.id === data.id_state)?.name : "Selecciona"}
                                            </p>
                                            <svg className="chevron__down" fill="#6c6c6e" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" > <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /> </svg>
                                        </div>
                                    </div>
                                    <div className={`content ${selectState ? "active" : ""}`}>
                                        <ul
                                            className={`options ${selectState ? "active" : ""}`}
                                            style={{ opacity: selectState ? "1" : "0" }}
                                        >
                                            {states?.map((state) => (
                                                <li key={state.id} onClick={() => handleStatesChange(state)}>
                                                    {state.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="select__container my-4">
                                <div className="select-btn__general">
                                    <div className={`select-btn ${selectMunicipality ? "active" : ""}`} onClick={openSelectMunicipality}>
                                        <MapPin strokeWidth={1.5} />
                                        <div>
                                            <p>{data.id_municipality ? municipalities.find((s) => s.id === data.id_municipality)?.name : "Ciudad"}</p>
                                            <svg className="chevron__down" fill="#6c6c6e" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" > <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /> </svg>
                                        </div>
                                    </div>
                                    <div className={`content ${selectMunicipality ? "active" : ""}`}>
                                        <ul
                                            className={`options ${selectMunicipality ? "active" : ""}`}
                                            style={{ opacity: selectMunicipality ? "1" : "0" }}
                                        >
                                            {municipalities?.map((municipality: any) => (
                                                <li key={municipality.id} onClick={() => handleMunicipalityChange(municipality)}>
                                                    {municipality.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="select__container">
                                <div className="select-btn__general">
                                    <div className={`select-btn ${selectLocality ? "active" : ""}`} onClick={openSelectLocalities} >
                                        <MapPin strokeWidth={1.5} />
                                        <div>
                                            <p>
                                                {data.id_locality ? localities?.find((s: any) => s.id === data.id_locality)?.name : "Localidad"}
                                            </p>
                                            <svg className="chevron__down" fill="#6c6c6e" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" > <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /> </svg>
                                        </div>
                                    </div>
                                    <div className={`content ${selectLocality ? "active" : ""}`}>
                                        <ul className={`options ${selectLocality ? "active" : ""}`} style={{ opacity: selectLocality ? "1" : "0" }} >
                                            {localities?.map((locality: any) => (
                                                <li key={locality.id} onClick={() => handleLocalitiesChange(locality)}>
                                                    {locality.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row__two'>
                            <div className='input'>
                                <input className='inputs__general' type="text" placeholder='Ubicación' value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} />
                            </div>
                            <div className="upload__image">
                                <div className="upload-container" {...getRootProps()}>
                                    <ArrowUpFromLine className="icon" />
                                    <input {...getInputProps()} />
                                </div>
                            </div>
                        </div>
                        <div className='row__three'>
                            <div className={`photos-container ${data.photos.length > 0 ? 'active' : ''}`}>
                                {data.photos.length > 0 ? (
                                    data.photos.map((x: any, index: any) => (
                                        <div key={index} className="photo" style={{ backgroundImage: `url("${x}")` }}></div>
                                    ))
                                ) : (
                                    <p className="loading-text">No hay fotos que mostrar</p>
                                )}
                            </div>
                        </div>
                        <div className='row__four'>
                            <p>Tipo de profesional</p>
                            <div className='container__search_professional'>
                                <div className='input'>
                                    <input className='inputs__general' type="text" value={typeService} onChange={handleSearchTypeServiceChange} placeholder='Buscar' />
                                </div>
                                <div className={`container__result_type-services ${searchTypeServiceLenght.length > 0 ? 'active' : ''}`}>
                                    {(typesServices && Array.isArray(typesServices)) ? (
                                        typesServices.map((x: any) => (
                                            <div className='options__professional_container'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-location"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20.891 2.006l.106 -.006l.13 .008l.09 .016l.123 .035l.107 .046l.1 .057l.09 .067l.082 .075l.052 .059l.082 .116l.052 .096c.047 .1 .077 .206 .09 .316l.005 .106c0 .075 -.008 .149 -.024 .22l-.035 .123l-6.532 18.077a1.55 1.55 0 0 1 -1.409 .903a1.547 1.547 0 0 1 -1.329 -.747l-.065 -.127l-3.352 -6.702l-6.67 -3.336a1.55 1.55 0 0 1 -.898 -1.259l-.006 -.149c0 -.56 .301 -1.072 .841 -1.37l.14 -.07l18.017 -6.506l.106 -.03l.108 -.018z" /></svg>
                                                <p key={x.id} onClick={() => addTypeService(x)}>{x.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        ''
                                    )}
                                </div>

                            </div>
                        </div>
                        <div className='row__five'>
                            <div className='items'>
                                {data?.professions.map((x: any) => (
                                    <div className='item'>
                                        <p>{x.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='row__six'>
                        <button className='btn_create' onClick={createJob}>Crear trabajo</button>
                    </div>
                </div>
            </div>

        </div>
        //////////// ESTADO MENTAL (OUTRO) ////////////// => ESLABON ARMADO
    )
}

export default ModalAddJob
