'use client'

import React from 'react'
import './page.css'
import FormLogin from '@/components/login/FormLogin'
import FormCreate from '@/components/login/FormCreate'
import { storeLogin } from '@/zustand/Login'
import { useStore } from 'zustand'
import { motion, AnimatePresence } from 'framer-motion';




const page = () => {
    const { formStatus } = useStore(storeLogin)


    return (
        <AnimatePresence>

            <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "linear", duration: 1.5 }}
                className='form__join'
            >
                <div className='login'>
                    <div className='login__container'>
                        <div className='left'>
                            <div>

                            </div>
                        </div>
                        <div className='right'>
                            <div className='right__container'>
                                {formStatus ? (
                                    <AnimatePresence>
                                        <motion.div
                                            key="form-create"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            // Asegúrate de incluir una animación de salida
                                            transition={{ ease: "linear", duration: 1.5 }}
                                            className='form__join'
                                        >
                                            <FormCreate />
                                        </motion.div>
                                    </AnimatePresence>
                                ) : (
                                    <AnimatePresence>
                                        <motion.div
                                            key="form-login"  // Cambié la key aquí también
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            // Asegúrate de incluir una animación de salida
                                            transition={{ ease: "linear", duration: 1.5 }}
                                            className='form__join'
                                        >
                                            <FormLogin />
                                        </motion.div>
                                    </AnimatePresence>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence >
    )
}

export default page

