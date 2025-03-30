import React from 'react'
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import Sales from '@/components/sections/sales/Sales';
import FilterSales from '@/components/sections/sales/FilterSales';
import './Sales.css'

const page = () => {
    return (
        <div className='sales'>
            <Header />
            <Sales />
            <Menu />
        </div>
    )
}

export default page
