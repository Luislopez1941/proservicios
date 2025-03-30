import React from 'react'
import { storeSJobs } from '@/zustand/sections/Searches/Jobs'

const Jobs = () => {
    const setModal = storeSJobs(state => state.setModal)
    return (
        <div>
            <div className='row__one'>
                <div className='options__sales'>
                    <div className='btn'>
                        <button>Trabajos publicados</button>
                    </div>
                    <div className='btn'>
                        <button>Trabajos realizados</button>
                    </div>
                    {/* <div className='btn'>
                            <button>Articulos</button>
                        </div> */}
                </div>
                <div className='btn__add'>
                    <button onClick={() => setModal('modal_add_job')}>Publicar un trabajo</button>
                </div>
            </div>
        </div>
    )
}

export default Jobs
