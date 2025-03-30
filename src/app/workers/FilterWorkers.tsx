"use client"

import React, { useEffect, useState } from 'react'
import { storeJobs } from '@/zustand/Jobs'
import './styles/FilterWorkers.css'

import useUserStore from '@/zustand/UserStore';


interface UserInfo {
    id: number;
    name: string;
    email: string;
    typeUser: string;
    token: string;

};

interface Skills {
    id: number,
    name: string
}


const FilterWorkers = ({ job }: any) => {
    const userState = useUserStore(state => state.user);
    const userGlobal: UserInfo = userState;
    const [jobs, setJobs] = useState<any>([])
    const user: any = userState;

    const { modal }: any = storeJobs()

    const setModal = storeJobs(state => state.setModal)



    const closeModal = () => {
        setModal('')
    }

    const sendMessage = async () => {

    };

    const [skills, setSkills] = useState<any>([])


    const fetch = async () => {
        try {
            // let response = await APIs.getJobs('', skills, user.id_municipality)
            setJobs([])
        } catch (error) {

        }

    }

    useEffect(() => {
        fetch()
    }, [])

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

    useEffect(() => {

    }, [skills])



    const [selectedServices, setSelectedServices] = useState<Skills | undefined>(undefined);
    const [selectServices, setSelectServices] = useState<boolean>(false);

    const openSelectServices = () => setSelectServices((prev) => !prev);

    const handleServicesChange = (service: Skills) => {
        setSelectedServices(service);
        setSelectServices(false);
        setSkills([...skills, service])
        console.log('service', service)
    };

    const [job_title, setJob_title] = useState<any>(null)

    const [id_municipality, setId_municipality] = useState<any>(null)

    const search = async () => {
        setModal('modal_filter_search_workers')

    }

    console.log('jobs', jobs)

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchTermLenght, setSearchTermLenght] = useState('');

    const [resultLocalities, setResultLocalities] = useState<any>([])

    const handleSearch = async () => {
        // Llamada a la API o lógica de búsqueda aquí
        // let response = await APIs.searchMunicipalities(searchTerm)
        setResultLocalities([])


    };

    useEffect(() => {
        handleSearch()
    }, [searchTerm])

    console.log('user', user)

    const addLocalities = (x: any) => {
        setId_municipality(x.id)
        setSearchTerm(x.name)
        setSearchTermLenght('')
    }

    const handleSearchChnage = (e: any) => {
        setSearchTerm(e.target.value)
        setSearchTermLenght(e.target.value)
    }


    return (
        <div className={`overlay__modal_filter_workers ${modal == 'modal_filter_workers' ? 'active' : ''}`}>
            <div className={`popup__modal_filter_workers ${modal == 'modal_filter_workers' ? 'active' : ''}`}>
                <div className='header__modal'>
                    <a href="#" className="btn-cerrar-popup__modal_filter_workers" onClick={closeModal}>
                        <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </a>
                    {/* <p className='title__modals'>Filtro</p> */}
                </div>
                <div className='modal_filter_searches'>
                    <div className='search'>
                        <div className='container__inputs'>
                            <div className='input'>
                                <div className='input_container'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 2a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3h2v-1a3 3 0 0 1 3 -3zm0 2h-4a1 1 0 0 0 -1 1v1h6v-1a1 1 0 0 0 -1 -1" /></svg>
                                </div>
                                <input className='inputs__general' value={job_title} onChange={(e) => setJob_title(e.target.value)} type="text" placeholder='Buscar' />
                            </div>
                            {/* <div className={`input_container_main ${searchTermLenght.length > 0 ? 'localities' : ''}`}>
                                <div className={`input two `}>
                                    <div className='input_container'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                                    </div>
                                    <input className={`inputs__general `} value={searchTerm} onChange={(e) => handleSearchChnage(e)} type="text" placeholder='Ubicacion' />
                                    <div className={`container__result_localities ${searchTermLenght.length > 0 ? 'active' : ''}`}>
                                        {(resultLocalities && Array.isArray(resultLocalities)) ? (
                                            resultLocalities.map((x: any) => (
                                                <div className='options__localities_container'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-location"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20.891 2.006l.106 -.006l.13 .008l.09 .016l.123 .035l.107 .046l.1 .057l.09 .067l.082 .075l.052 .059l.082 .116l.052 .096c.047 .1 .077 .206 .09 .316l.005 .106c0 .075 -.008 .149 -.024 .22l-.035 .123l-6.532 18.077a1.55 1.55 0 0 1 -1.409 .903a1.547 1.547 0 0 1 -1.329 -.747l-.065 -.127l-3.352 -6.702l-6.67 -3.336a1.55 1.55 0 0 1 -.898 -1.259l-.006 -.149c0 -.56 .301 -1.072 .841 -1.37l.14 -.07l18.017 -6.506l.106 -.03l.108 -.018z" /></svg>
                                                    <p key={x.id} onClick={() => addLocalities(x)}>{x.name}</p>
                                                </div>
                                            ))
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className='filter__select'>
                        <div className='input'>
                            <div className='input_container'>
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
                            </div>
                            <input className='inputs__general' value={job_title} onChange={(e) => setJob_title(e.target.value)} type="text" placeholder='Plomero, electricista, etc' />
                        </div>
                    </div>
                    <div>
                        <div className='btn_search' onClick={search}>
                            <p className='text'>Buscar</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FilterWorkers
