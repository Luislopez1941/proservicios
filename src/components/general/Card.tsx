import React from 'react';
import './styles/Card.css';
import { useRouter } from 'next/navigation'
import { storeWorkers } from '@/zustand/Workers';

interface Skill {
    name: string;
}
interface Item {
    id?: number;
    first_name?: string;
    second_name?: string;
    first_surname: string;
    second_last_name?: string;
    country?: string;
    email: string;
    password: string;
    profilePhoto?: string;
    phone: string;
    gender?: string;
    skills?: Skill[];
    starts?: Skill[];
    birthdate?: string;
    dni?: string;
    type_user?: string;
    id_state?: number;
    id_city?: number;
    id_municipality?: number;
}

interface CardProps {
    item: Item;
    route: string;
}


const Card: React.FC<CardProps> = ({ item, route }: any) => {

     const setDtaUser = storeWorkers(state => state.setDtaUser)
    

     const router = useRouter();

    const seeProfile = () => {
        setDtaUser(item)
        router.push(route);
    }

    return (
        <div className='card'>
            <div className='card__container'>
                <div
                    className='card__image'
                    style={{ backgroundImage: `url(${item?.profilePhoto})` }}
                ></div>
                <div className='card__content'>
                    <div>
                        <p className='name'>{item?.first_name} {item?.first_surname}</p>
                    </div>
                    <div>
                        <p className='reviews'>Me gusta ofrecer servicios de calidad</p>
                    </div>
                    <div className='skills'>
                        {item.skills?.map((skill: any, skillIndex: any) => (
                            <p className={skill.name} key={skillIndex}>
                                {skill.name}
                            </p>
                        ))}
                    </div>
                    <div className='qualifications'>
                        <div className='score'>
                            <small>8.9</small>
                        </div>
                        <div className='text__title'>
                            <small>muy bueno</small>
                        </div>
                        <div className='starts'>
                            {/* {item.starts.map((_, index) => (
                                <div key={index}>
                                    <svg  xmlns="http://www.w3.org/2000/svg" color='#F2A541'  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
                              
                                </div>
                            ))} */}
                        </div>
                    </div>


                    <div className='btn' onClick={seeProfile}>
                        <button>Ver perfil</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
