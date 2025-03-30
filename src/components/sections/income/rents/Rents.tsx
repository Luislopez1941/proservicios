import React, { useState } from 'react'
import { storeSIncome } from '@/zustand/sections/Incomes/Income'
import ModalAddIncome from './modalAddIncome/ModalAddIncome'
import './Rents.css'

const Rents = () => {

    const setModal = storeSIncome(state => state.setModal)

    const [data, setData] = useState([
        {
            "id": 1,
            "name": "Vehiculos"

        },
        {
            "id": 2,
            "name": "Casas"
        },
        {
            "id": 3,
            "name": "Barcos"
        }
    ])

    const [house, setHouse] = useState<any>([
        {
            "id": 1,
            "name": "Casa de la Av. Turquesa",
            "location": "Av. Turquesa, Ciudad del Sol",
            "rental_price": 15000,
            "currency": "MXN",
            "bedrooms": 3,
            "bathrooms": 2,
            "garage": true,
            "square_meters": 180,
            "furnished": true,
            "available_from": "2024-04-01",
            "contact": {
                "name": "Carlos Mendoza",
                "phone": "+52 555 123 4567",
                "email": "carlosmendoza@example.com"
            }
        },
        {
            "id": 2,
            "name": "Residencia Palma Real",
            "location": "Colonia Palma Real, Monterrey",
            "rental_price": 22000,
            "currency": "MXN",
            "bedrooms": 4,
            "bathrooms": 3,
            "garage": true,
            "square_meters": 250,
            "furnished": false,
            "available_from": "2024-05-15",
            "contact": {
                "name": "Mariana López",
                "phone": "+52 818 987 6543",
                "email": "marianalopez@example.com"
            }
        },
        {
            "id": 3,
            "name": "Loft en el Centro",
            "location": "Zona Centro, Guadalajara",
            "rental_price": 12000,
            "currency": "MXN",
            "bedrooms": 1,
            "bathrooms": 1,
            "garage": false,
            "square_meters": 75,
            "furnished": true,
            "available_from": "2024-03-10",
            "contact": {
                "name": "Roberto Sánchez",
                "phone": "+52 33 4567 8901",
                "email": "robertosanchez@example.com"
            }
        }
    ]
    )







    const modal = () => {
        setModal('modal_add_income')
    }


    return (
        <div className='rents'>
            <div className='row__one'>
                <div className='options__income'>
                    <div className='btn'>
                        <button>Casas</button>
                    </div>
                    <div className='btn'>
                        <button>Vehiculos</button>
                    </div>
                    <div className='btn'>
                        <button>Articulos</button>
                    </div>
                </div>
                <div className='btns'>
                    {/* <div className='btn__add'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M400-360q-17 0-28.5-11.5T360-400v-97q0-16 6-30.5t17-25.5l344-344q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L553-384q-11 11-25.5 17.5T497-360h-97Zm384-368 57-56-56-56-57 56 56 56ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h260q14 0 23 7t14 18q5 11 3.5 22T489-772L303-586q-11 11-17 25.5t-6 30.5v170q0 33 23.5 56.5T360-280h169q16 0 30.5-6t25.5-17l187-187q10-10 21-11.5t22 3.5q11 5 18 14t7 23v261q0 33-23.5 56.5T760-120H200Z" /></svg>
                    </div> */}
                    <div className='btn__add' onClick={modal}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" /></svg>
                    </div>
                </div>
            </div>
            <div className="row__two">
                {house.map((x: any) => (
                    <div key={x.id} className="house__card">
                        <h3>{x.name}</h3>
                        <p className="location">{x.location}</p>
                        <p className="price">${x.rental_price} {x.currency}</p>
                        <div className="details">
                            <span>{x.bedrooms} Habitaciones</span>
                            <span>{x.bathrooms} Baños</span>
                        </div>
                        <button className="details__btn">Ver detalles</button>
                    </div>
                ))}
            </div>
            <ModalAddIncome />
        </div>
    )
}

export default Rents
