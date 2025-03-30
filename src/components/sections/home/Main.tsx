"use client";

import React from 'react';
import './Main.css';
import items from './json/items.json';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '../../general/Card';
import Slider from "react-slick";
import { Search, Check, CreditCard, ChevronDown } from 'lucide-react';
import { PlomeroIcon, ElectricistaIcon, LocksmithIcon, CleanIcon, GardenerIcon, PainterIcon, StylistIcon, CarpenterIcon, ConstructionWorkerIcon } from './utils/icons';
import LayoutMain from './LayoutMain';
import Footer from '@/components/Footer';
import Menu from '@/components/Menu';
import Header from '@/components/Header';
import { motion, AnimatePresence } from "framer-motion"

interface Skill {
    name: string;
}


const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};


const services = [
    { name: "Plomero", Icon: PlomeroIcon },
    { name: "Electricista", Icon: ElectricistaIcon },
    { name: "Cerrajero", Icon: LocksmithIcon },
    { name: "Limpiador", Icon: CleanIcon },
    { name: "Jardinero", Icon: GardenerIcon },
    { name: "Pintor", Icon: PainterIcon },
    { name: "Albañil", Icon: ConstructionWorkerIcon },
    { name: "Estilista", Icon: StylistIcon },
];

type ServiceCardProps = {
    name: string;
    Icon: React.ElementType; 
};

const ServiceCard: React.FC<ServiceCardProps> = ({ name, Icon }) => (
    <div className="service-card">
        <div className="icon-container">
            <Icon />
        </div>
        <p>{name}</p>
    </div>
);


const Main = () => {


    



    return (
        <AnimatePresence>
        <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "linear", duration: 1.5 }}
            className='form__join'
        >
           <div>
            <Header />
            <div className='main'>
            <LayoutMain />
            <div className='row__four'>
                <div>
                    <div className='left'>
                        <p>Recuerda que puedes calificar a profesionales para reconocer su trabajo</p>
                    </div>
                    
                    <div className='right'>
                        <div className='icon-left'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 -960 960 960" fill="currentColor"><path d="M754-81q-8 0-15-2.5T726-92L522-296q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l85-85q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l204 204q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13l-85 85q-6 6-13 8.5T754-81Zm-549 1q-8 0-15.5-3T176-92l-84-84q-6-6-9-13.5T80-205q0-8 3-15t9-13l212-212h85l34-34-165-165h-57L80-765l113-113 121 121v57l165 165 116-116-43-43 56-56H495l-28-28 142-142 28 28v113l56-56 142 142q17 17 26 38.5t9 45.5q0 24-9 46t-26 39l-85-85-56 56-42-42-207 207v84L233-92q-6 6-13 9t-15 3Z" /></svg>
                        </div>
                        <div className='content-right'>
                            <p className='title'>Servicios a Domicilio</p>
                            <p className='text-content'>Servicios de excelente calidad a la puerta de tu domicilio</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row__one'>
                <div className="slider-container">
                    <Slider {...settings}>
                        {items.map((item: any, index: number) => (
                            <div className='item' key={index}>
                                <Card item={item} route={'/workers/profile'} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="service-professionals">
                    <div className="container">
                        <div className="services-grid">
                            {services.map((service, index) => (
                                <ServiceCard key={index} name={service.name} Icon={service.Icon} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='best__services'>

                </div>
            </div>
            <div className='row__two'>
                <div>
                    <div className='left'>
                        <p>En nuestro sitio, te ofrecemos un mundo de posibilidades para todas tus necesidades.</p>
                    </div>
                    <div className='right'>
                        <div className='content'>
                        <h2>¡Descubre la Excelencia en Servicios!</h2>
                        <p>En nuestro sitio, te ofrecemos un mundo de posibilidades para todas tus necesidades.</p>
                        <div>
                            Desde plomería hasta electricidad, puedes encontrar una amplia gama de profesionales listos para ayudarte.
                            Lo mejor de todo: cada servicio que ofrecemos es <strong>100% seguro</strong> y <strong>confiable</strong>.

                            ¡Tu satisfacción es nuestra prioridad!
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row__three'>
                <div className="how-it-works">
                    <h2 className="title">Cómo funciona ProFix</h2>
                    <div className="steps">
                        <div className="step">
                            <div className="icon search">
                                <Search size={24} />
                            </div>
                            <div className="content">
                                <h3>Búsqueda simple</h3>
                                <p>Usa nuestra barra de búsqueda para encontrar el servicio doméstico que necesitas, o navega por nuestras categorías.</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="icon check">
                                <Check size={24} />
                            </div>
                            <div className="content">
                                <h3>Selección simple</h3>
                                <p>Elige el servicio adecuado basándote en calificaciones, nivel de experiencia y comentarios.</p>
                            </div>
                        </div>
                        <div className="step">
                            <div className="icon card">
                                <CreditCard size={24} />
                            </div>
                            <div className="content">
                                <h3>Pago fácil</h3>
                                <p>Contrata a tu profesional de confianza de manera fácil y segura. Pagos protegidos, comunicación directa y servicios puntuales.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row__five'>
                <div className='additional__information'>
                    <p>Profesionales comprometidos en alta calidad y confiables.</p>
                    <div>
                        <button className='learn-more'>Aprende más</button>
                    </div>
                </div>
            </div>
            <div className='row__six'>
                <div className=''>
                    <div className='img__services'>

                    </div>
                    <div className='content'>
                        <p className='title'>Mejores servcios domesticos</p>
                        <p>Garantizamos que todos nuestros serviisos sean de calidad</p>
                    </div>
                </div>
            </div>
            <div className='row__seven'>
                <div>
                    <p>Preguntas frecuentes</p>
                </div>
                <div className='item'>
                    <p>¿Por qué debería contratar a un freelancer?</p>
                    <ChevronDown absoluteStrokeWidth />
                </div>
                <div className='item'>
                    <p>¿Cómo sé que voy a recibir el trabajo por el cual pagué?</p>
                    <ChevronDown absoluteStrokeWidth />
                </div>
                <div className='item'>
                    <p>¿A quién debo dirigirme si tengo problemas con un pedido o con un freelancer?</p>
                    <ChevronDown absoluteStrokeWidth />
                </div>
                <div className='item'>
                    <p>¿También puedo trabajar con freelancers de habla español?</p>
                    <ChevronDown absoluteStrokeWidth />
                </div>
            </div>
        </div>
        <Footer />
        <Menu />
        </div>
        </motion.div>
    </AnimatePresence >
        
    );
}

export default Main;
