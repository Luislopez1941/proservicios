'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import './page.css'
import useUserStore from '@/zustand/UserStore'
import { storeJobs } from '@/zustand/Jobs'
import CardDomesticWork from './cards/CardDomesticWork'
import jobJson from './CardJobs.json'
import FilterSearches from './FilterSearches'
import { storeSJobs } from '@/zustand/sections/Searches/Jobs'
import { data } from 'framer-motion/client'


interface Skills {
    id: number,
    name: string
}

const page = () => {

    const userState = useUserStore(state => state.user);
    const user: any = userState;
    const { typeSearch, jobs, data }: any = storeSJobs()

    const setModal = storeJobs(state => state.setModal)

    console.log('dataaaaaaaaa', data)


    const edit = () => {

        setModal('modal__filter_searches')
    }

    return (
        <div className='searches'>
            <Header />
            <div className='filter'>
                <div className='container__result'>
                    <div className='item'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon_svg icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                        <p>{data.location_name ? data.location_name : 'Ubicacion'}</p>
                    </div>
                    <div className='item'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon_svg icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                        <p>{data.profession_name ? data.profession_name : 'Profesion' }</p>
                    </div>
                    <div className='item' onClick={edit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                    </div>
                </div>
            </div>
            {typeSearch == 1 ?
                <div className='main__container'>
                    <div className='cards__job'>
                        {jobs?.map((x: any) => (
                            <CardDomesticWork job={x} />
                        ))}
                    </div>
                </div>
                :
                ''
            }
            {typeSearch == 2 ?
                ''
                :
                ''
            }

            <Menu />
            <FilterSearches />
        </div>
    )
}

export default page
