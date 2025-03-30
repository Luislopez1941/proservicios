import React, { useEffect, useState } from 'react'
import { storeJobs } from '@/zustand/Jobs'
import './ModaDomesticWork.css'
// import { Search, MapPin } from 'lucide-react';
import APIs from '@/services/APIS';
import Swal from 'sweetalert2'
import useUserStore from '@/zustand/UserStore';

interface FormData {
    job_title: string;
    job_description: string;
    skills: any;
    id_state: number | null;
    id_city: number | null;
    id_municipality: number | null;
}

interface UserInfo {
    id: number;
    name: string;
    email: string;
    typeUser: string;
    token: string;

};


interface State {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
    id_state: number;
}

interface Municipality {
    id: number;
    name: string;
    id_city: number;
}

interface Skills {
    id: number,
    name: string
}


interface Skill {
    name: string; // Define la habilidad con un nombre
}

const ModalDomesticWork = () => {
    const userState = useUserStore(state => state.user);
    const userGlobal: UserInfo = userState;

    const services = [
        { id: 1, name: 'Plomero' },
        { id: 2, name: 'Electricista' },
        { id: 3, name: 'Carpintero' },
        { id: 4, name: 'Jardinero' },
        { id: 5, name: 'Pintor' },
        { id: 6, name: 'Albañil' },
        { id: 7, name: 'Gasfitter' },
        { id: 8, name: 'Servicio de limpieza' },
        { id: 9, name: 'Montador de muebles' },
        { id: 10, name: 'Reparador de electrodomésticos' },
    ];


    const { modal }: any = storeJobs()

    const setModal = storeJobs(state => state.setModal)

    const closeModal = () => {
        setModal('')
    }

    console.log(userGlobal)

    const [formData, setFormData] = useState<any>({
        id_user: userGlobal.id,
        job_title: '',
        job_description: '',
        skills: [],
        id_state: null,
        id_city: null,
        id_municipality: null
    });


    const [next, setNext] = useState<number>(0);
    const [selectState, setSelectState] = useState<boolean>(false);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

    console.log(modal)

    const fetchStates = async () => {
        try {
            const resultStates = await APIs.getStates() as State[];
            setStates(resultStates);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    useEffect(() => {
        fetchStates();
    }, []);

    const openSelectState = () => {
        setSelectState(prev => !prev);
    };

    const handleStateChange = async (state: State) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            id_state: state.id
        }));
        try {
            const result = await APIs.getLocalities(state.id) as City[];
            setCities(result);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
        setSelectState(false);
    };

    const [selectCity, setSelectCity] = useState<boolean>(false);

    const openSelectCity = () => {
        setSelectCity(prev => !prev);
    };

    const handleCityChange = async (city: City) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            id_city: city.id
        }));
        try {
            const result = await APIs.getMunicipalities(city.id) as Municipality[];
            setMunicipalities(result);
        } catch (error) {
            console.error("Error fetching municipalities:", error);
        }
        setSelectCity(false);
    };

    const [selectMunicipality, setSelectMunicipality] = useState<boolean>(false);

    const openSelectMunicipality = () => {
        setSelectMunicipality(prev => !prev);
    };

    const handleMunicipalityChange = (municipality: Municipality) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            id_municipality: municipality.id
        }));
        setSelectMunicipality(false);
    };


    const openSelectStore = () => {
        setSelectState(!selectState);
    };

    const handleCompaniesChange = async (state: State) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            id_state: state.id
        }));
        let result = (await APIs.getLocalities(state.id)) as City[];
        setCities(result);
        setSelectState(false);
    };

    const [selectedServices, setSelectedServices] = useState<Skills | undefined>(undefined);
    const [selectServices, setSelectServices] = useState<boolean>(false);

    const openSelectServices = () => setSelectServices((prev) => !prev);

    const handleServicesChange = (service: Skills) => {
        setSelectedServices(service);
        setSelectServices(false); // Cerrar el select al seleccionar un servicio
    };

   
    const handleAddSkill = () => {
        if (selectedServices) {  // Aseguramos que selectedServices no sea undefined
            // Buscar si ya existe un skill con el mismo id en formData.skills
            let find = formData.skills.find((x: { id: number }) => x.id == selectedServices.id);
            
            // Solo agregamos si no existe
            if (!find) {
                setFormData({
                    ...formData,
                    skills: [...formData.skills, selectedServices]  // Solo actualizamos la propiedad 'skills'
                });
                setSelectedServices(undefined);  // Limpiar la selección después de agregar
            } else {
                console.log('Skill already added');
            }
        } else {
            console.log('selectedServices is undefined');
        }
    };
    
    const handleRemoveSkill = (index: number) => {
        // Eliminamos el skill en el índice dado de formData.skills
        setFormData({
            ...formData,
            skills: formData.skills.filter((_: any, i: any) => i !== index)  // Filtramos la lista de skills
        });
    };
    const create = async () => {
        try {
            let response = await APIs.createJob(formData)
            Swal.fire({
                title: "Exito",
                text: "Trabajo creada exitosamente",
                icon: "success"
            });
            setModal('')
        } catch (error) {

        }
    }



    return (
        <div className={`overlay__modal_domestic-work ${modal == 'create-new_domestic-work' ? 'active' : ''}`}>
            <div className={`popup__modal_domestic-work ${modal == 'create-new_domestic-work' ? 'active' : ''}`}>
                <div className='header__modal'>
                    <a href="#" className="btn-cerrar-popup__modal_domestic-work" onClick={closeModal}>
                        <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </a>
                    <p className='title__modals'>Crear una oferta</p>
                </div>
                <div className='new__domestic-work_modal'>
                    <div className='new__domestic-work_modal_form'>
                        <div className='row__one'>
                            <div>
                                <label>Título del trabajo</label>
                                <input
                                    className="inputs__general"
                                    placeholder="Título del trabajo"
                                    value={formData.job_title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, job_title: e.target.value })
                                    }
                                    type="text"
                                />
                            </div>
                            <div>
                                <label>Descripción del trabajo</label>
                                <input
                                    className="inputs__general"
                                    placeholder="Descripción del trabajo"
                                    value={formData.job_description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, job_description: e.target.value })
                                    }
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='add'>
                            <div className='select__container'>
                                <label>¿Este trabajo es para?</label>
                                <div className='select-btn__general'>
                                    <div className={`select-btn ${selectServices ? 'active' : ''}`} onClick={openSelectServices}>
                                        <div>
                                            <p>{selectedServices ? selectedServices.name : 'Selecciona'}</p>
                                            <svg className='chevron__down' fill='#6c6c6e' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={`content ${selectServices ? 'active' : ''}`}>
                                        <ul className={`options ${selectServices ? 'active' : ''}`} style={{ opacity: selectServices ? '1' : '0' }}>
                                            {services.map((service) => (
                                                <li key={service.id} onClick={() => handleServicesChange(service)}>
                                                    {service.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleAddSkill} className="add-skill-button">
                                Agregar
                            </button>
                        </div>
                        {formData.skills.length > 0 ?
                            <div className="skills-add">
                                {formData.skills?.map((skill: Skills, index: number) => (
                                    <div>
                                        <div key={index} className="skill-item">
                                            <span>{skill.name}</span>
                                            <div onClick={() => handleRemoveSkill(index)} className="remove-skill-button">x</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            :
                            ''
                        }
                        <div className='filter__locations'>
                            <p>Selecciona la ubicacion del trabajo</p>
                            <div className='row__one'>
                                <div className='select__container'>
                                    <div className='select-btn__general'>
                                        <div className={`select-btn ${selectState ? 'active' : ''}`} onClick={openSelectStore}>
                                            {/* <MapPin strokeWidth={1.5} /> */}
                                            <div>
                                                <p>{formData.id_state ? states.find((s) => s.id === formData.id_state)?.name : 'Estado'}</p>
                                                <svg className='chevron__down' fill='#6c6c6e' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                            </div>
                                        </div>
                                        <div className={`content ${selectState ? 'active' : ''}`}>
                                            <ul className={`options ${selectState ? 'active' : ''}`} style={{ opacity: selectState ? '1' : '0' }}>
                                                {states?.map((state) => (
                                                    <li key={state.id} onClick={() => handleCompaniesChange(state)}>
                                                        {state.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='select__container my-4'>
                                    <div className='select-btn__general'>
                                        <div className={`select-btn ${selectCity ? 'active' : ''}`} onClick={openSelectCity}>
                                            {/* <MapPin strokeWidth={1.5} /> */}
                                            <div>
                                                <p>{formData.id_city ? cities.find((s) => s.id === formData.id_city)?.name : 'Ciudad'}</p>
                                                <svg className='chevron__down' fill='#6c6c6e' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                            </div>
                                        </div>
                                        <div className={`content ${selectCity ? 'active' : ''}`}>
                                            <ul className={`options ${selectCity ? 'active' : ''}`} style={{ opacity: selectCity ? '1' : '0' }}>
                                                {cities?.map((city) => (
                                                    <li key={city.id} onClick={() => handleCityChange(city)}>
                                                        {city.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='select__container'>
                                    <div className='select-btn__general'>
                                        <div className={`select-btn ${selectMunicipality ? 'active' : ''}`} onClick={openSelectMunicipality}>
                                            {/* <MapPin strokeWidth={1.5} /> */}
                                            <div>
                                                <p>{formData.id_municipality ? municipalities?.find((s) => s.id === formData.id_municipality)?.name : 'Municipio'}</p>
                                                <svg className='chevron__down' fill='#6c6c6e' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                            </div>
                                        </div>
                                        <div className={`content ${selectMunicipality ? 'active' : ''}`}>
                                            <ul className={`options ${selectMunicipality ? 'active' : ''}`} style={{ opacity: selectMunicipality ? '1' : '0' }}>
                                                {municipalities?.map((municipality) => (
                                                    <li key={municipality.id} onClick={() => handleMunicipalityChange(municipality)}>
                                                        {municipality.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='btn_create-new-job'>
                            <button type='button' onClick={create}>Crear trabajo</button>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    )
}

export default ModalDomesticWork
