
'use client'

import React from 'react'
import './page.css'
import '../../components/Header.css'
import Footer from '@/components/Footer'
import { Wrench, Zap, Search, ChevronDown, Magnet } from 'lucide-react';
import Card from '@/components/general/Card'
import Header from '@/components/Header'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from 'zustand';
import { storeGlobal } from "@/zustand/GlobalVariations";
import APIs from "@/services/APIS";
import Menu from '@/components/Menu'
import FilterWorkers from './FilterWorkers'
import { storeJobs } from '@/zustand/Jobs'
import FilterSearchWorkers from './FilterSearchWorkers'


interface Skill {
  name: string;
}

export interface Customer {
  id: number;
  first_name: string;
  second_name?: string;
  first_surname: string;
  second_last_name?: string;
  country?: string;
  email: string;
  password: string;
  profilePhoto?: string;
  phone: string;
  gender?: string;
  skills?: Skill[];
  starts?: Skill[];
  birthdate?: string;
  dni?: string;
  type_user?: string;
  id_state?: number;
  id_city?: number;
  id_municipality?: number;
}



const Page = () => {

  const storedData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('filter') || '{}') : {};

  const router = useRouter();
  const { data } = useStore(storeGlobal);
  const [page, setPage] = useState<any>(1)
  const [pages, setPages] = useState<any>([])


  const setData = storeGlobal(state => state.setData)
  const [active, setActive] = useState<boolean>(false)
  const setModal = storeJobs(state => state.setModal)

  const setWorkers = storeJobs(state => state.setWorkers)

  const { workers } = storeJobs()

  const fetchData = async () => {
    try {
      setActive(true);

      // Prepara los datos a enviar
      const requestData = data == null ? storedData : data;
      let result = await APIs.getCustomers(requestData);
      setPages(result.totalPages)
      setPage(result.currentPage)
      setWorkers(result.data);

    } catch (error) {
      console.error('Error fetching workers:', error);  // Manejo de errores
    } finally {
      setTimeout(() => {
        setActive(false);  // Desactiva el indicador de carga después de 2 segundos
      }, 2000);
    }
  };
  useEffect(() => {
    if (data && data.type === 'get-user') {
      fetchData();
    } else {
      fetchData();
    }

  }, [data]);


  const openFilter = () => {
    setModal('modal_filter_workers')
  }

  const openSerach = () => {
    setModal('modal_filter_search_workers')
  }

  const previousPage = async () => {
    let data: any = {
      type: 'get-user',
      type_service: storedData.type_service,
      type_location: storedData.type_location,
      page: page <= 1 ? page : page - 1

    }
    let result = await APIs.getCustomers(data);
    setPages(result.totalPages)
    setPage(result.currentPage)
    setWorkers(result.data);
  }

  const nextPage = async () => {
    let data: any = {
      type: 'get-user',
      type_service: storedData.type_service,
      type_location: storedData.type_location,
      page: page + 1
    }
    let result = await APIs.getCustomers(data);
    setPages(result.totalPages)
    setPage(result.currentPage)
    setWorkers(result.data);
  }

  return (
    <AnimatePresence>

      {active ?
        <div className="loading-workers">
          <svg fill="hsl(228, 97%, 42%)" width="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><filter id="spinner-gF01"><feGaussianBlur in="SourceGraphic" stdDeviation="1" result="y" /><feColorMatrix in="y" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="z" /><feBlend in="SourceGraphic" in2="z" /></filter></defs><g filter="url(#spinner-gF01)"><circle cx="5" cy="12" r="4"><animate attributeName="cx" calcMode="spline" dur="2s" values="5;8;5" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite" /></circle><circle cx="19" cy="12" r="4"><animate attributeName="cx" calcMode="spline" dur="2s" values="19;16;19" keySplines=".36,.62,.43,.99;.79,0,.58,.57" repeatCount="indefinite" /></circle><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" /></g></svg>
        </div>
        :
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}

        >
          <div className='workers'>
            <Header />
            <header className='hero__workers'>
              {/* <div className='row__one'>
              </div> */}
              <div className='row__two'>
                <div className='container__search_result' onClick={openSerach}>
                  <p>Buscar...</p>
                  <div className='search'>
                    <Search />
                  </div>
                </div>
                {/* <div onClick={openFilter}>
                  <svg className='filter_icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-120q-17 0-28.5-11.5T440-160v-160q0-17 11.5-28.5T480-360q17 0 28.5 11.5T520-320v40h280q17 0 28.5 11.5T840-240q0 17-11.5 28.5T800-200H520v40q0 17-11.5 28.5T480-120Zm-320-80q-17 0-28.5-11.5T120-240q0-17 11.5-28.5T160-280h160q17 0 28.5 11.5T360-240q0 17-11.5 28.5T320-200H160Zm160-160q-17 0-28.5-11.5T280-400v-40H160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h120v-40q0-17 11.5-28.5T320-600q17 0 28.5 11.5T360-560v160q0 17-11.5 28.5T320-360Zm160-80q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520h320q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H480Zm160-160q-17 0-28.5-11.5T600-640v-160q0-17 11.5-28.5T640-840q17 0 28.5 11.5T680-800v40h120q17 0 28.5 11.5T840-720q0 17-11.5 28.5T800-680H680v40q0 17-11.5 28.5T640-600Zm-480-80q-17 0-28.5-11.5T120-720q0-17 11.5-28.5T160-760h320q17 0 28.5 11.5T520-720q0 17-11.5 28.5T480-680H160Z" /></svg>
                </div> */}
              </div>
              {/* <div className='row__three'>
                <div className='btn__filter'>
                  <p>Filtro avanzado</p>
                  <ChevronDown />
                </div>
              </div> */}
            </header>
            <section className='main__workers'>
              {/* <div className='row__one'>
                <div className='item'>
                  <Wrench style={{ width: '1rem', height: '1rem' }} />
                  <p>Plomeros</p>
                </div>
                <div className='item'>
                  <Zap style={{ width: '1rem', height: '1rem' }} />
                  <p>Electricitas</p>
                </div>
                <div className='item'>
                  <Magnet style={{ width: '1rem', height: '1rem' }} />
                  <p>Herrero</p>
                </div>
                <div className='item'>
                  <p>Soldador</p>
                </div>
                <div className='item'>
                  <p>Jardinero </p>
                </div>
              </div> */}
              <div className='row__three'>
                {workers?.map((item: Customer, index: number) => (
                  <div className='item' key={index}>
                    <Card item={item} route={'/workers/profile'} />
                  </div>
                ))}
              </div>
              <div className='row__pages'>
                <div className='chevron-left' onClick={previousPage}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
                </div>
                <div className='row__pages_container'>
                  {pages.map((x: number, index: number) => (
                    <div className={`${x == page ? 'active' : ''}`} key={index}>{x}</div>
                  ))}
                </div>
                <div className='chevron-right' onClick={nextPage}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                </div>
              </div>
            </section>
            <Footer />
            <FilterWorkers />
            <FilterSearchWorkers />
          </div>
        </motion.div>
      }


    </AnimatePresence>
  )
}

export default Page
