"use client"

import React, { useState } from 'react'
import './Income.css'
import { StringifyOptions } from 'querystring'
import { storeIncome } from '@/zustand/Income'
import ModalAddJob from './jobs/modalAddJob/ModalAddJob'
import Rents from './rents/Rents'
import Jobs from './jobs/Jobs'
import Sales from './sales/Sales'

const Income = () => {

    

    const [sectionsStatus, setSectionsStatus] = useState<string>('income')
    const statusChange = (value: string) => {
        setSectionsStatus(value)
    }

    return (
        <div className='income__container'>
            <div className='nav'>
                <div className='conatiner__nav'>
                    <div className='item' onClick={() => statusChange('income')}>
                        <p>Rentas</p>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-520q150 0 255-47t105-113q0-66-105-113t-255-47q-150 0-255 47T120-680q0 66 105 113t255 47Zm0 100q41 0 102.5-8.5T701-456q57-19 98-49.5t41-74.5v100q0 44-41 74.5T701-356q-57 19-118.5 27.5T480-320q-41 0-102.5-8.5T259-356q-57-19-98-49.5T120-480v-100q0 44 41 74.5t98 49.5q57 19 118.5 27.5T480-420Zm0 200q41 0 102.5-8.5T701-256q57-19 98-49.5t41-74.5v100q0 44-41 74.5T701-156q-57 19-118.5 27.5T480-120q-41 0-102.5-8.5T259-156q-57-19-98-49.5T120-280v-100q0 44 41 74.5t98 49.5q57 19 118.5 27.5T480-220Z" /></svg>
                    </div>
                    <div className='item' onClick={() => statusChange('sales')}>
                        <p>ventas</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-tag"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.172 2a3 3 0 0 1 2.121 .879l7.71 7.71a3.41 3.41 0 0 1 0 4.822l-5.592 5.592a3.41 3.41 0 0 1 -4.822 0l-7.71 -7.71a3 3 0 0 1 -.879 -2.121v-5.172a4 4 0 0 1 4 -4zm-3.672 3.5a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2" /></svg>
                    </div>
                    <div className='item' onClick={() => statusChange('jobs')}>
                        <p>Trabajos</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 2a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3h2v-1a3 3 0 0 1 3 -3zm0 2h-4a1 1 0 0 0 -1 1v1h6v-1a1 1 0 0 0 -1 -1" /></svg>
                    </div>
                </div>
            </div>
            <div className={`income ${sectionsStatus == 'income' ? 'active' : ''}`}>
                <Rents />
            </div>
            <div className={`sales ${sectionsStatus == 'sales' ? 'active' : ''}`}>
                <Sales />
            </div>
            <div className={`jobs ${sectionsStatus == 'jobs' ? 'active' : ''}`}>
                <Jobs />
            </div>
            <ModalAddJob />
        </div>
    )
}

export default Income
