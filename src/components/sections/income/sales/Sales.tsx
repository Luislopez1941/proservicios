import React from 'react'
import './Sales.css'
import ModalAddSales from './modalAddSales/ModalAddSales'
import { storeSSales } from '@/zustand/sections/Sales/Sales'

const Sales = () => {

  const setModal = storeSSales(state => state.setModal)


  const modal = () => {
    setModal('modal_add_sales')
  }

  return (
    <div className='sales'>
      <div className='row__one'>
        <div className='options'>
          <div>
            <button>Moda</button>
          </div>
          <div>
            <button>Vehiculos</button>
          </div>
          <div>
            <button>Herramientas</button>
          </div>
          <div>
            <button>Electronica</button>
          </div>
        </div>
        <div className='btn__add' onClick={modal}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" /></svg>
        </div>
      </div>
      <ModalAddSales />
    </div>
  )
}

export default Sales
