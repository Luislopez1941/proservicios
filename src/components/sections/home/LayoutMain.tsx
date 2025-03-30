"use client";

import React, { useEffect, useState } from 'react';
import './LayoutMain.css';
import { Search, MapPin } from 'lucide-react';
import APIs from '@/services/APIS';
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from 'zustand';
import { storeGlobal } from '@/zustand/GlobalVariations';



interface State {
    id: number;
    name: string;
}

interface Localities {
    id: number;
    name: string;
    id_city: number; // si las ciudades tienen una relación con un estado
}

interface Municipality {
    id: number;
    name: string;
    id_state: number;
    // si los municipios tienen una relación con una ciudad
}

const LayoutMain = () => {
    const [selectState, setSelectState] = useState<boolean>(false);
    const [selectedState, setSelectedState] = useState<number | null>(null);
    const router = useRouter();
    const setData = storeGlobal(state => state.setData)
    const { data } = useStore(storeGlobal);
    const [states, setStates] = useState<State[]>([])
    const [localities, setLocalities] = useState<Localities[]>([])
    const [municipality, setMunicipality] = useState<Municipality[]>([])


    const fetch = async () => {
        try {
            let resultStates = (await APIs.getStates()) as State[];
            console.log(resultStates)
            setStates(resultStates)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetch()
    }, [])

   
    const [selectedlocality, setSelectedLocality] = useState<number | null>(null); // Specify the type


    const [selectedMunicipality, setSelectedMunicipality] = useState<number | null>(null);






    const searchUser = () => {
        let data = {
            type: 'get-user',
            type_service: typeService.id,
            type_location: typeLocation,
            page: 1
        };

        setData(data);
        localStorage.setItem('filter', JSON.stringify(data));  // Aquí se usa JSON.stringify
        router.push('/workers');
    };

    const [locations, setLocations] = useState<any>([])

    const [searchLocation, setSearchLocation] = useState<string>('');
    const [searchLocationLenghtCT, setSearchLocationLenghtCT] = useState<string>('')
    const [typeLocation, setTypeLocation] = useState<any>()

    const addLocation = (x: any) => {
        setSearchLocation(x.name)
        setTypeLocation(x)
        setSearchLocationLenghtCT('')
    }

    const handleSearchLocationChange = async (e: any) => {
        setSearchLocation(e.target.value)
        setSearchLocationLenghtCT(e.target.value)

        let response: any = await APIs.getLocationsSearch(e.target.value)
        console.log('response', response)
        setLocations(response.data)
     

    }


    const [searchTermCT, setSearchTermCT] = useState<string>('');
    const [searchTermLenghtCT, setSearchTermLenghtCT] = useState<string>('')

    const [resultCategorySearch, setResultCategorySearch] = useState<any>([])

    const [typeService, setTypeService] = useState<any>()

    const addCategorySearch = (x: any) => {
        setSearchTermCT(x.name)
        setTypeService(x)
        setSearchTermLenghtCT('')
    }

    const handleCategorySearchChange = async (e: any) => {
        setSearchTermCT(e.target.value)
        setSearchTermLenghtCT(e.target.value)

        let response: any = await APIs.searchSkills(e.target.value)
        setResultCategorySearch(response.data)
     

    }




console.log(locations)

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className='layout'>
                    <div className='layout__container'>
                        <div className='text__search'>
                            <div>
                                <p className='text__main'>Donde buscar un servicio es Fácil y Seguro</p>
                            </div>
                            <div className='warning'>
                                <p>
                                    Revisa la calificación de los trabajadores para asegurar un trabajo de calidad
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-shield-half"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.998 2l.032 .002l.086 .005a1 1 0 0 1 .342 .104l.105 .062l.097 .076l.016 .015l.247 .21a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.791 -2.75l.046 -.036l.053 -.041a1 1 0 0 1 .217 -.112l.075 -.023l.036 -.01a1 1 0 0 1 .12 -.022l.086 -.005zm.002 2.296l-.176 .135a13 13 0 0 1 -7.288 2.572l-.264 .006l-.064 .31a11 11 0 0 0 1.064 7.175l.17 .314a11 11 0 0 0 6.49 5.136l.068 .019z" /></svg>
                                </p>
                            </div>
                        </div>
                        <div className='search'>
                            <div className='row__one'>
                                <div>
                                    <div className={`input_container_main ${searchTermLenghtCT.length > 0 ? 'profession' : ''}`}>
                                        <div className='inputs__general_icons'>
                                            <div className='input__container'>
                                                <Search className='icon-left' strokeWidth={1.75} />
                                                <input className='inputs__generic' value={searchTermCT} onChange={(e) => handleCategorySearchChange(e)} type="text" placeholder='Buscar' />
                                            </div>
                                            <div className={`container__result_profession_search ${searchTermLenghtCT.length > 0 ? 'active' : ''}`}>
                                                {(resultCategorySearch && Array.isArray(resultCategorySearch)) ? (
                                                    resultCategorySearch.map((x: any) => (
                                                        <div className='options__profession_search'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg>
                                                            <p key={x.id} onClick={() => addCategorySearch(x)}>{x.name}</p>
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
                                    <div className={`input_container_main ${searchLocationLenghtCT.length > 0 ? 'profession' : ''}`}>
                                        <div className='inputs__general_icons'>
                                            <div className='input__container'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>

                                                <input className='inputs__generic' value={searchLocation} onChange={(e) => handleSearchLocationChange(e)} type="text" placeholder='Buscar' />
                                            </div>
                                            <div className={`container__result_profession_search ${searchLocationLenghtCT.length > 0 ? 'active' : ''}`}>
                                                {(locations && Array.isArray(locations)) ? (
                                                    locations.map((x: any) => (
                                                        <div className='options__profession_search'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                                                            <p key={x.id} onClick={() => addLocation(x)}>{x.name}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='btn-search'>
                                    <button className='btn' onClick={searchUser}>
                                        Buscar
                                        <Search strokeWidth={1.75} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LayoutMain;
