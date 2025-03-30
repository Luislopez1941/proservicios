"use client"

import React, { useEffect, useState } from 'react'
import { storeJobs } from '@/zustand/Jobs'
import './styles/FilterSearchWorkers.css'

import useUserStore from '@/zustand/UserStore';
import APIs from '@/services/APIS';


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


const FilterSearchWorkers = ({ job }: any) => {
    const userState = useUserStore(state => state.user);
    const userGlobal: UserInfo = userState;
    const [jobs, setJobs] = useState<any>([])
    const user: any = userState;

    const { modal }: any = storeJobs()

    const setModal = storeJobs(state => state.setModal)
    const setWorkers = storeJobs(state => state.setWorkers)

    const closeModal = () => {
        setModal('')
    }

    const [skills, setSkills] = useState<any>([])

    useEffect(() => {

    }, [skills])


    const [selectServices, setSelectServices] = useState<boolean>(false);

    const openSelectServices = () => setSelectServices((prev) => !prev);


    const search = async () => {
        try {
            let data: any = {
                type: 'get-user',
                type_service: sendTypeService.id,
                type_location: sendLocation
            };
            try {
                let result = await APIs.getCustomers(data);
                setWorkers(result);
                setModal('')
            } catch (error) {
                console.log('Hubo un error' ,error)
            }


        } catch (error) {

        }

    }

    console.log('jobs', jobs)


    const [typesServices, setTypesServices] = useState<any>([])
    const [typeService, setTypeService] = useState<any>(null)
    const [sendTypeService, setSendTypeService] = useState<any>()
    const [searchTypeServiceLenght, setSearchTypeServiceLenght] = useState('');

    const handleSearchTypeServiceChange = async (e: any) => {
        setTypeService(e.target.value)
        setSearchTypeServiceLenght(e.target.value)
        let response = await APIs.searchSkills(e.target.value)
        setTypesServices(response)
    }

    const addTypeService = (x: any) => {
        setTypeService(x.name)
        setSearchTypeServiceLenght('')
        setSendTypeService(x)
    }
    useEffect(() => {

    }, [typeService])


    ////////////////////////////////////Localities//////////////////////////////////////
    const [localities, setLocalities] = useState<any>([])
    const [locality, setLocality] = useState<any>(null)
    const [sendLocation, setSendsendLocation] = useState<any>()
    const [localityLenght, setlocalityLenght] = useState('');

    const handleLocalityChange = async (e: any) => {
        setLocality(e.target.value)
        setlocalityLenght(e.target.value)
        let response = await APIs.getLocationsSearch(e.target.value)
        console.log('response', response)
        setLocalities(response)
    }

    const addLocality = (x: any) => {
        setLocality(x.name)
        setSendsendLocation(x)
        setlocalityLenght('')
    }
    useEffect(() => {

    }, [locality])


    console.log('searchTypeServiceLenght', searchTypeServiceLenght)

    return (
        <div className={`overlay__modal_filter_search_workers ${modal == 'modal_filter_search_workers' ? 'active' : ''}`}>
            <div className={`popup__modal_filter_search_workers ${modal == 'modal_filter_search_workers' ? 'active' : ''}`}>
                <div className='header__modal'>
                    <a href="#" className="btn-cerrar-popup__modal_filter_search_workers" onClick={closeModal}>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
                                </div>
                                <input className='inputs__general' value={typeService} onChange={handleSearchTypeServiceChange} type="text" placeholder='Buscar' />
                            </div>
                            <div className={`input_container_main ${searchTypeServiceLenght.length > 0 ? 'services' : ''}`}>
                                {/* <div className={`input two `}> */}
                                {/* <div className='input_container'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                                    </div>
                                    <input className={`inputs__general `} value={typeService} onChange={(e) => handleSearchTypeServiceChange(e)} type="text" placeholder='Ubicacion' /> */}
                                <div className={`container__result_type-services ${searchTypeServiceLenght.length > 0 ? 'active' : ''}`}>
                                    {(typesServices && Array.isArray(typesServices)) ? (
                                        typesServices.map((x: any) => (
                                            <div className='options__localities_container'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-location"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20.891 2.006l.106 -.006l.13 .008l.09 .016l.123 .035l.107 .046l.1 .057l.09 .067l.082 .075l.052 .059l.082 .116l.052 .096c.047 .1 .077 .206 .09 .316l.005 .106c0 .075 -.008 .149 -.024 .22l-.035 .123l-6.532 18.077a1.55 1.55 0 0 1 -1.409 .903a1.547 1.547 0 0 1 -1.329 -.747l-.065 -.127l-3.352 -6.702l-6.67 -3.336a1.55 1.55 0 0 1 -.898 -1.259l-.006 -.149c0 -.56 .301 -1.072 .841 -1.37l.14 -.07l18.017 -6.506l.106 -.03l.108 -.018z" /></svg>
                                                <p key={x.id} onClick={() => addTypeService(x)}>{x.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        ''
                                    )}
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='search'>
                        <div className='container__inputs'>
                            <div className='input'>
                                <div className='input_container'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                                </div>
                                <input className='inputs__general' value={locality} onChange={handleLocalityChange} type="text" placeholder='Buscar' />
                            </div>
                            <div className={`input_container_main ${localityLenght.length > 0 ? 'localities' : ''}`}>
                                {/* <div className={`input two `}> */}
                                {/* <div className='input_container'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                                    </div>
                                    <input className={`inputs__general `} value={locality} onChange={(e) => handleLocalityChnage(e)} type="text" placeholder='Ubicacion' /> */}
                                <div className={`container__result_localities ${localityLenght.length > 0 ? 'active' : ''}`}>
                                    {(localities && Array.isArray(localities)) ? (
                                        localities.map((x: any) => (
                                            <div className='options__localities_container'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-location"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20.891 2.006l.106 -.006l.13 .008l.09 .016l.123 .035l.107 .046l.1 .057l.09 .067l.082 .075l.052 .059l.082 .116l.052 .096c.047 .1 .077 .206 .09 .316l.005 .106c0 .075 -.008 .149 -.024 .22l-.035 .123l-6.532 18.077a1.55 1.55 0 0 1 -1.409 .903a1.547 1.547 0 0 1 -1.329 -.747l-.065 -.127l-3.352 -6.702l-6.67 -3.336a1.55 1.55 0 0 1 -.898 -1.259l-.006 -.149c0 -.56 .301 -1.072 .841 -1.37l.14 -.07l18.017 -6.506l.106 -.03l.108 -.018z" /></svg>
                                                <p key={x.id} onClick={() => addLocality(x)}>{x.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        ''
                                    )}
                                </div>
                                {/* </div> */}
                            </div>
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

export default FilterSearchWorkers
