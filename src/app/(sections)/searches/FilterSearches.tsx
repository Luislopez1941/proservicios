import React, { useEffect, useState } from 'react'
import { storeJobs } from '@/zustand/Jobs'
import './styles/FilterSearches.css'
import useUserStore from '@/zustand/UserStore';
import JobsSearch from './typesSearch/JobsSearch';
import { storeSJobs } from '@/zustand/sections/Searches/Jobs';

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


const FilterSearches = () => {

    const userState = useUserStore(state => state.user);
    const userGlobal: UserInfo = userState;

    const user: any = userState;

    const { modal }: any = storeJobs()
    const setTypeSearch = storeSJobs(state => state.setTypeSearch)
    const { searchTermLenght, searchLenghtTypeP, typeSearch }: any = storeSJobs()
    const setModal = storeJobs(state => state.setModal)



    const closeModal = () => {
        setModal('')
    }

    const type = (value: number) => {
      
        setTypeSearch(value)


    }

    return (
        <div className={`overlay__modal_filter_searches  ${modal == 'modal__filter_searches' ? 'active' : ''}`}>
            <div className={`popup__modal_filter_searches ${searchTermLenght.length > 0 || searchLenghtTypeP.length > 0 ? 'search' : ''} ${modal == 'modal__filter_searches' ? 'active' : ''}`}>
                <div className='header__modal'>
                    <a href="#" className="btn-cerrar-popup__modal_filter_searches" onClick={closeModal}>
                        <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </a>
                </div>
                <div className='modal_filter_searches'>
                    <div className='nav__main__searches'>
                        <p className='item' onClick={() => type(1)}>Trabajos</p>
                        <p className='item' onClick={() => type(2)}>Casas</p>
                        <p className='item' onClick={() => type(3)}>Articulos</p>
                    </div>
                    {typeSearch == 1 ?
                        <JobsSearch />
                        :
                        ''
                    }
                    {typeSearch == 2 ?
                        ''

                        :
                        ''
                    }
                    {typeSearch == 3 ?
                        ''
                        :
                        ''
                    }

                </div>
            </div>

        </div>
    )
}

export default FilterSearches
