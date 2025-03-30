import React, { useState, ChangeEvent, FormEvent } from 'react'
import { ArrowUpFromLine, MapPin } from 'lucide-react';
import { storeSIncome } from '@/zustand/sections/Incomes/Income';
import { useDropzone } from 'react-dropzone';
import './ModalAddIncome.css'



interface RentFormData {
    title: string;
    address: string;
    type: any;
    bedrooms: number | "";
    bathrooms: number | "";
    area: number | "";
    furnished: any;
    price: number | "";
    name_service: any;
    services_included: any;
    status: any;
    photos: any;
    notes: string;
}

const ModalAddIncome = () => {

    const setModal = storeSIncome(state => state.setModal)
    const { modal }: any = storeSIncome()

    const [formData, setFormData] = useState<RentFormData>({
        title: "",
        address: "",
        type: [{ id: 1, name: 'departamento' }, { id: 2, name: 'Casa' }],
        bedrooms: "",
        bathrooms: "",
        area: "",
        furnished: [{ id: 1, name: 'Si' }, { id: 2, name: 'No' }],
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


    return (
        <div className={`overlay__modal_add_income ${modal == 'modal_add_income' ? 'active' : ''}`}>
            <div className={`popup__modal_add_income ${modal == 'modal_add_income' ? 'active' : ''}`}>
                <div className='modal_add_job'>
                    <div className='header__modal'>
                        <a href="#" className="btn-cerrar-popup__modal_add_income" onClick={() => setModal('')}>
                            <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </a>
                        <p className='title__modals'>Agregar Nueva renta</p>
                    </div>
                    <div className="modal_add_income">
                        <div className="modal_add_income_container">
                            <form className='card_add_income'>
                                <div className='row__one'>
                                    <div className="form_group">
                                        <input type="text" className='inputs__general' placeholder='Nombre de la propiedad' name="title" value={formData.title} onChange={handleChange} required />
                                    </div>
                                    <div className="form_group">
                                        <input type="text" className='inputs__general' placeholder='Direccion' name="address" value={formData.address} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className='row__two'>
                                    <div className="select__container">
                                        <div className="select-btn__general">
                                            <div className={`select-btn ${selectApartmentType.selectApartmentType ? "active" : ""}`} onClick={openApartmentType} >
                                                {/* <MapPin strokeWidth={1.5} /> */}
                                                <div>
                                                    <p>
                                                        {selectApartmentType.selectedApartmentType ? formData.type?.find((s: any) => s.id === selectApartmentType.selectedApartmentType.id)?.name : formData.type[0].name}
                                                    </p>
                                                    <svg className="chevron__down" fill="#6c6c6e" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" > <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /> </svg>
                                                </div>
                                            </div>
                                            <div className={`content ${selectApartmentType.selectApartmentType ? "active" : ""}`}>
                                                <ul className={`options ${selectApartmentType.selectApartmentType ? "active" : ""}`} style={{ opacity: selectApartmentType.selectApartmentType ? "1" : "0" }} >
                                                    {formData?.type?.map((x: any) => (
                                                        <li key={x.id} onClick={() => handleApartmentTypeChange(x)}>
                                                            {x.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='row__three'>
                                    <div className="form_group">
                                        <input type="number" className='inputs__general' placeholder='Dormitorios' name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />
                                    </div>
                                    <div className="form_group">
                                        <input type="number" className='inputs__general' placeholder='Baños' name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className='row__four'>
                                    <div className="form_group">
                                        <input type="number" name="area" className='inputs__general' placeholder='Superficie' value={formData.area} onChange={handleChange} required />
                                    </div>
                                    <div className="form_group">
                                        <div className="select__container">
                                            <div className="select-btn__general">
                                                <div className={`select-btn ${selectFurnished.selectApartmentType ? "active" : ""}`} onClick={openFurnished} >
                                                    {/* <MapPin strokeWidth={1.5} /> */}
                                                    <div>
                                                        <p>
                                                            {selectFurnished.selectedFurnished ? formData.furnished?.find((s: any) => s.id === selectFurnished.selectedFurnished.id)?.name : formData.furnished[0].name}
                                                        </p>
                                                        <svg className="chevron__down" fill="#6c6c6e" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" > <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /> </svg>
                                                    </div>
                                                </div>
                                                <div className={`content ${selectFurnished.selectFurnished ? "active" : ""}`}>
                                                    <ul className={`options ${selectFurnished.selectFurnished ? "active" : ""}`} style={{ opacity: selectFurnished.selectFurnished ? "1" : "0" }} >
                                                        {formData?.furnished?.map((x: any) => (
                                                            <li key={x.id} onClick={() => handleFurnishedeChange(x)}>
                                                                {x.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <input type="number" name="price" className='inputs__general' placeholder='Precio' value={formData.price} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className='row__five'>
                                    <div className="form_group">
                                        <input type="number" className='inputs__general' placeholder='Agua, Luz, etc' name="name_service" value={formData.name_service} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <button onClick={addServices}>Agregar</button>
                                    </div>
                                </div>
                                {/* <div className="form_group">
                                    <input type="number" name="deposit" className='inputs__general' placeholder='Deposito' value={formData.deposit} onChange={handleChange} required />
                                </div> */}

                                {/* <div className="form_group">
                                    <select name="payment_method" value={formData.payment_method} onChange={handleChange} required>
                                        <option value="cash">Cash</option>
                                        <option value="credit_card">Credit Card</option>
                                        <option value="bank_transfer">Bank Transfer</option>
                                    </select>
                                </div> */}
                                <div className='row__six'>
                                    <div className="form_group">
                                        <div className="select__container">
                                            <div className="form_group">
                                                <div className="select__container">
                                                    <div className="select-btn__general">
                                                        <div className={`select-btn ${selectStatus.selectStatus ? "active" : ""}`} onClick={openStatus} >
                                                            {/* <MapPin strokeWidth={1.5} /> */}
                                                            <div>
                                                                <p>
                                                                    {selectStatus.selectedFurnished ? formData.status?.find((s: any) => s.id === selectStatus.selectedFurnished.id)?.name : formData.status[0].name}
                                                                </p>
                                                                <svg className="chevron__down" fill="#6c6c6e" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" > <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /> </svg>
                                                            </div>
                                                        </div>
                                                        <div className={`content ${selectStatus.selectStatus ? "active" : ""}`}>
                                                            <ul className={`options ${selectStatus.selectStatus ? "active" : ""}`} style={{ opacity: selectStatus.selectStatus ? "1" : "0" }} >
                                                                {formData?.status?.map((x: any) => (
                                                                    <li key={x.id} onClick={() => handleStatusChange(x)}>
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
                                    <div>
                                        <div className="upload__image">
                                            <div className="upload-container" {...getRootProps()}>
                                                <ArrowUpFromLine className="icon" />
                                                <input {...getInputProps()} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row__seven'>
                                    <div className={`photos-container ${formData.photos.length > 0 ? 'active' : ''}`}>
                                        {formData.photos.length > 0 ? (
                                            formData.photos.map((x: any, index: any) => (
                                                <div key={index} className="photo" style={{ backgroundImage: `url("${x}")` }}></div>
                                            ))
                                        ) : (
                                            <p className="loading-text">No hay fotos que mostrar</p>
                                        )}
                                    </div>
                                </div>
                            </form>
                            <div className='row__btn'>
                                <button type="submit">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAddIncome
