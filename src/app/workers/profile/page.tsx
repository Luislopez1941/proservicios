"use client";


import React, { useEffect, useState } from 'react'
import './Profile.css'
import { User } from 'lucide-react';
import Link from 'next/link';
import APIs from '@/services/APIS';
import useUserStore from '@/zustand/UserStore';
import { storeWorkers } from '@/zustand/Workers';

interface UserInfo {
  id: number;
  name: string;
  email: string;
  typeUser: string;
  token: string;

};

interface UserData {
  first_name: string;
  second_name: String;
  first_surname: string;
  second_last_name: string;
  background: string;
  profilePhoto: string;
  typeUser: string;
  skills: []
  phone: string;
  email: string;
  password: string;
  workPhotos: any;
  description: string
}


const Profile = () => {
  const userState = useUserStore(state => state.user);
  const userGlobal: UserInfo = userState;

  const { dataUser }: any = storeWorkers()

  const [user, setUser] = useState<UserData>()



  const getUser = async () => {
    try {
      let data: any = {
        id: dataUser.id,
        typeUser: dataUser.type_user
      }
      let result: any = await APIs.getUser(data);

      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser()

  }, [])

  console.log(user)

  return (
    <div className="user__profile">
      <div className='backgorund-profile' style={{ backgroundImage: user?.background ? `url(${user?.background})` : 'none' }}>

      </div>
      <div className="row__one">
        <div className="left">

          <div className='profile-information__container'>
            <div className='left'>
              <div className="img__container">
                {user?.profilePhoto ?
                  <div className='user-true' style={{ backgroundImage: `url(${user?.profilePhoto})` }}>
                  </div>
                  :
                  <div className='user-false'>
                    <User strokeWidth={1.25} />
                  </div>
                }
              </div>
              <div className='name__conatiner'>
                <p className='name'>{user?.first_name} {user?.second_name} {user?.first_surname} {user?.second_last_name}</p>
              </div>


              <div className='description'>
                <p>{user?.description}</p>
              </div>
              <div className='skills__container'>
                {user?.skills?.map((x: any) => (
                  <p>{x.name}</p>
                ))}
              </div>

            </div>
            <div className="about">
              <div className='about__container'>
                <div className='options__profile'>
                  <li>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
                      (7.8)
                    </div>
                    Calificaciones
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-briefcase-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 2a3 3 0 0 1 3 3v1h2a3 3 0 0 1 3 3v9a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3h2v-1a3 3 0 0 1 3 -3zm0 2h-4a1 1 0 0 0 -1 1v1h6v-1a1 1 0 0 0 -1 -1" /></svg>
                    Trabajos
                  </li>
                  <Link href={'/messages/chat'}>
                    <div className='bell'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#3F7DC0" className="icon icon-tabler icons-tabler-filled icon-tabler-message-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5.821 4.91c3.899 -2.765 9.468 -2.539 13.073 .535c3.667 3.129 4.168 8.238 1.152 11.898c-2.841 3.447 -7.965 4.583 -12.231 2.805l-.233 -.101l-4.374 .931l-.04 .006l-.035 .007h-.018l-.022 .005h-.038l-.033 .004l-.021 -.001l-.023 .001l-.033 -.003h-.035l-.022 -.004l-.022 -.002l-.035 -.007l-.034 -.005l-.016 -.004l-.024 -.005l-.049 -.016l-.024 -.005l-.011 -.005l-.022 -.007l-.045 -.02l-.03 -.012l-.011 -.006l-.014 -.006l-.031 -.018l-.045 -.024l-.016 -.011l-.037 -.026l-.04 -.027l-.002 -.004l-.013 -.009l-.043 -.04l-.025 -.02l-.006 -.007l-.056 -.062l-.013 -.014l-.011 -.014l-.039 -.056l-.014 -.019l-.005 -.01l-.042 -.073l-.007 -.012l-.004 -.008l-.007 -.012l-.014 -.038l-.02 -.042l-.004 -.016l-.004 -.01l-.017 -.061l-.007 -.018l-.002 -.015l-.005 -.019l-.005 -.033l-.008 -.042l-.002 -.031l-.003 -.01v-.016l-.004 -.054l.001 -.036l.001 -.023l.002 -.053l.004 -.025v-.019l.008 -.035l.005 -.034l.005 -.02l.004 -.02l.018 -.06l.003 -.013l1.15 -3.45l-.022 -.037c-2.21 -3.747 -1.209 -8.391 2.413 -11.119z" /></svg>
                      {/* Enviar mensaje */}
                    </div>
                  </Link>

                </div>
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
              {user?.workPhotos.length > 0 ? (
                user?.workPhotos.map((x: string, index: number) => (
                  <div key={index} className="photos" style={{ backgroundImage: `url("${x}")` }}>
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

export default Profile
