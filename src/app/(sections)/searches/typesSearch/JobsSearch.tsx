import React, { useEffect, useState } from 'react'
import useUserStore from '@/zustand/UserStore';
import { storeJobs } from '@/zustand/Jobs';
import './JobsSearch.css'
import { storeSJobs } from '@/zustand/sections/Searches/Jobs';
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


const JobsSearch = () => {
    const userState = useUserStore(state => state.user);
    const userGlobal: UserInfo = userState;
    const user: any = userState;

    const setSearchTermLenght: any = storeSJobs((state) => state.setSearchTermLenght)
    const setSearchLenghtTypeP: any = storeSJobs((state) => state.setSearchLenghtTypeP)
    const setModal = storeJobs(state => state.setModal)
    
    const setData: any = storeSJobs((state) => state.setData)
    const setJobs: any = storeSJobs((state) => state.setJobs)
    const { searchTermLenght, searchLenghtTypeP, data } = storeSJobs()


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

    const addLocalities = (x: any) => {
        setData({
            location_name: x.name,
            location:x
        })
        setSearchTermLenght('')
    }

    const [locations, setLocations] = useState<any>([])

    const handleInputChange = async (e: any) => {
        const value = e.target.value
        setSearchTermLenght(value)
        setData({location_name: value})

        
        let response: any = await APIs.getLocationsSearch(e.target.value)
        console.log('response', response)
        setLocations(response.data)
    }

    const [profesional, setProfessional] = useState<any>([])

    const handleTypeProfessionChange = async (e: any) => {
        const value = e.target.value
        setSearchLenghtTypeP(value)
        setData({profession_name: value})
        

        let response: any = await APIs.searchSkills(value)
        console.log('response', response)
        setProfessional(response.data)

    }

    const addTypeProfessional = (x: any) => {
        setData({profession_name: x.name, professions: [...data.professions, x]})
        setSearchLenghtTypeP('')
    }



    const search = async () => {
        try {
            let response = await APIs.getJobs(data)
            setJobs(response.data)
            setModal('')
        } catch (error) {
            
        }
    }


    return (
        <div className='job__search_filter'>

            <div className='row__one'>
                <div className={`container__input ${searchTermLenght.length > 0 ? 'localities' : ''}`}>
                    <div className='input'>
                        <div className='icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                        </div>
                        <input className='inputs__generic' value={data.location_name} onChange={(e) => handleInputChange(e)} type="text" placeholder='Buscar' />
                    </div>
                    <div className={`input_container_main ${searchTermLenght.length > 0 ? 'localities' : ''}`}>
                        <div className={`container__result_localities `}>
                            {(locations && Array.isArray(locations)) ? (
                                locations.map((x: any) => (
                                    <div className='options__localities_container'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-location"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20.891 2.006l.106 -.006l.13 .008l.09 .016l.123 .035l.107 .046l.1 .057l.09 .067l.082 .075l.052 .059l.082 .116l.052 .096c.047 .1 .077 .206 .09 .316l.005 .106c0 .075 -.008 .149 -.024 .22l-.035 .123l-6.532 18.077a1.55 1.55 0 0 1 -1.409 .903a1.547 1.547 0 0 1 -1.329 -.747l-.065 -.127l-3.352 -6.702l-6.67 -3.336a1.55 1.55 0 0 1 -.898 -1.259l-.006 -.149c0 -.56 .301 -1.072 .841 -1.37l.14 -.07l18.017 -6.506l.106 -.03l.108 -.018z" /></svg>
                                        <p key={x.id} onClick={() => addLocalities(x)}>{x.name}</p>
                                    </div>
                                ))
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
                <div className={`container__input ${searchLenghtTypeP.length > 0 ? 'type_profession' : ''}`}>
                    <div className='input'>
                        <div className='icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
                        </div>
                        <input className='inputs__generic' value={data.profession_name} onChange={(e) => handleTypeProfessionChange(e)} type="text" placeholder='Buscar' />
                    </div>
                    <div className={`input_container_main ${searchLenghtTypeP.length > 0 ? 'type_profession' : ''}`}>
                        <div className={`container__result_localities `}>
                            {(profesional && Array.isArray(profesional)) ? (
                                profesional.map((x: any) => (
                                    <div className='options__localities_container'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-location"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20.891 2.006l.106 -.006l.13 .008l.09 .016l.123 .035l.107 .046l.1 .057l.09 .067l.082 .075l.052 .059l.082 .116l.052 .096c.047 .1 .077 .206 .09 .316l.005 .106c0 .075 -.008 .149 -.024 .22l-.035 .123l-6.532 18.077a1.55 1.55 0 0 1 -1.409 .903a1.547 1.547 0 0 1 -1.329 -.747l-.065 -.127l-3.352 -6.702l-6.67 -3.336a1.55 1.55 0 0 1 -.898 -1.259l-.006 -.149c0 -.56 .301 -1.072 .841 -1.37l.14 -.07l18.017 -6.506l.106 -.03l.108 -.018z" /></svg>
                                        <p key={x.id} onClick={() => addTypeProfessional(x)}>{x.name}</p>
                                    </div>
                                ))
                            ) : (
                                ''
                            )}
                        </div>
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
    )
}

export default JobsSearch
