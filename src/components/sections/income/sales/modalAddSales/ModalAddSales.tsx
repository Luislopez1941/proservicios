import React, { useState, ChangeEvent, FormEvent } from 'react'
import { ArrowUpFromLine, MapPin } from 'lucide-react';
import { storeSIncome } from '@/zustand/sections/Incomes/Income';
import { useDropzone } from 'react-dropzone';
import { storeSSales } from '@/zustand/sections/Sales/Sales';
import './ModalAddSales.css'



interface RentFormData {
    title: string;
    address: string;
    type: any;
    bedrooms: number | "";
    bathrooms: number | "";
    area: number | "";
    categories: any;
    price: number | "";
    name_service: any;
    services_included: any;
    status: any;
    photos: any;
    notes: string;
}

const ModalAddSales = () => {

    const setModal = storeSSales(state => state.setModal)
    const { modal }: any = storeSSales()

    const [categories] = useState([
        { id: 1, name: "Vehículos" },
        { id: 2, name: "Moda" },
        { id: 3, name: "Herramientas" },
        { id: 4, name: "Electrónica" },
        { id: 5, name: "Hogar y Muebles" },
        { id: 6, name: "Inmuebles" },
        { id: 7, name: "Deportes y Aire Libre" },
        { id: 8, name: "Libros y Papelería" },
        { id: 9, name: "Juguetes y Juegos" },
        { id: 10, name: "Salud y Belleza" }
    ])

    const [formData, setFormData] = useState<RentFormData>({
        title: "",
        address: "",
        type: [{ id: 1, name: 'departamento' }, { id: 2, name: 'Casa' }],
        bedrooms: "",
        bathrooms: "",
        area: "",
        categories: [],
        price: "",
        services_included: [],
        name_service: '',
        status: [{ id: 1, name: 'Rentada' }, { id: 2, name: 'No Rentada' }],
        photos: [],
        notes: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prev => ({ ...prev, photos: e.target.files }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    ////////////////////////////////////SELECT APARMENT TYPE ///////////////////////////
    const [selectApartmentType, setSelectApartmentType] = useState<any>({
        selectApartmentType: false,
        selectedApartmentType: null
    })
    const openApartmentType = (x: any) => {
        setSelectApartmentType((prev: any) => ({
            ...prev,
            selectApartmentType: !selectApartmentType.selectApartmentType,

        }))
    }
    const handleApartmentTypeChange = (x: any) => {
        setSelectApartmentType((prev: any) => ({
            ...prev,
            selectApartmentType: !selectApartmentType.selectApartmentType,
            selectedApartmentType: x
        }))
    }

    ////////////////////////////////////SELECT APARMENT TYPE ///////////////////////////
    const [selectFurnished, setSelectFurnished] = useState<any>({
        selectFurnished: false,
        selectedFurnished: null
    })
    const openFurnished = (x: any) => {
        setSelectFurnished((prev: any) => ({
            ...prev,
            selectFurnished: !selectFurnished.selectFurnished,

        }))
    }
    const handleFurnishedeChange = (x: any) => {
        setSelectFurnished((prev: any) => ({
            ...prev,
            selectFurnished: !selectFurnished.selectFurnished,
            selectedFurnished: x
        }))
    }

    ////////////////////////////////////SELECT STATUS ///////////////////////////
    const [selectStatus, setSelectStatus] = useState<any>({
        selectStatus: false,
        selectedStatus: null
    })
    const openStatus = (x: any) => {
        setSelectStatus((prev: any) => ({
            ...prev,
            selectStatus: !selectStatus.selectStatus,

        }))
    }
    const handleStatusChange = (x: any) => {
        setSelectStatus((prev: any) => ({
            ...prev,
            selectStatus: !selectStatus.selectStatus,
            selectedStatus: x
        }))
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setFormData((prev: any) => ({
                        ...prev,
                        photos: [...prev.photos, base64String]
                    }));
                    console.log('Imagen 1 en base64:', base64String);
                };
                reader.readAsDataURL(file);
            }
        }
    });

    const addServices = () => {

    }

    console.log(modal)


    return (
        <div className={`overlay__modal_add_sales ${modal == 'modal_add_sales' ? 'active' : ''}`}>
            <div className={`popup__modal_add_sales ${modal == 'modal_add_sales' ? 'active' : ''}`}>
                <div className='modal_add_job'>
                    <div className='header__modal'>
                        <a href="#" className="btn-cerrar-popup__modal_add_sales" onClick={() => setModal('')}>
                            <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </a>
                        <p className='title__modals'>Agregar Nueva renta</p>
                    </div>
                    <div className="modal_add_sales">
                        <div className="modal_add_sales">
                            <div>
                                <div className="select__container">
                                    <div className="select-btn__general">
                                        <div className={`select-btn ${selectFurnished.selectApartmentType ? "active" : ""}`} onClick={openFurnished} >
                                           
                                            <div>
                                                <p>
                                                    {selectFurnished.selectedFurnished ? categories?.find((s: any) => s.id === selectFurnished.selectedFurnished.id)?.name : categories[0].name}
                                                </p>
                                                <svg className="chevron__down" fill="#6c6c6e" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" > <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /> </svg>
                                            </div>
                                        </div>
                                        <div className={`content ${selectFurnished.selectFurnished ? "active" : ""}`}>
                                            <ul className={`options ${selectFurnished.selectFurnished ? "active" : ""}`} style={{ opacity: selectFurnished.selectFurnished ? "1" : "0" }} >
                                                {categories?.map((x: any) => (
                                                    <li key={x.id} onClick={() => handleFurnishedeChange(x)}>
                                                        {x.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAddSales
