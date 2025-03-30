"use client";


import React, { useEffect, useState } from 'react'

import APIs from '@/services/APIS';
import useUserStore from '@/zustand/UserStore';
import Menu from '@/components/Menu';
import Header from '@/components/Header';
import Configurations from '@/components/sections/configurations/Configurations';
import './page.css'
import { motion, AnimatePresence } from "framer-motion"


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


    return (
        <div className='config'>
            <AnimatePresence>
                <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "linear", duration: 1.5 }}
                    className='form__join'
                >
                    <Header />
                    <Configurations />
                    <Menu />
                </motion.div>
            </AnimatePresence >



        </div>
    )
}

export default Profile
