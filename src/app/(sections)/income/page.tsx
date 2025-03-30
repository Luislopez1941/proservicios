import React from 'react'
import Header from '@/components/Header'
import Menu from '@/components/Menu'
import Income from '@/components/sections/income/Income'
import './Income.css'

const page = () => {
  return (
    <div className='income'>
      <Header />
      <Income />
      <Menu />
    </div>
  )
}

export default page
